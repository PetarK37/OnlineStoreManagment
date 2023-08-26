using Domain.DTO;
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace Domain.Services
{
    public class CustomerOrderService : ICustomerOrderService
    {
        private readonly ICustomerOrderRepository _customerOrderRepository;
        private readonly IItemRepository _itemRepository;
        private readonly IDiscountCodeRepository _discountCodeRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IMailService _mailService;

        public CustomerOrderService(IItemRepository itemRepository, ICustomerOrderRepository customerOrderRepository,
            IDiscountCodeRepository discountCodeRepository, IStoreRepository storeRepository, IMailService mailService)
        {
            _itemRepository = itemRepository;
            _customerOrderRepository = customerOrderRepository;
            _discountCodeRepository = discountCodeRepository;
            _storeRepository = storeRepository;
            _mailService = mailService;
        }

        public async Task<CustomerOrder> Add(CustomerOrderReqDTO dto)
        {
            var order = new CustomerOrder(dto.CustomerName, dto.ShippingAddress, dto.ContactPhone, dto.CustomerEmail, dto.PromoCode, dto.ShippingPrice);
            foreach (var i in dto.Items)
            {
                var item = _itemRepository.GetById(i.ItemID);
                if (item is null)
                {
                    throw new EntityNotFoundException(String.Format("Item with id: {0} was not found", i.ItemID));
                }
                if (item.Count < i.Quantity)
                {
                    throw new ForbbidenActionException(String.Format("You don not have enough items with id: {0}", i.ItemID));
                }
                else
                {
                    order.Items.Add(new OrderItem(item, i.Quantity));
                    item.Count -= i.Quantity;
                }
            }
            if (!string.IsNullOrEmpty(dto.PromoCode))
            {
                var code = _discountCodeRepository.GetBy(c => c.Code.Equals(dto.PromoCode)).FirstOrDefault();
                if (code is null)
                {
                    throw new EntityNotFoundException(String.Format("PromoCode: {0} was not found", dto.PromoCode));
                }
                order.TotalPrice = CalculateTotalPrice(order, code);
            }
            else
            {
                order.TotalPrice = CalculateTotalPrice(order, null);
            }
            _customerOrderRepository.Add(order);
            var success = await _customerOrderRepository.SaveAsync();
            if (order.CustomerEmail is not null)
            {
                var store = _storeRepository.GetStore();
                if (store is null)
                {
                    _mailService.SendOrderCreationEmail(order.CustomerEmail, order, "");
                }
                else
                {
                    _mailService.SendOrderCreationEmail(order.CustomerEmail, order, store.Name);
                }
            }
            return success > 0 ? order : throw new ActionFailedException("There was a problem while saving CustomerOrder ");

        }

        public List<CustomerOrder> GetAll()
        {
            return _customerOrderRepository.GetAll().ToList();
        }

        public CustomerOrder GetById(string id)
        {
            var order = _customerOrderRepository.GetById(Guid.Parse(id));
            if (order is null)
            {
                throw new EntityNotFoundException(String.Format("CustomerOrder with id: {0} was not found", id));
            }
            return order;
        }

        public async Task<CustomerOrder> Update(CustomerOrderUpdateDTO dto, string id)
        {
            var order = _customerOrderRepository.GetById(Guid.Parse(id));
            if (order is null)
            {
                throw new EntityNotFoundException(String.Format("SupplierOrder with id: {0} was not found", id));
            }
            if (order.Status != Enums.OrderStatus.IN_PROCESS)
            {
                throw new ForbbidenActionException("You can not edit SupplierOrder wich is allready recived or returned");
            }
            if (dto.Status is not null)
            {
                order.Status = (Enums.OrderStatus)dto.Status;
            }
            if (dto.Status == Enums.OrderStatus.RETURNED || dto.Status == Enums.OrderStatus.CANCELED)
            {
                foreach (var i in order.Items)
                {
                    var item = _itemRepository.GetById(i.Item.Id);
                    item.Count += i.Quantity;
                }
            }
            if (dto.TrackingCode is not null)
            {
                order.TrackingCode = dto.TrackingCode;
                order.Status = Enums.OrderStatus.SENT;
                if (order.CustomerEmail is not null)
                {
                    var store = _storeRepository.GetStore();
                    if (store is null)
                    {
                        _mailService.SendTrackingNumEmail(order.CustomerEmail, order.TrackingCode, "");
                    }
                    else
                    {
                        _mailService.SendTrackingNumEmail(order.CustomerEmail, order.TrackingCode, store.Name);
                    }
                }
            }
            var success = await _customerOrderRepository.SaveAsync();
            return success > 0 ? order : throw new ActionFailedException("There was a problem while updating CustomerOrder");
        }


        private decimal CalculateTotalPrice(CustomerOrder order, DiscountCode discountCode)
        {
            decimal totalPrice = 0;
            bool applyDiscount = false;
            bool hasAllCategoryDiscount = false;

            // Validate the discount code if it's provided
            if (!string.IsNullOrEmpty(order.PromoCode) && order.PromoCode == discountCode.Code
                && order.RecivedOn >= discountCode.ValidFrom && order.RecivedOn <= discountCode.ValidTo)
            {
                applyDiscount = true;
                hasAllCategoryDiscount = discountCode.Categories.Any(c => c.Name.ToLower() == "all");
            }

            foreach (var orderItem in order.Items)
            {
                // Fetch the price for the item based on the order's received date
                var applicablePrice = orderItem.Item.Prices
                                .Where(p => p.ValidFrom <= order.RecivedOn && p.ValidTo >= order.RecivedOn)
                                .OrderByDescending(p => p.ValidFrom)
                                .FirstOrDefault()?.Value ?? 0;

                decimal itemTotalPrice = applicablePrice * orderItem.Quantity;

                // Apply discount if necessary
                if (applyDiscount && (hasAllCategoryDiscount || discountCode.Categories.Contains(orderItem.Item.Category)))
                {
                    itemTotalPrice -= itemTotalPrice * (discountCode.Discount / 100m);
                }

                totalPrice += itemTotalPrice;
            }

            return totalPrice + order.ShippingPrice;
        }

        public MemoryStream GenerateShippingLabels(List<Guid> orderIds)
        {
            var store = _storeRepository.GetStore();
            if (store is null)
            {
                throw new EntityNotFoundException("There was a problem while retriving store from a db");
            }

            var orders = _customerOrderRepository.GetBy(o => orderIds.Contains(o.Id) && (o.Status.Equals(Enums.OrderStatus.IN_PROCESS) || o.Status.Equals(Enums.OrderStatus.RETURNED) || o.Status.Equals(Enums.OrderStatus.CANCELED))).ToList();
            if (orders == null || !orders.Any())
            {
                throw new EntityNotFoundException("No orders found for the provided IDs");
            }

            var outputPath = Path.Combine(Path.GetTempPath(), "shippinglabels.pdf");
            GenerateShippingLabelPdf(orders, store, outputPath);

            var memory = new MemoryStream();
            using (var stream = new FileStream(outputPath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            System.IO.File.Delete(outputPath);
            memory.Position = 0;

            return memory;
        }

        private void GenerateShippingLabelPdf(List<CustomerOrder> orders, Store store, string outputFilePath)
        {
            PdfDocument document = new PdfDocument();
            XGraphics gfx;
            PdfPage page = document.AddPage();
            gfx = XGraphics.FromPdfPage(page);

            double labelHeight = 150;
            double labelWidth = page.Width;
            double labelGap = 0;
            double currentY = 0;

            XStringFormat format = new XStringFormat();
            format.LineAlignment = XLineAlignment.Near;
            format.Alignment = XStringAlignment.Near;

            foreach (var order in orders)
            {
                if (currentY + labelHeight > page.Height)
                {
                    page = document.AddPage();
                    currentY = 0;
                }

                var rect = new XRect(0, currentY, labelWidth, labelHeight);
                var senderRect = new XRect(0, currentY, labelWidth / 2, labelHeight);
                var receiverRect = new XRect(labelWidth / 2, currentY, labelWidth / 2, labelHeight);

                gfx.DrawRectangle(XPens.Black, rect);
                double lineHeight = 20;  // Adjust as necessary for font size
                double yOffset = 5;

                // Draw sender info
                gfx.DrawString("Šalje:", new XFont("Verdana", 16, XFontStyle.Bold), XBrushes.Black, new XRect(5, currentY + yOffset, labelWidth / 2, lineHeight), format);
                yOffset += lineHeight;
                gfx.DrawString(store.ShippingName, new XFont("Verdana", 12), XBrushes.Black, new XRect(5, currentY + yOffset, labelWidth / 2, lineHeight), format);
                yOffset += lineHeight;
                gfx.DrawString(store.Phone, new XFont("Verdana", 12), XBrushes.Black, new XRect(5, currentY + yOffset, labelWidth / 2, lineHeight), format);
                yOffset += lineHeight;
                gfx.DrawString(store.Address, new XFont("Verdana", 12), XBrushes.Black, new XRect(5, currentY + yOffset, labelWidth / 2, lineHeight), format);

                yOffset = 5; // Reset offset for receiver info
                             // Draw receiver info
                gfx.DrawString("Prima:", new XFont("Verdana", 16, XFontStyle.Bold), XBrushes.Black, new XRect(5 + labelWidth / 2, currentY + yOffset, labelWidth / 2, lineHeight), format);
                yOffset += lineHeight;
                gfx.DrawString(order.CustomerName, new XFont("Verdana", 12), XBrushes.Black, new XRect(5 + labelWidth / 2, currentY + yOffset, labelWidth / 2, lineHeight), format);
                yOffset += lineHeight;
                gfx.DrawString(order.ContactPhone, new XFont("Verdana", 12), XBrushes.Black, new XRect(5 + labelWidth / 2, currentY + yOffset, labelWidth / 2, lineHeight), format);
                yOffset += lineHeight;
                gfx.DrawString(order.ShippingAddress, new XFont("Verdana", 12), XBrushes.Black, new XRect(5 + labelWidth / 2, currentY + yOffset, labelWidth / 2, lineHeight), format);

                currentY += labelHeight + labelGap;
            }

            document.Save(outputFilePath);
        }


    }
}

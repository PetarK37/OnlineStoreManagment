using Domain.DTO;
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class CustomerOrderService : ICustomerOrderService
    {
        private readonly ICustomerOrderRepository _customerOrderRepository;
        private readonly IItemRepository _itemRepository;
        private readonly IDiscountCodeRepository _discountCodeRepository;

        public CustomerOrderService(IItemRepository itemRepository, ICustomerOrderRepository customerOrderRepository, IDiscountCodeRepository discountCodeRepository)
        {
            _itemRepository = itemRepository;
            _customerOrderRepository = customerOrderRepository;
            _discountCodeRepository = discountCodeRepository;
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
                    order.Items.Add(new OrderItem(item,i.Quantity));
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
                    item.Count -= i.Quantity;
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

    }
}

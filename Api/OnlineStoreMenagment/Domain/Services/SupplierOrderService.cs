using Domain.DTO;
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;
using System;
using static Domain.Entites.Enums;

namespace Domain.Services
{
    public class SupplierOrderService : ISupplierOrderService
    {
        private readonly ISupplierOrderRepository _supplierOrderRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IItemRepository _itemRepository;
        private readonly IStoreRepository _storeRepository;


        public SupplierOrderService(ISupplierOrderRepository supplierOrderRepository, ICategoryRepository categoryRepository, IItemRepository itemRepository, IStoreRepository storeRepository)
        {
            _supplierOrderRepository = supplierOrderRepository;
            _categoryRepository = categoryRepository;
            _itemRepository = itemRepository;
            _storeRepository = storeRepository;
        }

        public async Task<SupplierOrder> Add(SupplierOrderReqDTO dto)
        {
            if (dto.ItemId is null && dto.Item is null)
            {
                throw new ActionFailedException("SupplierOrder must contain item data");
            }

            var order = new SupplierOrder(dto.ItemLink, dto.TrackingLink, dto.DisputeDate, dto.OrderDate, dto.ItemPrice, dto.TotalPrice, dto.Quantity);

            if (dto.ItemId is not null)
            {
                var item = _itemRepository.GetById(dto.ItemId);
                if (item is null)
                {
                    throw new EntityNotFoundException(String.Format("Item with id: {0} was not found", dto.ItemId));
                }
                order.Item = item;
                _supplierOrderRepository.Add(order);
                var success = await _supplierOrderRepository.SaveAsync();
                return success > 0 ? order : throw new ActionFailedException("There was a problem while saving SupplierOrder ");
            }
            else
            {
                if (string.IsNullOrWhiteSpace(dto.Item.Icon))
                {
                    dto.Item.Icon = "https://i.imgur.com/JTPmOda.jpg";
                }

                Random r = new Random();
                var itemNum = r.Next(100000, 999999);
                var item = new Item(dto.Item.Name, dto.Item.Description, dto.Item.Icon, 0,itemNum);

                var category = _categoryRepository.GetById(dto.Item.CategoryId);
                if (category is null) { throw new ActionFailedException("You cannot crate SupplierOrder with category that doesnt exist"); }
                if (category.Name.ToLower().Contains("all"))
                {
                    throw new ForbbidenActionException("Item can not be a part of category named All");
                }
                item.Category = category;

                order.Item = item;
                _supplierOrderRepository.Add(order);
                var success = await _supplierOrderRepository.SaveAsync();
                return success > 0 ? order : throw new ActionFailedException("There was a problem while saving SupplierOrder ");
            }
        }

        public List<SupplierOrder> GetAll()
        {
            return _supplierOrderRepository.GetAll().ToList();
        }

        public SupplierOrder GetById(string id)
        {
            var order = _supplierOrderRepository.GetById(Guid.Parse(id));
            if (order is null)
            {
                throw new EntityNotFoundException(String.Format("SupplierOrder with id: {0} was not found", id));
            }
            return order;
        }

        public async Task<SupplierOrder> Update(SupplierOrderUpdateDTO dto, string id)
        {
            var order = _supplierOrderRepository.GetById(Guid.Parse(id));
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
            if (dto.AdditionalExpense is not null)
            {
                order.TotalPrice += (decimal)dto.AdditionalExpense;
            }
            if (dto.Status == Enums.OrderStatus.RECIVED)
            {
                var item = _itemRepository.GetById(order.ItemId);
                if (item is null)
                {
                    throw new EntityNotFoundException(String.Format("Item with id: {0} was not found", order.ItemId));
                }
                item.Count += order.Quantity;
                var store = _storeRepository.GetStore();
                if (store is not null)
                {
                    store.Inventory.Add(item);
                }
                else
                {
                    throw new ActionFailedException("No store found in database");
                }
            }
            var success = await _storeRepository.SaveAsync();
            return success > 0 ? order : throw new ActionFailedException("There was a problem while saving SupplierOrder ");
        }
        public List<SupplierOrder> GetOrdersForDisputeReminder()
        {
            DateTime thresholdDate = DateTime.Now.AddDays(2);
            return _supplierOrderRepository.GetBy(so => so.Status == OrderStatus.IN_PROCESS && so.DisputeDate.Date == thresholdDate.Date).ToList();
        }
    }
}

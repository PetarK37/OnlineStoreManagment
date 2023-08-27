using Domain.DTO;
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ItemService(IItemRepository itemRepository, ICategoryRepository categoryRepository)
        {
            _itemRepository = itemRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<Item> Update(String id, ItemReqDTO dto)
        {
            var item = _itemRepository.GetById(Guid.Parse(id));
            if (item is null)
            {
                throw new EntityNotFoundException(String.Format("Item with id: {0} was not found", id));
            }
            if (!string.IsNullOrEmpty(item.Name))
            {
                item.Name = dto.Name;
            }
            if (!string.IsNullOrEmpty(item.Description))
            {
                item.Description = dto.Description;
            }
            if (!string.IsNullOrEmpty(item.Icon))
            {
                item.Icon = dto.Icon;
            }
            if (dto.CategoryId != item.CategoryId)
            {
                var category = _categoryRepository.GetById(dto.CategoryId);
                if (category is null)
                {
                    throw new EntityNotFoundException(String.Format("Category with id: {0} was not found", dto.CategoryId));
                }
                if (category.Name.ToLower().Contains("all"))
                {
                    throw new ForbbidenActionException("Item can not be a part of category named All");
                }
                item.Category = category;
            }
            var success = await _itemRepository.SaveAsync();
            return success > 0 ? item : throw new ActionFailedException("There was a problem while updating Item");
        }

        public async Task<Item> UpdatePrice(string id, Price price)
        {
            var item = _itemRepository.GetById(Guid.Parse(id));
            if (item is null)
            {
                throw new EntityNotFoundException(String.Format("Item with id: {0} was not found", id));
            }
            item.Prices.Add(price);
            var success = await _itemRepository.SaveAsync();
            return success > 0 ? item : throw new ActionFailedException("There was a problem while updating Item");
        }
    }
}

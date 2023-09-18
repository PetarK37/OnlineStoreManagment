using Domain.DTO;
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IItemService
    {
        public Task<Item> Update(String id, ItemReqDTO item);
        public Task<Item> UpdatePrice(String id, Price price);
        public Item GetByNum(int num);

    }
}

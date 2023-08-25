
using Domain.DTO;
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IStoreService
    {

        Store GetStore();
        Task<Store> UpdateStore(StoreReqDTO dto);
    }
}

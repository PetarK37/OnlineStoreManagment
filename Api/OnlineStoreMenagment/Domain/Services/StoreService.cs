using Domain.DTO;
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class StoreService : IStoreService
    {
        private readonly IStoreRepository _storeRepository;

        public StoreService(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
        }

        public Store GetStore()
        {
            var store = _storeRepository.GetStore();
            if (store is null) {
                throw new EntityNotFoundException("There was a problem while retriving store from a db");
            }
            return store;
        }

        public async Task<Store> UpdateStore(StoreReqDTO dto)
        {
            var store = _storeRepository.GetStore();
            if (store is null)
            {
                throw new EntityNotFoundException("There was a problem while retriving store from a db");
            }
            store.PIB = dto.PIB;
            store.Phone = dto.Phone;
            store.Email = dto.Email;
            store.Address = dto.Address;
            store.ShippingName = dto.ShippingName;
            store.MIB = dto.MIB;
            store.Name = dto.Name;
            var success = await _storeRepository.SaveAsync();
            return store;
        }
    }
}

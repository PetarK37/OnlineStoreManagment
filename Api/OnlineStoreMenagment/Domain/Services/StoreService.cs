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
        private readonly ISocialsRepository _socialsRepository;

        public StoreService(IStoreRepository storeRepository, ISocialsRepository socialsRepository)
        {
            _storeRepository = storeRepository;
            _socialsRepository = socialsRepository;
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
            store.MB = dto.MB;
            store.Name = dto.Name;
            var socials = new List<Social>();
            foreach( var s in dto.Socials)
            {
                var existingSocial = _socialsRepository.GetBy(sc => sc.Name.Equals(s.Name) && sc.Link.Equals(s.Link)).FirstOrDefault();
                if (existingSocial is not null)
                {
                    socials.Add(existingSocial);
                }
                else
                {
                    socials.Add(s);
                }
            }
            var socialsForDeletion = store.Socials.Except(socials);
            store.Socials = socials;

            _socialsRepository.RemoveRange(socialsForDeletion); 
            var success = await _storeRepository.SaveAsync();
            return success > 0 ? store : throw new ActionFailedException("There was problem while saving Store data to DB");
        }

    }
}

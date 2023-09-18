using Domain.Entites;

namespace Domain.Interfaces.Repository
{
    public interface IStoreRepository
    {
        Store? GetStore();
        Task<int> SaveAsync();
    }
}

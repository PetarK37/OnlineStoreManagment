using Domain.Entites;
using System.Linq.Expressions;

namespace Domain.Interfaces.Repository
{
    public interface IStoreRepository
    {
        Store? GetStore();
        Task<int> SaveAsync();
    }
}

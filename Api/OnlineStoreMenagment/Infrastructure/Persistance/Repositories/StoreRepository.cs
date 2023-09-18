using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Repositories
{
    public class StoreRepository : IStoreRepository
    {
        private readonly ShopDbContext _dbContext;
        private DbSet<Store> _table;

        public StoreRepository(ShopDbContext dbContext)
        {
            _dbContext = dbContext;
            _table = dbContext.Set<Store>();
        }
        public Store? GetStore()
        {
            return _table.FirstOrDefault();
        }

        public Task<int> SaveAsync()
        {
            return _dbContext.SaveChangesAsync();
        }
    }
}



using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Persistance
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly ShopDbContext _dbContext;
        private DbSet<T> _table;

        public BaseRepository(ShopDbContext dbContext)
        {
            _dbContext = dbContext;
            _table = dbContext.Set<T>();
        }

        public void Add(T entity)
        {
            _table.Add(entity);
        }

        public Task AddRangeAsync(List<T> entities)
        {
            return _table.AddRangeAsync(entities);
        }

        public IEnumerable<T> GetAll()
        {
            return _table;
        }

        public IEnumerable<T> GetBy(Expression<Func<T, bool>> predicate)
        {
            return _table.Where(predicate);
        }

        public T GetById(object id)
        {
            return _table.Find(id);
        }

        public Task<int> SaveAsync()
        {
            return _dbContext.SaveChangesAsync();
        }
    }
}

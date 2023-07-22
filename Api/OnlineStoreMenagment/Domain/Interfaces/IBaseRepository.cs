using System.Linq.Expressions;

namespace Domain.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(object id);
        IEnumerable<T> GetBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        Task AddRangeAsync(List<T> entities);
        Task<int> SaveAsync();
    }
}

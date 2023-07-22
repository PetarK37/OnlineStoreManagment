using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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

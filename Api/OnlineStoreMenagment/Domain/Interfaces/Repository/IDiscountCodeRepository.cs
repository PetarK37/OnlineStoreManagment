using Domain.Entites;
using System.Linq.Expressions;

namespace Domain.Interfaces.Repository
{
    public interface IDiscountCodeRepository : IBaseRepository<DiscountCode>
    {
        void Delete(DiscountCode discountCode);
        DiscountCode? GetById(Guid id);
        new IEnumerable<DiscountCode> GetBy(Expression<Func<DiscountCode, bool>> predicate);
        new IEnumerable<DiscountCode> GetAll();
    }
}

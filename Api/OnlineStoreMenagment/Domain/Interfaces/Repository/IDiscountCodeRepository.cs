using Domain.Entites;
using System.Linq.Expressions;

namespace Domain.Interfaces.Repository
{
    public interface IDiscountCodeRepository : IBaseRepository<DiscountCode>
    {
        void Delete(DiscountCode discountCode);
    }
}

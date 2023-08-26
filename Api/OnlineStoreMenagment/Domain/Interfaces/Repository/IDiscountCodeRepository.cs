using Domain.Entites;

namespace Domain.Interfaces.Repository
{
    public interface IDiscountCodeRepository : IBaseRepository<DiscountCode>
    {
        void Delete(DiscountCode discountCode);
    }
}

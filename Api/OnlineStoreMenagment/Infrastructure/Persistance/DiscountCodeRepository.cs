using Domain.Entites;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance
{
    public class DiscountCodeRepository : BaseRepository<DiscountCode>, IDiscountCodeRepository
    {
        private readonly DbSet<DiscountCode> _table;
        public DiscountCodeRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<DiscountCode>();
        }

        public void Delete(DiscountCode discountCode)
        {
            _table.Remove(discountCode);
        }

      

    }
}

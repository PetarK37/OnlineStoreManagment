using Domain.Entites;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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

        public new IEnumerable<DiscountCode> GetAll()
        {
            return _table.Include(c => c.Categories);
        }

        public  DiscountCode? GetById(Guid id) 
        {
            return _table.Include(c => c.Categories).Where(c => c.Id == id).FirstOrDefault();
        }

        public new IEnumerable<DiscountCode> GetBy(Expression<Func<DiscountCode, bool>> predicate)
        {
            return _table.Include(c => c.Categories).Where(predicate);
        }


    }
}

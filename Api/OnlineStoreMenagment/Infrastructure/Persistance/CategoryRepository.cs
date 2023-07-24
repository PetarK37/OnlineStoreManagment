using Domain.Entites;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance
{
    public class CategoryRepository : BaseRepository<Category>,ICategoryRepository
    {

        private readonly DbSet<Category> _table;

        public CategoryRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<Category>();
        }
    }
}

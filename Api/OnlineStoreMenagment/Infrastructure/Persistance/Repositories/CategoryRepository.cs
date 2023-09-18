using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {

        private readonly DbSet<Category> _table;

        public CategoryRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<Category>();
        }
    }
}

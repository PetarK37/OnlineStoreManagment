using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Repositories
{
    public class ItemRepository : BaseRepository<Item>, IItemRepository
    {
        private readonly DbSet<Item> _table;

        public ItemRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<Item>();
        }
    }
}

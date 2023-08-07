using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Repositories
{
    public class PermisionRepository : BaseRepository<Permision>, IPermisionRepository
    {
        private readonly DbSet<Permision> _table;
        public PermisionRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<Permision>();
        }
    }
}

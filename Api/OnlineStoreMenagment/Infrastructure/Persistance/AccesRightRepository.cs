using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance
{
    public class AccesRightRepository : BaseRepository<AccessRight>, IAccessRightRepository
    {
        private DbSet<AccessRight> _table;
        public AccesRightRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<AccessRight>();
        }
    }
}

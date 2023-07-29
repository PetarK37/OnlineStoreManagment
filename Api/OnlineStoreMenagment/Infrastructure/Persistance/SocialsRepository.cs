using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance
{
    public class SocialsRepository : BaseRepository<Social>, ISocialsRepository
    {
        private readonly DbSet<Social> _table;

        public SocialsRepository(ShopDbContext dbContext) : base(dbContext) 
        {
            _table = dbContext.Set<Social>();
        }

        public void RemoveRange(IEnumerable<Social> socials)
        {
            _table.RemoveRange(socials);
        }
    }
}

using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Repositories
{
    public class SupplierOrderRepository : BaseRepository<SupplierOrder>, ISupplierOrderRepository
    {
        private readonly DbSet<SupplierOrder> _table;
        public SupplierOrderRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<SupplierOrder>();
        }

        public  SupplierOrder? GetById(Guid id)
        {
            return _table.Include(o => o.Item).Where(o => o.Id == id).FirstOrDefault();
        }
    }
}

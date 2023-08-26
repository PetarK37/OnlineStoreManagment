using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Repositories
{
    public class CustomerOrderRepository : BaseRepository<CustomerOrder>, ICustomerOrderRepository
    {
        private DbSet<CustomerOrder> _table;
        public CustomerOrderRepository(ShopDbContext dbContext) : base(dbContext)
        {
            _table = dbContext.Set<CustomerOrder>();
        }
    }
}

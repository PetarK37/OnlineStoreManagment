using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance
{
    public class EmployeeRepository : BaseRepository<Employee> , IEmployeeRepository
    {
        private readonly DbSet<Employee> _table;

        public EmployeeRepository(ShopDbContext dbContext) : base(dbContext) 
        { 
            _table = dbContext.Set<Employee>();
        }
    }
}

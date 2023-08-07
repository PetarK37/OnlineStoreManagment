using Domain.Entites;

namespace Domain.Interfaces.Repository
{
    public interface ISupplierOrderRepository : IBaseRepository<SupplierOrder>
    {
        SupplierOrder? GetById(Guid id);
    }
}

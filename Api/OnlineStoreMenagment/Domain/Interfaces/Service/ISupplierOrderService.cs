using Domain.DTO;
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface ISupplierOrderService
    {
        List<SupplierOrder> GetAll();
        SupplierOrder GetById(string id);
        Task<SupplierOrder> Add(SupplierOrderReqDTO dto);
        Task<SupplierOrder> Update(SupplierOrderUpdateDTO dto, string id);
    }
}

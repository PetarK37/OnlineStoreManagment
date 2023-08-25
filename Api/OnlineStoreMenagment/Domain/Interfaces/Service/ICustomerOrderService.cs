using Domain.DTO;
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface ICustomerOrderService
    {
        List<CustomerOrder> GetAll();
        CustomerOrder GetById(string id);
        Task<CustomerOrder> Add(CustomerOrderReqDTO dto);
        Task<CustomerOrder> Update(CustomerOrderUpdateDTO dto, string id);
    }
}

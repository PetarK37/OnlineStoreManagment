using Domain.DTO;
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IDiscountCodeService
    {
        List<DiscountCode> GetAll();
        DiscountCode GetById(string id);
        Task<DiscountCode> Add(DiscountCodeReqDTO code);
        Task<bool> Remove(string id);
    }
}

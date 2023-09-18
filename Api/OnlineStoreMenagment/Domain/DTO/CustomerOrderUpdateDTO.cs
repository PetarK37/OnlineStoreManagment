using static Domain.Entites.Enums;

namespace Domain.DTO
{
    public class CustomerOrderUpdateDTO
    {
        public OrderStatus? Status { get; set; }
        public string? TrackingCode { get; set; }
    }
}

using static Domain.Entites.Enums;

namespace Domain.DTO
{
    public class SupplierOrderUpdateDTO
    {
        public OrderStatus? Status { get; set; }
        public decimal? AdditionalExpense { get; set; }
    }
}

using Domain.Entites;

namespace Domain.DTO
{
    public class CustomerOrderReqDTO
    {
        public required string CustomerName { get; set; }
        public required string ShippingAddress { get; set; }
        public required string ContactPhone { get; set; }
        public string? CustomerEmail { get; set; }
        public string? PromoCode { get; set; }
        public decimal ShippingPrice { get; set; }
        public required List<OrderItemReqDTO> Items { get; set; }
    }
}

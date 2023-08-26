using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class CustomerOrder
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        public string ShippingAddress { get; set; }
        public string ContactPhone { get; set; }
        public string? CustomerEmail { get; set; }
        public DateTime RecivedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.IN_PROCESS;
        public string? PromoCode { get; set; }
        public string? TrackingCode { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal ShippingPrice { get; set; }
        public List<OrderItem> Items { get; set; }

        public CustomerOrder(string customerName, string shippingAddress, string contactPhone, string? customerEmail, string? promoCode, decimal shippingPrice)
        {
            CustomerName = customerName;
            ShippingAddress = shippingAddress;
            ContactPhone = contactPhone;
            CustomerEmail = customerEmail;
            PromoCode = promoCode;
            ShippingPrice = shippingPrice;
            Items = new List<OrderItem>();
            Status = OrderStatus.IN_PROCESS;
            RecivedOn = DateTime.UtcNow;
            UpdatedOn = DateTime.UtcNow;
        }
        public CustomerOrder() { }

    }
}

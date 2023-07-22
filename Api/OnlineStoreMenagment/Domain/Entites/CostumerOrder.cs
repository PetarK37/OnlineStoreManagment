using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class CostumerOrder
    {
        public Guid Id { get; set; }
        public required string CostumerName { get; set; }
        public required string ShippingAddress { get; set; }
        public required string ContactPhone { get; set; }
        public string? CostumerEmail{ get; set; }
        public DateTime RecivedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.IN_PROCESS;
        public string? PromoCode { get; set; }
        public string? TrackingCode { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal ShippingPrice { get; set; }
        public required List<OrderItem> Items { get; set; }
    }
}

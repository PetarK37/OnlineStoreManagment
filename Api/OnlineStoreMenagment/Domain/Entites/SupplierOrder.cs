using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class SupplierOrder
    {
        public Guid Id { get; set; }
        public string ItemLink { get; set; }
        public string TrackingLink { get; set; }
        public DateTime DisputeDate { get; set; }
        public DateTime? OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public decimal ItemPrice { get; set; }
        public int Quantity { get; set; }
        public Item? Item { get; set; }
        public Guid? ItemId { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.IN_PROCESS;


        public SupplierOrder(string itemLink, string trackingLink, DateTime disputeDate, DateTime? orderDate, decimal itemPrice, decimal totalPrice, int quantity)
        {
            ItemLink = itemLink;
            TrackingLink = trackingLink;
            DisputeDate = disputeDate;
            OrderDate = orderDate;
            ItemPrice = itemPrice;
            TotalPrice = totalPrice;
            Quantity = quantity;
            Status = OrderStatus.IN_PROCESS;
        }
    }


}

namespace Domain.Entites
{
    public class SupplierOrder
    {
        public Guid Id { get; set; }
        public required string ItemLink { get; set; }
        public required string TrackingLink { get; set; }
        public DateTime DisputeDate { get; set; }
        public required DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public decimal ItemPrice { get; set; }
        public int Quantity { get; set; }
        public Item? Item { get; set; }
        public Guid? ItemId { get; set; }
    }
}

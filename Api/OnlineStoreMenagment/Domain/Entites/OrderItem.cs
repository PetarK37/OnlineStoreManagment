namespace Domain.Entites
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public required Item Item { get; set; }
        public Guid ItemID { get; set; }
    }
}

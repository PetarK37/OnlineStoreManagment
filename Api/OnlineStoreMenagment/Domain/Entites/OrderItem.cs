namespace Domain.Entites
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public Item Item { get; set; }
        public Guid ItemID { get; set; }
        public decimal Price { get; set; }

        public OrderItem(Item item, int quantity)
        {
            Item = item;
            Quantity = quantity;
        }

        public OrderItem() { }
    }
}

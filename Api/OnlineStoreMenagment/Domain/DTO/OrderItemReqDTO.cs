namespace Domain.DTO
{
    public class OrderItemReqDTO
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public Guid ItemID { get; set; }
    }
}

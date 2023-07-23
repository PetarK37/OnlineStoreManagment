namespace Domain.Entites
{
    public class Price
    {
        public Guid Id { get; set; }
        public decimal Value { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
    }
}

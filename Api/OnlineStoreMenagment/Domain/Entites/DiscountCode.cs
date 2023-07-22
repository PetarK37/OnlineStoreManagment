namespace Domain.Entites
{
    public class DiscountCode
    {
        public Guid Id { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public required List<Category> Categories { get; set; }
    }
}

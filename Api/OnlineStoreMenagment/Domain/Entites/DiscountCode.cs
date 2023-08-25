namespace Domain.Entites
{
    public class DiscountCode
    {
        public Guid Id { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public decimal Discount { get; set; }
        public string Code { get; set; }
        public List<Category> Categories { get; set; }

        public DiscountCode(DateTime validFrom, DateTime validTo, string code)
        {
            ValidFrom = validFrom;
            ValidTo = validTo;
            Categories = new List<Category>();
            Code = code;
        }
    }
}

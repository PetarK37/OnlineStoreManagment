using Domain.Entites;

namespace Domain.DTO
{
    public class DiscountCodeReqDTO
    {
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public decimal Discount { get; set; }

        public required List<String> Categories { get; set; }
    }
}

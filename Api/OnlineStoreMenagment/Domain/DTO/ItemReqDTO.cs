using Domain.Entites;

namespace Domain.DTO
{
    public class ItemReqDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? Icon { get; set; }
        public required string CategoryId { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Domain.Entites
{
    public class Store
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        [MaxLength(9)]
        [MinLength(9)]  
        public required string PIB { get; set; }
        [MaxLength(8)]
        [MinLength(8)]
        public required string MB { get; set; }
        public required string Address { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required List<Social> Socials { get; set; }
        public required string ShippingName { get; set; }
        public required List<Employee> Employees { get; set; }
        public required List<Item> Inventory { get; set; }
        public bool IsSingleton { get; set; } = true;
    }
}

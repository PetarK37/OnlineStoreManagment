namespace Domain.Entites
{
    public class Store
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string PIB { get; set; }
        public required string MIB { get; set; }
        public required string Address { get; set; }
        public required string Phone { get; set; }
        public required string Email{ get; set;}
        public required List<string> Socials { get; set;}
        public required string ShippingName { get; set;}
        public required List<Employee> Employees { get; set;}
        public required List<Item>  Inventory { get; set;}
    }
}

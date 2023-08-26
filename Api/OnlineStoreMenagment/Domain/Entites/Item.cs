namespace Domain.Entites
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Icon { get; set; }
        public bool InStock { get; set; }
        public int Count { get; set; }
        public Category? Category { get; set; }
        public Guid CategoryId { get; set; }
        public List<Price> Prices { get; set; }

        public Item(string name, string description, string icon, int count)
        {
            Name = name;
            Description = description;
            Icon = icon;
            InStock = true;
            Count = count;
        }
    }
}

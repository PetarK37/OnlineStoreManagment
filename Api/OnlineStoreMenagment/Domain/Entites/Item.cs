using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites
{
    internal class Item
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? Icon { get; set; }
        public bool InStock { get; set; }
        public int Count { get; set; }
        public required Category Category { get; set; }
        public Guid CategoryId { get; set; }
    }
}

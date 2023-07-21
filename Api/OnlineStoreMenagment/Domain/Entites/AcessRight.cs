using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Entites.Enums;

namespace Domain.Entites
{
    internal class AcessRight
    {
        public Guid Id { get; set; }
        public ObjectName ObjectName { get; set; }
        public required List<Permision> Permisions { get; set; }
    }
}

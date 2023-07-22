using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class Permision
    {
        public Guid Id { get; set; }
        public EPermision Type { get; set; }
    }
}

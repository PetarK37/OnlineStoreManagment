

using Domain.Entites;
using System.ComponentModel.DataAnnotations;

namespace Domain.DTO
{
    public class StoreReqDTO
    {
        public required string Name { get; set; }
        [MaxLength(9)]
        [MinLength(9)]
        public required string PIB { get; set; }
        [MaxLength(8)]
        [MinLength(8)]
        public required string MIB { get; set; }
        public required string Address { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string ShippingName { get; set; }

    }
}

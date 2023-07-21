using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using static Domain.Entites.Enums;

namespace Domain.Entites
{
    internal class Employee
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Usermame { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public Role Role { get; set; } = Role.EMPLOYEE;
        public required List<AcessRight> AccessRights { get; set; }
    }
}

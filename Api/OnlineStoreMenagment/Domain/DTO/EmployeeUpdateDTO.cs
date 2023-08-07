using Domain.Entites;

namespace Domain.DTO
{
    public class EmployeeUpdateDTO
    {
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required List<AccessRight> AccessRights { get; set; }
        public  string? Password { get; set; }


    }
}

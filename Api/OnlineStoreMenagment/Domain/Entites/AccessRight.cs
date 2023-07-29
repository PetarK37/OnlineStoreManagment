using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class AccessRight
    {
        public Guid Id { get; set; }
        public ObjectName ObjectName { get; set; }
        public required HashSet<Permision> Permissions { get; set; }
    }
}

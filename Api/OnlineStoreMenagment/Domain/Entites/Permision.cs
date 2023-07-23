using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class Permision
    {
        public Guid Id { get; set; }
        public EPermision Type { get; set; }
    }
}

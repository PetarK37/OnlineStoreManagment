using System.Text.Json.Serialization;
using static Domain.Entites.Enums;

namespace Domain.Entites
{
    public class Permision
    {
        public Guid Id { get; set; }
        public EPermision Type { get; set; }
        [JsonIgnore]
        public List<AccessRight> AccessRights { get; set; }


        public override bool Equals(object obj)
        {
            if (obj is Permision otherPermision)
            {
                return Type.Equals(otherPermision.Type);
            }
            return false;
        }

        public override int GetHashCode()
        {
            return Type.GetHashCode();
        }
    }
}

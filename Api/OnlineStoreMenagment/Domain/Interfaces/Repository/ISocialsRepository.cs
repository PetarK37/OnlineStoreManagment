using Domain.Entites;

namespace Domain.Interfaces.Repository
{
    public interface ISocialsRepository : IBaseRepository<Social>
    {
        public void RemoveRange(IEnumerable<Social> socials);
    }
}

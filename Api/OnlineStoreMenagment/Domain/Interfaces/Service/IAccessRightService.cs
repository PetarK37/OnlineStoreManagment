using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IAccessRightService
    {
        Task<AccessRight> Add(AccessRight accessRight);
    }
}

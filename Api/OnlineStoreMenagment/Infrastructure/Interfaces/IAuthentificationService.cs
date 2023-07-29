using Domain.Entites;
using static Domain.Entites.Enums;

namespace Infrastructure.Interfaces
{
    public interface IAuthentificationService
    {
        bool HasPermission(Guid userId, ObjectName objectName, EPermision requiredPermission);
    }
}

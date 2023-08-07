using Domain.DTO;
using Domain.Entites;
using static Domain.Entites.Enums;

namespace Infrastructure.Interfaces
{
    public interface IAuthentificationService
    {
        bool HasPermission(Guid userId, ObjectName objectName, EPermision requiredPermission);
        JWTTokenDTO LogIn(LoginDTO dto);
    }
}

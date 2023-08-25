using Domain.Entites;
using Infrastructure.Interfaces;
using System.Security.Claims;
using static Domain.Entites.Enums;

namespace WebApi.Middleware
{
    public class PermissionMiddleware
    {
        private readonly RequestDelegate _next;

        public PermissionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IAuthentificationService authService)
        {
            var userRoleClaim = context.User.FindFirst(ClaimTypes.Role)?.Value;

            // If the user has an Admin role, grant access without checking specific permissions
            if (userRoleClaim != null && Enum.TryParse<Role>(userRoleClaim, out var userRole) && userRole == Role.ADMIN)
            {
                await _next(context);
                return;
            }

            var requiredObjectName = GetRequiredObjectName(context);

            if (requiredObjectName != null)
            {
                EPermision requiredPermission;

                // Map the HTTP method to the appropriate permission
                switch (context.Request.Method.ToUpper())
                {
                    case "GET":
                        requiredPermission = EPermision.READ;
                        break;
                    case "POST":
                    case "PUT":
                    case "DELETE":
                        requiredPermission = EPermision.WRITE;
                        break;
                    default:
                        context.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
                        return;
                }

                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId != null && authService.HasPermission(Guid.Parse(userId), requiredObjectName.Value, requiredPermission))
                {
                    await _next(context);
                    return;
                }

                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            await _next(context);
        }

        private static readonly Dictionary<string, ObjectName> ControllerNameToObjectNames = new Dictionary<string, ObjectName>
    {
        { "CostumerOrder", ObjectName.COSTUMER_ORDER },
        { "SupplierOrder", ObjectName.SUPPLIER_ORDER },
        { "ANYLITICS", ObjectName.ANYLITICS },
        { "DiscountCode", ObjectName.PROMO_CODE },
        { "Category", ObjectName.CATEGORY },
    };

        private ObjectName? GetRequiredObjectName(HttpContext context)
        {
            var routeData = context.GetRouteData();
            var controllerName = routeData?.Values["controller"]?.ToString();

            if (controllerName != null && ControllerNameToObjectNames.TryGetValue(controllerName, out var objectName))
            {
                return objectName;
            }

            return null;
        }


    }

}

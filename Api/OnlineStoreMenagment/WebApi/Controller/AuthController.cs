using Domain.DTO;
using Domain.Entites;
using Domain.Interfaces.Service;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace WebApi.Controller
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthentificationService _authentificationService;
        private readonly IEmployeeService _employeeService;

        public AuthController(IAuthentificationService authentificationService,IEmployeeService employeeService)
        {
            _authentificationService = authentificationService;
            _employeeService = employeeService;
        }

        [HttpPost]
        public ActionResult<JWTTokenDTO> LogIn([FromBody] LoginDTO dto)
        {
            return _authentificationService.LogIn(dto);
        }

        [HttpGet("whoami")]
        public ActionResult<Employee> GetOne()
        {
            var userEmail = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
            if(userEmail is null)
            {
                return NotFound("Email couldn't be found in JWT token");
            }
            var employee = _employeeService.GetByEmail(userEmail);
            return employee is null ? NotFound(String.Format("Employee with email {0} could not be found", userEmail)) : Ok(employee);
        }

    }
}

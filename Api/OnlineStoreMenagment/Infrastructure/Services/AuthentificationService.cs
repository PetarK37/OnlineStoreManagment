using Domain.Entites;
using Domain.Interfaces.Repository;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Domain.Entites.Enums;

namespace Infrastructure.Services
{
    public class AuthentificationService : IAuthentificationService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IConfiguration _configuration;


        public AuthentificationService(IEmployeeRepository employeeRepository,IConfiguration configuration)
        {
            _employeeRepository = employeeRepository;
            _configuration = configuration;
        }

        public bool HasPermission(Guid userId, ObjectName objectName, EPermision requiredPermission)
        {
            var employee = _employeeRepository.GetById(userId);

            if (employee == null) return false;

            return employee.AccessRights.Any(ar => (ar.ObjectName == objectName || ar.ObjectName == ObjectName.ALL) && ar.Permissions.Any(p => p.Type == requiredPermission));
        }

        private string GenerateJwtToken(Guid userId, Role role)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(ClaimTypes.Role, role.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}

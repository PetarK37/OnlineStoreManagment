using Domain.DTO;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthentificationService _authentificationService;

        public AuthController(IAuthentificationService authentificationService)
        {
            _authentificationService = authentificationService;
        }

        [HttpPost]
        public ActionResult<JWTTokenDTO> LogIn([FromBody] LoginDTO dto)
        {
            return _authentificationService.LogIn(dto);
        }

    }
}

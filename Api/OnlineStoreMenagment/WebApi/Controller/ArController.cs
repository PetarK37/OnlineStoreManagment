using Domain.Entites;
using Domain.Interfaces.Service;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ArController : ControllerBase
    {
        private readonly IAccessRightService _accessRightService;
        public ArController(IAccessRightService accessRightService) 
        { 
            _accessRightService = accessRightService;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> AddAr([FromBody] AccessRight dto)
        {
            var ar = await _accessRightService.Add(dto);
            return ar is null ? BadRequest("There has been problem while saving ar") : Ok(ar);
        }
    }
}

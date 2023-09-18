using Domain.DTO;
using Domain.Entites;
using Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DiscountCodeController : ControllerBase
    {
        private readonly IDiscountCodeService _discountCodeService;

        public DiscountCodeController(IDiscountCodeService discountCodeService)
        {
            _discountCodeService = discountCodeService;
        }

        [HttpGet]
        public ActionResult<List<DiscountCode>> GetAll()
        {
            return _discountCodeService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<DiscountCode> GetCodeById(string id)
        {
            var code = _discountCodeService.GetById(id);
            return code is null ? NotFound(String.Format("DiscountCode with id {0} could not be found", id)) : Ok(code);
        }

        [HttpPost]
        public async Task<ActionResult<DiscountCode>> AddCode([FromBody] DiscountCodeReqDTO dto)
        {
            var code = await _discountCodeService.Add(dto);
            return code is null ? BadRequest("There has been problem while saving DiscountCode") : Ok(code);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveCode(string id)
        {
            var ok = await _discountCodeService.Remove(id);
            return ok == true ? Ok() : BadRequest("There has been problem while removing DiscountCode");
        }
    }
}

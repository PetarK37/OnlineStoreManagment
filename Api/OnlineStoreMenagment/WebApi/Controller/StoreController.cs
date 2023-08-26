using Domain.DTO;
using Domain.Entites;
using Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public StoreController(IStoreService storeService)
        {
            _storeService = storeService;
        }
        [HttpGet]
        public ActionResult<Store> GetStore()
        {
            return _storeService.GetStore();
        }
        [Authorize(Roles = "ADMIN")]
        [HttpPut]
        public async Task<IActionResult> UpdateStore([FromBody] StoreReqDTO dto)
        {
            var store = await _storeService.UpdateStore(dto);
            return store == null ? BadRequest("There has been problem while updating store") : Ok(store);
        }
    }
}

using Domain.Entites;
using Domain.Interfaces.Service;
using Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public StoreController(IStoreService storeService)
        {
            _storeService = storeService;
        }
        [Authorize(Roles ="ADMIN")]
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

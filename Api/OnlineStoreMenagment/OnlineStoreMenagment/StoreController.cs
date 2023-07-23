using Domain.Entites;
using Domain.Interfaces.Service;
using Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace WebApi
{
    [Route("/api/store")]
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

        [HttpPut]
        public async Task<IActionResult> UpdateStore([FromBody] StoreReqDTO dto) 
        {
            var store = await _storeService.UpdateStore(dto);
            return store == null ? BadRequest() : Ok(store);
        }

    }
}

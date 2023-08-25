using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Domain.Interfaces.Service;
using Domain.DTO;
using Domain.Entites;

namespace WebApi.Controller
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> UpdateItem([FromBody] ItemReqDTO dto, string id)
        {
            var item = await _itemService.Update(id,dto);
            return item is null ? BadRequest("There has been problem while updating Item") : Ok(item);
        }
    }
}

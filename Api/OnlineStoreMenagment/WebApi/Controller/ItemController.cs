using Domain.DTO;
using Domain.Entites;
using Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{num}")]
        public ActionResult<Item> GetItem(int num)
        {
            var item =  _itemService.GetByNum(num);
            return item is null ? NotFound("No item found") : Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> UpdateItem([FromBody] ItemReqDTO dto, string id)
        {
            var item = await _itemService.Update(id, dto);
            return item is null ? BadRequest("There has been problem while updating Item") : Ok(item);
        }

        [HttpPut("/api/Price/{id}")]
        public async Task<ActionResult<Item>> UpdatePrice([FromBody] Price price, string id)
        {
            var item = await _itemService.UpdatePrice(id, price);
            return item is null ? BadRequest("There has been problem while updating Item") : Ok(item);
        }
    }
}

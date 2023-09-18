using Domain.Entites;
using Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/Anylitics")]
    [ApiController]
    [Authorize]
    public class AnylticsController : ControllerBase
    {
        private readonly IAnylticsService _anylticsService;

        public AnylticsController(IAnylticsService anylticsService)
        {
            _anylticsService = anylticsService;
        }

        [HttpGet]
        public ActionResult<List<SalesData>> GetSalesData([FromQuery] DateTime from, DateTime to)
        {
            var salesData = _anylticsService.GetSalesData(from, to);
            return Ok(salesData);
        }

        [HttpGet("{id}")]
        public ActionResult<List<ItemSalesData>> GetSalesData(Guid id, [FromQuery] int months)
        {
            var salesData = _anylticsService.GetItemSalesData(id, months);
            return Ok(salesData);
        }
    }
}

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
    public class SupplierOrderController : ControllerBase
    {
        private readonly ISupplierOrderService _supplierOrderService;

        public SupplierOrderController(ISupplierOrderService supplierOrderService)
        {
            _supplierOrderService = supplierOrderService;
        }

        [HttpGet]
        public ActionResult<List<SupplierOrder>> GetAll()
        {
            return _supplierOrderService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<List<SupplierOrder>> GetAll(string id)
        {
            var order = _supplierOrderService.GetById(id);
            return order is null ? NotFound(String.Format("SupplierOrder with id {0} could not be found", id)) : Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<SupplierOrder>> AddSupplierOrder([FromBody] SupplierOrderReqDTO dto)
        {
            var order = await _supplierOrderService.Add(dto);
            return order is null ? BadRequest("There has been problem while saving SupplierOrder") : Ok(order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SupplierOrder>> UpdateSupplierOrder([FromBody] SupplierOrderUpdateDTO dto, string id)
        {
            var order = await _supplierOrderService.Update(dto, id);
            return order is null ? BadRequest("There has been problem while updating SupplierOrder") : Ok(order);
        }
    }
}

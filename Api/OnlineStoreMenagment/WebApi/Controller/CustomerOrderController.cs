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
    public class CustomerOrderController : ControllerBase
    {
        private readonly ICustomerOrderService _customerOrderService;

        public CustomerOrderController(ICustomerOrderService customerOrderService)
        {
            _customerOrderService = customerOrderService;
        }

        [HttpGet]
        public ActionResult<List<CustomerOrder>> GetAll()
        {
            return _customerOrderService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<List<CustomerOrder>> GetAll(string id)
        {
            var order = _customerOrderService.GetById(id);
            return order is null ? NotFound(String.Format("SupplierOrder with id {0} could not be found", id)) : Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerOrder>> AddSupplierOrder([FromBody] CustomerOrderReqDTO dto)
        {
            var order = await _customerOrderService.Add(dto);
            return order is null ? BadRequest("There has been problem while saving CustomerOrder") : Ok(order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomerOrder>> UpdateCustomerOrder([FromBody] CustomerOrderUpdateDTO dto, string id)
        {
            var order = await _customerOrderService.Update(dto, id);
            return order is null ? BadRequest("There has been problem while updating CustomerOrder") : Ok(order);
        }
    }
}

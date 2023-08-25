using Domain.DTO;
using Domain.Entites;
using Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controller
{
    [Authorize(Roles = "ADMIN")]
    [ApiController]
    [Route("/api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public ActionResult<List<Employee>> GetAll()
        {
            return _employeeService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<List<Employee>> GetOne(string id)
        {
            var employee = _employeeService.GetById(id);
            return employee is null ? NotFound(String.Format("Employee with id {0} could not be found", id)) : Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee dto)
        {
            var employee = await _employeeService.Add(dto);
            return employee is null ? BadRequest("There has been problem while saving Employee") : Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee([FromBody] EmployeeUpdateDTO dto, string id)
        {
            var employee = await _employeeService.Update(dto, id);
            return employee is null ? BadRequest("There has been problem while updating Employee") : Ok(employee);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveEmployee(string id)
        {
            var ok = await _employeeService.Remove(id);
            return ok == true ? Ok() : BadRequest("There has been problem while removing Employee");
        }
    }
}

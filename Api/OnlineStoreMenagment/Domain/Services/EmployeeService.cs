using Domain.Entites;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;
using Domain.Exceptions;
using Domain.DTO;

namespace Domain.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAccessRightService _accessRightService;

        public EmployeeService(IEmployeeRepository employeeRepositorty,IAccessRightService accessRightService)
        {
            _employeeRepository = employeeRepositorty;
            _accessRightService = accessRightService;
        }

        public async Task<Employee> Add(Employee employee)
        {
            var employeeExists = _employeeRepository.GetBy(e => e.Usermame.Equals(employee.Usermame) || e.Email.Equals(employee.Email)).Any();
            if (employeeExists)
            {
                throw new EntityAlreadyExistsException("You can not add employee with duplicate username or email");
            }

            var processedAcessRights = new List<AccessRight>();
            foreach(var ar in employee.AccessRights)
            {
                var accessRight =await  _accessRightService.Add(ar);
                processedAcessRights.Add(accessRight);
            }

            employee.AccessRights = processedAcessRights;
            employee.Password = HashPassword(employee.Password);

            _employeeRepository.Add(employee);
            var success = await _employeeRepository.SaveAsync();
            return success > 0 ? employee : throw new ActionFailedException("There was a problem while saving Employee");
        }

        public List<Employee> GetAll()
        {
            return _employeeRepository.GetAll().ToList();
        }

        public Employee GetById(string id)
        {
            var employee = _employeeRepository.GetById(Guid.Parse(id));
            if (employee is null)
            {
                throw new EntityNotFoundException(String.Format("Employee with id: {0} was not found", id));
            }
            return employee;
        }


        public async Task<bool> Remove(string id)
        {
            var employee = _employeeRepository.GetById(Guid.Parse(id));
            if (employee is null)
            {
                throw new EntityNotFoundException(String.Format("Employee with id: {0} was not found", id));
            }
            employee.IsDeleted = true;
            var success = await _employeeRepository.SaveAsync();
            return success > 0 ? true : throw new ActionFailedException("There was a problem while deleting Employee");
        }

        public async Task<Employee> Update(EmployeeUpdateDTO dto,string id)
        {
            var employee = _employeeRepository.GetById(Guid.Parse(id));
            if (employee is null)
            {
                throw new EntityNotFoundException(String.Format("Employee with id: {0} was not found", id));
            }

            var processedAcessRights = new List<AccessRight>();
            foreach (var ar in dto.AccessRights)
            {
                var accessRight = await _accessRightService.Add(ar);
                processedAcessRights.Add(accessRight);
            }

            employee.AccessRights = processedAcessRights;

            employee.Name = dto.Name;
            employee.LastName = dto.LastName;
            if (!String.IsNullOrEmpty(dto.Password))
            {
                employee.Password = HashPassword(dto.Password);     
            }

            var success = await _employeeRepository.SaveAsync();
            return success > 0 ? employee : throw new ActionFailedException("There was a problem while updating Employee");
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

    }
}

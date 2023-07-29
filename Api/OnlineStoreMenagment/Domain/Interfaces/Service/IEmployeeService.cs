using Domain.DTO;
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IEmployeeService
    {
        Employee GetById(string id);
        List<Employee> GetAll();
        Task<Employee> Add(Employee employee);
        Task<Employee> Update(EmployeeUpdateDTO employee, string id);
        Task<bool> Remove(string id);
    }
}

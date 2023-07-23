using Domain.Entites;
using System.Linq.Expressions;

namespace Domain.Interfaces.Service
{
    public interface ICategoryService
    {
        List<Category> GetAll();
        Category GetById(string id);
        Task<Category> Add(Category category);
        Task<bool> Remove (string id);
    }
}

using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class CategoryService : ICategoryService
    {
        public readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Category> Add(Category category)
        {
            _categoryRepository.Add(category);
            var success = await _categoryRepository.SaveAsync();
            return success > 0 ? category : throw new ActionFailedException("There was a problem while saving Category");
        }

        public List<Category> GetAll()
        {
            return _categoryRepository.GetAll().ToList();
        }

        public Category GetById(string id)
        {
            var category = _categoryRepository.GetById(Guid.Parse(id));
            if (category is null)
            {
                throw new EntityNotFoundException(String.Format("Category with id: {0} was not found", id));
            }
            return category;
        }

        public async Task<bool> Remove(string id)
        {
            var category = _categoryRepository.GetById(Guid.Parse(id));
            if (category is null)
            {
                throw new EntityNotFoundException(String.Format("Category with id: {0} was not found", id));
            }
            category.IsDeleted = true;
            var success = await _categoryRepository.SaveAsync();
            return success > 0 ? true : throw new ActionFailedException("There was a problem while deleting Category");
        }
    }
}

using Domain.DTO;
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class DiscountCodeService : IDiscountCodeService
    {
        private readonly IDiscountCodeRepository _discountCodeRepository;
        private readonly ICategoryRepository _categoryRepository;

        public DiscountCodeService(IDiscountCodeRepository discountCodeRepository, ICategoryRepository categoryRepository)
        {
            _discountCodeRepository = discountCodeRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<DiscountCode> Add(DiscountCodeReqDTO dto)
        {
            var code = new DiscountCode(dto.ValidFrom, dto.ValidTo, dto.Code,dto.Discount);
            dto.Categories.ForEach(c =>
            {
                var category = _categoryRepository.GetById(Guid.Parse(c));
                if (category is null) { throw new ActionFailedException("You cannot crate DiscountCode with category that doesnt exist"); }
                code.Categories.Add(category);
            });
            _discountCodeRepository.Add(code);
            var success = await _discountCodeRepository.SaveAsync();
            return success > 0 ? code : throw new ActionFailedException("There was a problem while saving DiscountCode ");

        }

        public List<DiscountCode> GetAll()
        {
            return _discountCodeRepository.GetAll().ToList();
        }

        public DiscountCode GetById(string id)
        {
            var code = _discountCodeRepository.GetById(Guid.Parse(id));
            if (code is null)
            {
                throw new EntityNotFoundException(String.Format("DiscountCode with id: {0} was not found", id));
            }
            return code;
        }

        public async Task<bool> Remove(string id)
        {
            var code = _discountCodeRepository.GetById(Guid.Parse(id));
            if (code is null)
            {
                throw new EntityNotFoundException(String.Format("DiscountCode with id: {0} was not found", id));
            }
            _discountCodeRepository.Delete(code);
            var success = await _discountCodeRepository.SaveAsync();
            return success > 0 ? true : throw new ActionFailedException("There was a problem while removing DiscountCode ");
        }
    }
}

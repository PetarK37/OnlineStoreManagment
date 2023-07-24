using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class CategoryReqDTOValidator : AbstractValidator<Category>
    {
        public CategoryReqDTOValidator() 
        { 
            RuleFor(c => c.Name).MinimumLength(3).WithMessage("Name must be at least 3 chacters long");
        }
    }
}

using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator() 
        { 
            RuleFor(c => c.Name).MinimumLength(3).WithMessage("Name must be at least 3 chacters long");
        }
    }
}

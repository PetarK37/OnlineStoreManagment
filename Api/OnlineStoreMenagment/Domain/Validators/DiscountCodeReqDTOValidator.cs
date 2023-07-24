using Domain.DTO;
using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class DiscountCodeReqDTOValidator : AbstractValidator<DiscountCodeReqDTO>
    {
        public DiscountCodeReqDTOValidator() 
        { 
            RuleFor(c => c.ValidFrom).LessThan(c => c.ValidTo).WithMessage("DiscountCode cant expire before it starts to be valid");
            RuleFor(c => c.Discount).GreaterThan(0).WithMessage("DiscountCode must have positive discount greather than 0");
        }
    }
}

using Domain.DTO;
using FluentValidation;

namespace Domain.Validators
{
    public class DiscountCodeReqDTOValidator : AbstractValidator<DiscountCodeReqDTO>
    {
        public DiscountCodeReqDTOValidator() 
        { 
            RuleFor(c => c.ValidFrom).LessThan(c => c.ValidTo).WithMessage("DiscountCode cant expire before it starts to be valid");
            RuleFor(c => c.Discount).GreaterThan(0).WithMessage("DiscountCode must have positive discount greather than 0");
            RuleFor(c => c.Code).MinimumLength(3).WithMessage("DiscountCode must have at least 3 characters");
        }
    }
}

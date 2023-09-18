using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class AccessRightValidatior : AbstractValidator<AccessRight>
    {
        public AccessRightValidatior()
        {
            RuleFor(a => a.ObjectName).NotEmpty().WithMessage("AccesRight must have an object name");
            RuleFor(a => a.ObjectName).NotEmpty().WithMessage("AccesRight must have a list of permisions");
        }
    }
}

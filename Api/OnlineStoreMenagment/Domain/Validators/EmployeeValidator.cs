using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(e => e.Name).NotEmpty().WithMessage("Employee must have a neme");
            RuleFor(e => e.LastName).NotEmpty().WithMessage("Employee must have a lastname");
            RuleFor(e => e.Email).NotEmpty().WithMessage("Employee must have a email");
            RuleFor(e => e.Usermame).NotEmpty().WithMessage("Employee must have a username");
            RuleFor(e => e.Password).NotEmpty().WithMessage("Employee must have a password");
            RuleFor(e => e.AccessRights).NotEmpty().WithMessage("Employee must have at least one acces right");
            RuleFor(e => e.Role).NotEmpty().WithMessage("Employee must have a role");
        }
    }
}

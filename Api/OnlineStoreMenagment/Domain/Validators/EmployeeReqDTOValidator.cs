using Domain.DTO;
using FluentValidation;

namespace Domain.Validators
{
    public class EmployeeReqDTOValidator : AbstractValidator<EmployeeUpdateDTO>
    {
        public EmployeeReqDTOValidator()
        {
            RuleFor(e => e.Name).NotEmpty().WithMessage("Employee must have a neme");
            RuleFor(e => e.LastName).NotEmpty().WithMessage("Employee must have a lastname");
            RuleFor(e => e.AccessRights).NotEmpty().WithMessage("Employee must have at least one access right");
        }
    }
}

using Domain.DTO;
using FluentValidation;

namespace Domain.Validators
{
    public class StoreValidator : AbstractValidator<StoreReqDTO>
    {
        public StoreValidator() { 
            RuleFor(s => s.Name).NotEmpty().WithMessage("Name cannot be empty");
            RuleFor(s => s.Address).NotEmpty().WithMessage("Address cannot be empty");
            RuleFor(s => s.Phone).NotEmpty().WithMessage("Phone cannot be empty");
            RuleFor(s => s.ShippingName).NotEmpty().WithMessage("Shipping name cannot be empty");
            RuleFor(s => s.Email).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(s => s.MB).Length(8).WithMessage("MB must be exactlly 8 characters long");
            RuleFor(s => s.PIB).Length(9).WithMessage("PIB must be exactlly 9 characters long");
            RuleFor(s => s.Socials).NotEmpty().WithMessage("Store must have at least one social network acc");
        }
    }
}

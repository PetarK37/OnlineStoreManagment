using Domain.DTO;
using FluentValidation;

namespace Domain.Validators
{
    public class CustomerOrderDTOValidator : AbstractValidator<CustomerOrderReqDTO>
    {
        public CustomerOrderDTOValidator()
        {
            RuleFor(o => o.CustomerName).NotEmpty().WithMessage("Customer order must contain cutomer name");
            RuleFor(o => o.ShippingAddress).NotEmpty().WithMessage("Customer order must contain shipping address");
            RuleFor(o => o.ShippingPrice).NotEmpty().WithMessage("Customer order must contain shipping price");
            RuleFor(o => o.ContactPhone).NotEmpty().WithMessage("Customer order must contain cutomer phone");
            RuleFor(o => o.Items).NotEmpty().WithMessage("Customer order must contain at least one item");
        }
    }
}

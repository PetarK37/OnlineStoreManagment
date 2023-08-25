using Domain.DTO;
using FluentValidation;

namespace Domain.Validators
{
    public class SupplierOrderReqDTOValidator : AbstractValidator<SupplierOrderReqDTO>
    {
        public SupplierOrderReqDTOValidator()
        {
            RuleFor(o => o.ItemLink).NotEmpty().WithMessage("Supplier order must have original item link");
            RuleFor(o => o.TrackingLink).NotEmpty().WithMessage("Supplier order must have original tracking link");
            RuleFor(o => o.ItemPrice).GreaterThan(0).WithMessage("Price of ordered item must be > 0");
            RuleFor(o => o.TotalPrice).GreaterThan(0).WithMessage("Total price of order must be > 0");
            RuleFor(o => o.DisputeDate).GreaterThan(o => o.OrderDate).WithMessage("Dispute date of an order must be after order date");
            RuleFor(o => o.Quantity).GreaterThan(0).WithMessage("Quantity of ordered item must be > 0");
        }
    }
}

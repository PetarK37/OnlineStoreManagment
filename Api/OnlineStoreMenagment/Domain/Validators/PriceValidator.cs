using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class PriceValidator : AbstractValidator<Price>
    {
        public PriceValidator()
        {
            RuleFor(p => p.Value).GreaterThan(0).WithMessage("Price can only be greather than zero");
            RuleFor(p => p.ValidTo).GreaterThan(p => p.ValidFrom).WithMessage("Valid to date of an price must be after valid from");
            RuleFor(p => p.ValidFrom.DayOfYear).GreaterThanOrEqualTo(DateTime.Now.DayOfYear).WithMessage("You can only add prices for today and days after");
        }
    }
}

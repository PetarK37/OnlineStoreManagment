using Domain.DTO;
using FluentValidation;

namespace Domain.Validators
{
    public class ItemReqDTOValidator : AbstractValidator<ItemReqDTO>
    {
        public ItemReqDTOValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Item name must not be an empty string.");
            RuleFor(i => i.Description).NotEmpty().WithMessage("Item desc must not be an empty string.");
            RuleFor(i => i.Icon).Must(n => n == null || !string.IsNullOrEmpty(n.Trim())).WithMessage("Item icon must not be an empty string.");
        }
    }
}

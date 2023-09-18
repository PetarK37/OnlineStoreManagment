using Domain.Entites;
using FluentValidation;

namespace Domain.Validators
{
    public class ItemValidator : AbstractValidator<Item>
    {
        public ItemValidator()
        {
            RuleFor(x => x.Prices).Must(NoOverlappingPrices).WithMessage("Item can not have overlaping prices.");
        }

        private bool NoOverlappingPrices(List<Price> prices)
        {
            for (int i = 0; i < prices.Count; i++)
            {
                for (int j = i + 1; j < prices.Count; j++)
                {
                    if (prices[i].ValidFrom <= prices[j].ValidTo && prices[j].ValidFrom <= prices[i].ValidTo)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}

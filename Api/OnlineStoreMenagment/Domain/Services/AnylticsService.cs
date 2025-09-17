
using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class AnylticsService : IAnylticsService
    {
        private readonly ICustomerOrderRepository _customerOrderRepository;

        public AnylticsService(ICustomerOrderRepository customerOrderRepository)
        {
            _customerOrderRepository = customerOrderRepository;
        }

        public List<SalesData> GetSalesData(DateTime from, DateTime to)
        {
            var salesData = _customerOrderRepository.GetBy(order => order.RecivedOn >= from && 
            order.RecivedOn <= to && order.Status == Enums.OrderStatus.RECIVED)
            .SelectMany(order => order.Items)
            .GroupBy(orderItem => new { orderItem.ItemID, orderItem.Item.Name,orderItem.Item.ItemNum })
            .Select(grouped => new SalesData
            {
                itemNum = grouped.Key.ItemNum,
                ItemName = grouped.Key.Name,
                TotalSold = grouped.Sum(orderItem => orderItem.Quantity)
            })
            .OrderByDescending(sales => sales.TotalSold)
            .ToList();

            return salesData;
        }

        public ItemSalesData GetItemSalesData(Guid itemId, int months)
        {
            if (months > 12)
            {
                throw new ForbbidenActionException("You can not get sales anylticis for longer than 12 months");
            }
            DateTime startOfMonth = DateTime.Now.AddMonths(-months + 1).Date.AddDays(-DateTime.Now.Day + 1);
            DateTime endOfMonth = DateTime.Now;

            var salesData = _customerOrderRepository.GetBy(order => order.RecivedOn >= startOfMonth 
            && order.RecivedOn <= endOfMonth && order.Status == Enums.OrderStatus.RECIVED)
            .SelectMany(order => order.Items.Where(orderItem => orderItem.ItemID.Equals(itemId))
            .Select(orderItem => new
            {
                Year = order.RecivedOn.Year,
                Month = order.RecivedOn.Month,
                Quantity = orderItem.Quantity,
                ItemId = orderItem.Item.Id

            })).GroupBy(item => new
            {
                item.Year,
                item.Month,
                item.ItemId
            }).Select(grouped => new MonthlySales
            {
                Month = grouped.Key.Month,
                TotalSold = grouped.Sum(item => item.Quantity)
            })
            .OrderByDescending(s => s.Month).ToList();

            // Slučajevi kada nemamo prodaje u tom mesecu
            for (int i = 0; i < months; i++)
            {
                DateTime monthDate = DateTime.Now.AddMonths(-i);
                if (!salesData.Any(s => s.Month == monthDate.Month))
                {
                    salesData.Add(new MonthlySales { Month = monthDate.Month, TotalSold = 0 });
                }
            }
            return new ItemSalesData
            {
                itemId = itemId,
                MonthlySalesData = salesData.OrderBy(s => s.Month).ToList()
            };
        }

    }
}

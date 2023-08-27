
using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IAnylticsService
    {
        List<SalesData> GetSalesData(DateTime from, DateTime to);
        ItemSalesData GetItemSalesData(Guid itemId, int months);
    }
}

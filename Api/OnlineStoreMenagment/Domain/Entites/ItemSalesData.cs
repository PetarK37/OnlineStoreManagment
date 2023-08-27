namespace Domain.Entites
{
    public class ItemSalesData
    {
        public Guid ItemId { get; set; }
        public List<MonthlySales> MonthlySalesData { get; set; }
    }

    public class MonthlySales
    {
        public int Month { get; set; }
        public int TotalSold { get; set; }
    }
}

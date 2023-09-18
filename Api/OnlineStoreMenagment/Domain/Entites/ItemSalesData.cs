namespace Domain.Entites
{
    public class ItemSalesData
    {
        public int itemNum { get; set; }
        public List<MonthlySales> MonthlySalesData { get; set; }
    }

    public class MonthlySales
    {
        public int Month { get; set; }
        public int TotalSold { get; set; }
    }
}

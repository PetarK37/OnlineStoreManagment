using Domain.Entites;

namespace Domain.Interfaces.Service
{
    public interface IMailService
    {
        void SendOrderCreationEmail(string to, CustomerOrder order, string storeName);
        void SendTrackingNumEmail(string to, string trackingNum, string storeName);
        void SendDisputeReminderEmail(SupplierOrder supplierOrder, Store store);
    }
}

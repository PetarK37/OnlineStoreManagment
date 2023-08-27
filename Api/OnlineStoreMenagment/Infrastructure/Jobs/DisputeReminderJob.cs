using Domain.Exceptions;
using Domain.Interfaces.Service;
using Quartz;

namespace Infrastructure.Jobs
{
    public class DisputeReminderJob : IJob
    {
        private readonly ISupplierOrderService _supplierOrderService;
        private readonly IMailService _mailService;
        private readonly IStoreService _storeService;

        public DisputeReminderJob(ISupplierOrderService supplierOrderService, IMailService mailService,IStoreService storeService)
        {
            _supplierOrderService = supplierOrderService;
            _mailService = mailService;
            _storeService = storeService;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var orders = _supplierOrderService.GetOrdersForDisputeReminder();
            var store = _storeService.GetStore();
            if (store is null)
            {
                throw new EntityNotFoundException("There was a problem while retriving store from a db");
            }
            foreach (var order in orders)
            {
                _mailService.SendDisputeReminderEmail(order,store);
            }
        }
    }

}

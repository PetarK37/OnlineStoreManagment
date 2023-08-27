using Domain.Entites;
using Domain.Interfaces.Service;
using MailKit.Net.Smtp;
using MimeKit;
using RazorLight;

namespace Domain.Services
{
    public class MailService : IMailService
    {
        public void SendDisputeReminderEmail()
        {
            throw new NotImplementedException();
        }

        public async void SendOrderCreationEmail(string to, CustomerOrder order, string storeName)
        {
            var template = await RenderOrderCreationTemplateAsync(order, storeName);
            SendEmail(to, "Primljena porudžbina", template);
        }

        public async void SendTrackingNumEmail(string to, string trackingNum, string storeName)
        {
            var template = await RenderOrderShippedTemplateAsync(trackingNum, storeName);
            SendEmail(to, "Poslata porudžbina", template);
        }

        public async void SendDisputeReminderEmail(SupplierOrder supplierOrder,Store store)
        {
            var template = await RenderOrderDisputeTemplateAsync(supplierOrder.ItemLink, supplierOrder.TrackingLink, supplierOrder.DisputeDate, store.Name, supplierOrder.Item);
            SendEmail(store.Email, "Dispute porudžbine", template);
        }

        private void SendEmail(string to, string subject, string htmlBody)
        {
            var smtpServer = Environment.GetEnvironmentVariable("SMTP_SERVER");
            var smtpPort = int.Parse(Environment.GetEnvironmentVariable("SMTP_PORT") ?? "587");
            var smtpUsername = Environment.GetEnvironmentVariable("SMTP_USERNAME");
            var smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD");
            var emailFrom = Environment.GetEnvironmentVariable("EMAIL_FROM");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Diplonski Rad", emailFrom));
            message.To.Add(new MailboxAddress("", to));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = htmlBody
            };
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            client.Connect(smtpServer, smtpPort, false);
            client.Authenticate(smtpUsername, smtpPassword);
            client.Send(message);
            client.Disconnect(true);
        }

        public async Task<string> RenderOrderCreationTemplateAsync(CustomerOrder order, string storeName)
        {
            var engine = new RazorLightEngineBuilder()
                .UseFileSystemProject("C:\\Users\\petar\\OneDrive\\Desktop\\Faks\\Diplomski\\Api\\OnlineStoreMenagment\\Domain\\Templates\\")
                .UseMemoryCachingProvider()
                .Build();

            var model = new
            {
                Order = order,
                StoreName = storeName
            };

            string result = await engine.CompileRenderAsync("orderCreationTemplate.cshtml", model);
            return result;
        }

        public async Task<string> RenderOrderShippedTemplateAsync(string trackingNum, string storeName)
        {
            var engine = new RazorLightEngineBuilder()
                .UseFileSystemProject("C:\\Users\\petar\\OneDrive\\Desktop\\Faks\\Diplomski\\Api\\OnlineStoreMenagment\\Domain\\Templates\\")
                .UseMemoryCachingProvider()
                .Build();

            var model = new
            {
                TrackingNumber = trackingNum,
                StoreName = storeName
            };

            string result = await engine.CompileRenderAsync("orderShippedTemplate.cshtml", model);
            return result;
        }

        public async Task<string> RenderOrderDisputeTemplateAsync(string itemLink, string trackinglink,DateTime disuteDate,string storeName,Item item)
        {
            var engine = new RazorLightEngineBuilder()
                .UseFileSystemProject("C:\\Users\\petar\\OneDrive\\Desktop\\Faks\\Diplomski\\Api\\OnlineStoreMenagment\\Domain\\Templates\\")
                .UseMemoryCachingProvider()
                .Build();

            var model = new
            {
                ItemLink = itemLink,
                TrackingLink = trackinglink,
                DisputeDate = disuteDate,
                StoreName = storeName,
                Item = item
            };

            string result = await engine.CompileRenderAsync("orderDisputeTemplate.cshtml", model);
            return result;
        }
    }


}

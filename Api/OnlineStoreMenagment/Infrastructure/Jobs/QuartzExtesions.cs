using Microsoft.Extensions.Configuration;
using Quartz;

namespace Infrastructure.Jobs
{
    public static class QuartzExtensions
    {
        public static void AddJobAndTrigger<T>(this IServiceCollectionQuartzConfigurator quartz, IConfiguration configuration)
            where T : IJob
        {
            string jobKey = typeof(T).Name;

            quartz.AddJob<T>(j => j
                .StoreDurably()
                .WithIdentity(jobKey)
                .WithDescription($"{jobKey} job"));

            quartz.AddTrigger(t => t
                .ForJob(jobKey)
                .WithIdentity($"{jobKey}-trigger")
                .WithCronSchedule("0 0 8 * * ?")  // Every day at 8 AM.
                .WithDescription($"{jobKey} trigger"));
        }
    }

}

using System;
using System.Threading.Tasks;
using Infrastructure.Data.Migrations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            //will run new migrations and databases updates on start up 
            var host = CreateHostBuilder(args).Build();
           using (var scope = host.Services.CreateScope())
           {
               var services = scope.ServiceProvider;
               var loggerFactory = services.GetRequiredService<ILoggerFactory>();
               try
               {
                   var context = services.GetRequiredService<StoreContext>();
                   await context.Database.MigrateAsync(); //will apply ny pending migrations and apply changes to database if changes do not exist
               }
               catch (Exception ex)
               {
                   var logger = loggerFactory.CreateLogger<Program>();
                   logger.LogError(ex, "An error occurred during migration");
               }

               host.Run();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

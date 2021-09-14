using System;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Infrastructure.Data.Migrations
{
    public class StoreContext : DbContext 
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
            
        }
        public DbSet<Product> Products { get; set; }

    }
}
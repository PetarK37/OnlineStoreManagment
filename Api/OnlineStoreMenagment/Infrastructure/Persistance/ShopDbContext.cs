using Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance
{
    public class ShopDbContext : DbContext
    {
        public ShopDbContext() : base() { }
        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) { }

        public DbSet<Store> Store { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<CostumerOrder> CostumerOrders { get; set; }
        public DbSet<SupplierOrder> SuppliersOrders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DiscountCode> DiscountCodes { get; set; }
        public DbSet<AccessRight> AccessRights { get; set; }
        public DbSet<Permision> Permisions { get; set; }
        public DbSet<Social> Socials { get; set; }
        public DbSet<UserAccessRight> UserAccessRights { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}

using Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance.Context
{
    public class ShopDbContext : DbContext
    {

        public ShopDbContext() : base() { }
        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=PETAR-K\\SQLEXPRESS;Initial Catalog= OnlineStore; Integrated Security=SSPI;Encrypt=false;TrustServerCertificate=true");
            }
        }
        public DbSet<Store> Store { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<CustomerOrder> CostumerOrders { get; set; }
        public DbSet<SupplierOrder> SuppliersOrders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DiscountCode> DiscountCodes { get; set; }
        public DbSet<AccessRight> AccessRights { get; set; }
        public DbSet<Permision> Permisions { get; set; }
        public DbSet<Social> Socials { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DiscountCode>().HasMany(d => d.Categories).WithMany();
            modelBuilder.Entity<Employee>().HasMany(e => e.AccessRights).WithMany();
            modelBuilder.Entity<AccessRight>().HasMany(ar => ar.Permissions).WithMany(p => p.AccessRights);

            modelBuilder.Entity<Store>().HasIndex(s => s.IsSingleton).IsUnique();
            modelBuilder.Entity<Category>().HasIndex(c => c.Name).IsUnique();
            modelBuilder.Entity<DiscountCode>().HasIndex(c => c.Code).IsUnique();
            modelBuilder.Entity<Permision>().HasIndex(c => c.Type).IsUnique();
            modelBuilder.Entity<Social>().HasIndex(s => s.Link).IsUnique();

            modelBuilder.Entity<Store>().Navigation(s => s.Employees).AutoInclude();
            modelBuilder.Entity<Store>().Navigation(s => s.Socials).AutoInclude();
            modelBuilder.Entity<Store>().Navigation(s => s.Inventory).AutoInclude();
            modelBuilder.Entity<DiscountCode>().Navigation(c => c.Categories).AutoInclude();
            modelBuilder.Entity<AccessRight>().Navigation(c => c.Permissions).AutoInclude();
            modelBuilder.Entity<Employee>().Navigation(e => e.AccessRights).AutoInclude();
            modelBuilder.Entity<Item>().Navigation(i => i.Prices).AutoInclude();
            modelBuilder.Entity<Item>().Navigation(i => i.Category).AutoInclude();
            modelBuilder.Entity<CustomerOrder>().Navigation(o => o.Items).AutoInclude();
            modelBuilder.Entity<OrderItem>().Navigation(o => o.Item).AutoInclude();
            modelBuilder.Entity<SupplierOrder>().Navigation(o => o.Item).AutoInclude();
                


            modelBuilder.Entity<Store>().HasQueryFilter(s => s.IsSingleton);
            modelBuilder.Entity<Category>().HasQueryFilter(c => !c.IsDeleted);
            modelBuilder.Entity<Employee>().HasQueryFilter(e => !e.IsDeleted);
        }
    }
}

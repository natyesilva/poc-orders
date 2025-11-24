using Microsoft.EntityFrameworkCore;
using Orders.Api.Models; // ajuste se estiver em outro namespace

namespace Orders.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}

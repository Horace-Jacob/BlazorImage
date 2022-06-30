using Microsoft.EntityFrameworkCore;
using BlazorApp.Shared.Models;

namespace BlazorApp.Server.Models
{
    public class ImageDatabaseContext : DbContext
    {

        public ImageDatabaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Image> image { get; set; }
    }
}

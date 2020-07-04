using Microsoft.EntityFrameworkCore;
using Todo_App.API.Models.Entities;

namespace Todo_App.API.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions options) : base(options) { }

        public TodoContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=todoapp.db");
        }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
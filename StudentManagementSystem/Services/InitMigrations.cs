using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Services
{
    public class InitMigrations
    {
        private readonly StudentContext context;
        public InitMigrations(StudentContext context)
        {
            this.context = context;
        }
        public void MigrateDatabase()
        {
            context.Database.Migrate();
        }
    }
}

using Microsoft.EntityFrameworkCore;
namespace StudentManagementSystem.Models
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options)
        {

        }
        public DbSet<Users> users { get; set; }
        public DbSet<Course> courses { get; set; }
        public DbSet<Grade> grades { get; set; }
        public DbSet<Subject> subjects { get; set; }
        public DbSet<StudentClass> classes { get; set; }
        public DbSet<Exam> exams { get; set; }
        public DbSet<Student> students { get; set; }
        public DbSet<CourseSubject> CourseSubjects { get; set; }
        public DbSet<CourseStudent> courseStudents { get; set; }
        public DbSet<CourseExam> courseExams { get; set; }
    }

}

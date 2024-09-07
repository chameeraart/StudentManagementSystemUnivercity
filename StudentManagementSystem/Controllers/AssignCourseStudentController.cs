using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class AssignCourseStudentController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/AssignCourseStudent.cshtml");
        }

        public StudentContext Context { get; }
        public AssignCourseStudentController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var courseStudents = Context.courseStudents.Include(t =>t.Course).Include(t => t.Student).Where(x => x.isactive == true).OrderBy(x => x.studentid);
            return new ObjectResult(courseStudents);
        }
        public IActionResult LoadTable()
        {
            var courseStudents = Context.courseStudents.OrderBy(x => x.studentid);
            return new ObjectResult(courseStudents);
        }

        public IActionResult Create([FromBody] CourseStudent courseStudent)
        {
            courseStudent.created_at = DateTime.Now;
            courseStudent.created_by = 1;
            Context.Update(courseStudent);
            Context.SaveChanges();
            return new ObjectResult(courseStudent.id);
        }

        public IActionResult get(int id)
        {
            var courseStudent = Context.courseStudents.Include(t => t.Course).Include(t => t.Student).Where(x => x.courseid == id).ToList();
            return new ObjectResult(courseStudent);
        }

        public IActionResult delete(int id)
        {
            var delecourseStudent = Context.courseStudents.FirstOrDefault(s => s.id == id);
            if (delecourseStudent != null)
            {
                Context.courseStudents.Remove(delecourseStudent);
                Context.SaveChanges();
            }

            return new ObjectResult(delecourseStudent.id);
        }
    }
}

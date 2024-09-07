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
            var CourseSubjects = Context.CourseSubjects.Include(t =>t.Subject).Include(t => t.Course).Where(x => x.isactive == true).OrderBy(x => x.subjectid);
            return new ObjectResult(CourseSubjects);
        }
        public IActionResult LoadTable()
        {
            var CourseSubjects = Context.CourseSubjects.OrderBy(x => x.subjectid);
            return new ObjectResult(CourseSubjects);
        }

        public IActionResult Create([FromBody] CourseSubject courseSubject)
        {
            courseSubject.created_at = DateTime.Now;
            courseSubject.created_by = 1;
            Context.Update(courseSubject);
            Context.SaveChanges();
            return new ObjectResult(courseSubject.id);
        }

        public IActionResult get(int id)
        {
            var courseSubject = Context.CourseSubjects.Include(t => t.Subject).Include(t => t.Course).Where(x => x.courseid == id).ToList();
            return new ObjectResult(courseSubject);
        }

        public IActionResult delete(int id)
        {
            var delecourseSubject = Context.CourseSubjects.FirstOrDefault(s => s.id == id);
            if (delecourseSubject != null)
            {
                Context.CourseSubjects.Remove(delecourseSubject);
                Context.SaveChanges();
            }

            return new ObjectResult(delecourseSubject.id);
        }
    }
}

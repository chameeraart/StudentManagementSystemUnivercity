using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class CourseController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Course.cshtml");
        }

        public StudentContext Context { get; }
        public CourseController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var courses = Context.courses.Where(x => x.isactive == true).OrderBy(x => x.name);
            return new ObjectResult(courses);
        }
        public IActionResult LoadTable()
        {
            var courses = Context.courses.OrderBy(x => x.name);
            return new ObjectResult(courses);
        }

        public IActionResult Create([FromBody]  Course course)
        {
            course.created_at = DateTime.Now;
            course.created_by = 1;
            Context.Update(course);
            Context.SaveChanges();
            return new ObjectResult(course.id);
        }

        public IActionResult get(int id)
        {
            var course = Context.courses.Where(x => x.id == id).SingleOrDefault();
            return new ObjectResult(course);
        }

        public IActionResult delete(int id)
        {
            var delecourse = Context.courses.FirstOrDefault(s => s.id == id);
            if (delecourse != null)
            {
                Context.courses.Remove(delecourse);
                Context.SaveChanges();
            }

            return new ObjectResult(delecourse.id);
        }
    }
}

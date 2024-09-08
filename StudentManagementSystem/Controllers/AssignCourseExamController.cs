using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class AssignCourseExamController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/AssignCourseExam.cshtml");
        }

        public StudentContext Context { get; }
        public AssignCourseExamController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var courseExams = Context.courseExams.Include(t =>t.Course).Include(t => t.Exam).Where(x => x.isactive == true).OrderBy(x => x.courseid);
            return new ObjectResult(courseExams);
        }
        public IActionResult LoadTable()
        {
            var courseExams = Context.courseExams.OrderBy(x => x.courseid);
            return new ObjectResult(courseExams);
        }

        public IActionResult Create([FromBody] CourseExam courseExam)
        {
            courseExam.created_at = DateTime.Now;
            courseExam.created_by = 1;
            Context.Update(courseExam);
            Context.SaveChanges();
            return new ObjectResult(courseExam.id);
        }

        public IActionResult get(int id)
        {
            var courseExams = Context.courseExams.Include(t => t.Course).Include(t => t.Exam).Where(x => x.courseid == id).ToList();
            return new ObjectResult(courseExams);
        }

        public IActionResult delete(int id)
        {
            var delecourseExam = Context.courseExams.FirstOrDefault(s => s.id == id);
            if (delecourseExam != null)
            {
                Context.courseExams.Remove(delecourseExam);
                Context.SaveChanges();
            }

            return new ObjectResult(delecourseExam.id);
        }
    }
}

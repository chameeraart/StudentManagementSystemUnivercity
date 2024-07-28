using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class GradeController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Grade.cshtml");
        }

        public StudentContext Context { get; }
        public GradeController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var grades = Context.grades.Where(x => x.isactive == true).OrderBy(x => x.name);
            return new ObjectResult(grades);
        }
        public IActionResult LoadTable()
        {
            var grades = Context.grades.OrderBy(x => x.name);
            return new ObjectResult(grades);
        }

        public IActionResult Create([FromBody] Grade grade)
        {
            grade.created_at = DateTime.Now;
            grade.created_by = 1;
            Context.Update(grade);
            Context.SaveChanges();
            return new ObjectResult(grade.id);
        }

        public IActionResult get(int id)
        {
            var grade = Context.grades.Where(x => x.id == id).SingleOrDefault();
            return new ObjectResult(grade);
        }

        public IActionResult delete(int id)
        {
            var delecgrade = Context.grades.FirstOrDefault(s => s.id == id);
            if (delecgrade != null)
            {
                Context.grades.Remove(delecgrade);
                Context.SaveChanges();
            }

            return new ObjectResult(delecgrade.id);
        }
    }
}

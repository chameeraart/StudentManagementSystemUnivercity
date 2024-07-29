using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class ExamController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Exam.cshtml");
        }
        public StudentContext Context { get; }
        public ExamController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var exams = Context.exams.Where(x => x.isactive == true).OrderBy(x => x.ExamName);
            return new ObjectResult(exams);
        }
        public IActionResult LoadTable()
        {
            var exams = Context.exams.OrderBy(x => x.ExamName);
            return new ObjectResult(exams);
        }

        public IActionResult Create([FromBody] Exam exam)
        {
            exam.created_at = DateTime.Now;
            exam.created_by = 1;
            Context.Update(exam);
            Context.SaveChanges();
            return new ObjectResult(exam.Id);
        }

        public IActionResult get(int id)
        {
            var exam = Context.exams.Where(x => x.Id == id).SingleOrDefault();
            return new ObjectResult(exam);
        }

        public IActionResult delete(int id)
        {
            var deleexam = Context.exams.FirstOrDefault(s => s.Id == id);
            if (deleexam != null)
            {
                Context.exams.Remove(deleexam);
                Context.SaveChanges();
            }

            return new ObjectResult(deleexam.Id);
        }
    }
}

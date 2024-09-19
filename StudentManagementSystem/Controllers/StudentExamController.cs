using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class StudentExamController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/StudentExam.cshtml");
        }
        public StudentContext Context { get; }
        public StudentExamController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var examsmarks = Context.ExamMarks.Include(t =>t.Exam).Include(t =>t.Student).Where(x => x.isactive == true).OrderBy(x => x.Id);
            return new ObjectResult(examsmarks);
        }
        public IActionResult LoadTable()
        {
            var exams = Context.ExamMarks.OrderBy(x => x.Id);
            return new ObjectResult(exams);
        }

        public IActionResult Create([FromBody] ExamMark examMark)
        {
            examMark.created_at = DateTime.Now;
            examMark.created_by = 1;
            Context.Update(examMark);
            Context.SaveChanges();
            return new ObjectResult(examMark.Id);
        }

        public IActionResult get(int id)
        {
            var exam = Context.ExamMarks.Include(t => t.Exam).Include(t => t.Student).Where(x => x.Id == id).SingleOrDefault();
            return new ObjectResult(exam);
        }

        public IActionResult delete(int id)
        {
            var deleexam = Context.ExamMarks.FirstOrDefault(s => s.Id == id);
            if (deleexam != null)
            {
                Context.ExamMarks.Remove(deleexam);
                Context.SaveChanges();
            }

            return new ObjectResult(deleexam.Id);
        }
    }
}

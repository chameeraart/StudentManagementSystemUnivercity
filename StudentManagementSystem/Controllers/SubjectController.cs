using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class SubjectController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Subject.cshtml");
        }

        public StudentContext Context { get; }
        public SubjectController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var subjects = Context.subjects.Include(t =>t.Exam).Include(t =>t.Course).Where(x => x.isactive == true).OrderBy(x => x.name);
            return new ObjectResult(subjects);
        }
        public IActionResult LoadTable()
        {
            var subjects = Context.subjects.Include(t =>t.Exam).OrderBy(x => x.name);
            return new ObjectResult(subjects);
        }

        public IActionResult Create([FromBody] Subject subject)
        {
            subject.created_at = DateTime.Now;
            subject.created_by = 1;
            Context.Update(subject);
            Context.SaveChanges();
            return new ObjectResult(subject.id);
        }

        public IActionResult get(int id)
        {
            var subject = Context.subjects.Include(t =>t.Exam).Include(t =>t.Course).Where(x => x.id == id).SingleOrDefault();
            return new ObjectResult(subject);
        }

        public IActionResult delete(int id)
        {
            var deleSubject = Context.subjects.FirstOrDefault(s => s.id == id);
            if (deleSubject != null)
            {
                Context.subjects.Remove(deleSubject);
                Context.SaveChanges();
            }

            return new ObjectResult(deleSubject.id);
        }
    }
}

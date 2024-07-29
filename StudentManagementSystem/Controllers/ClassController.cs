using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class ClassController : Controller
    {


        public IActionResult Index()
        {
            return View("~/Views/Pages/Class.cshtml");
        }

        public StudentContext Context { get; }
        public ClassController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var classes = Context.classes.Where(x => x.isactive == true).OrderBy(x => x.name);
            return new ObjectResult(classes);
        }
        public IActionResult LoadTable()
        {
            var classes = Context.classes.OrderBy(x => x.name);
            return new ObjectResult(classes);
        }

        public IActionResult Create([FromBody] StudentClass studentClass)
        {
            studentClass.created_at = DateTime.Now;
            studentClass.created_by = 1;
            Context.Update(studentClass);
            Context.SaveChanges();
            return new ObjectResult(studentClass.id);
        }

        public IActionResult get(int id)
        {
            var studentclass = Context.classes.Where(x => x.id == id).SingleOrDefault();
            return new ObjectResult(studentclass);
        }

        public IActionResult delete(int id)
        {
            var delestudentclass = Context.classes.FirstOrDefault(s => s.id == id);
            if (delestudentclass != null)
            {
                Context.classes.Remove(delestudentclass);
                Context.SaveChanges();
            }

            return new ObjectResult(delestudentclass.id);
        }
    }
}

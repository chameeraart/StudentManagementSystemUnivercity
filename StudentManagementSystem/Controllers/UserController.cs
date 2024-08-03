using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/User.cshtml");
        }

        public StudentContext Context { get; }
        public UserController(StudentContext context)
        {
            Context = context;
        }

        public IActionResult GetAll()
        {
            var users = Context.users.Where(x => x.isactive == true).OrderBy(x => x.username);
            return new ObjectResult(users);
        }
        public IActionResult LoadTable()
        {
            var users = Context.users.OrderBy(x => x.username);
            return new ObjectResult(users);
        }

        public IActionResult Create([FromBody] Users users)
        {
            Context.Update(users);
            Context.SaveChanges();
            return new ObjectResult(users.Id);
        }

        public IActionResult get(int id)
        {
            var user = Context.users.Where(x => x.Id == id).SingleOrDefault();
            return new ObjectResult(user);
        }

        public IActionResult delete(int id)
        {
            var deleuser = Context.users.FirstOrDefault(s => s.Id == id);
            if (deleuser != null)
            {
                Context.users.Remove(deleuser);
                Context.SaveChanges();
            }

            return new ObjectResult(deleuser.Id);
        }
    }
}

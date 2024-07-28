using Microsoft.AspNetCore.Mvc;

namespace StudentManagementSystem.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Login.cshtml");
        }
    }
}

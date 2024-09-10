using Microsoft.AspNetCore.Mvc;

namespace StudentManagementSystem.Controllers
{
    public class StudentExamController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/StudentExam.cshtml");
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Email;
using StudentManagementSystem.Models;
using StudentManagementSystem.Services;
using StudentManagementSystem.Email;

namespace StudentManagementSystem.Controllers
{
    public class StudentExamController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/StudentExam.cshtml");
        }
        public StudentContext Context { get; }
        private readonly EmailService _emailService;
        public StudentExamController(StudentContext context, EmailService emailService)
        {
            Context = context;
            _emailService = emailService;
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
            EmailBuilder emailBuilder = new EmailBuilder();
            examMark.created_at = DateTime.Now;
            examMark.created_by = 1;
            Context.Update(examMark);


            var student = Context.students.Where(x => x.id == examMark.studentid).FirstOrDefault();
            var exam = Context.exams.Where(x => x.Id == examMark.examid).FirstOrDefault();
            var studenytsubject = Context.subjects.Where(x => x.examid == examMark.examid).FirstOrDefault();


            var grades = Context.grades.ToList(); // Assuming you have a DbSet<Grade> in your context

            // Find the grade that matches the mark range
            var grade = grades.FirstOrDefault(g => g.from <= examMark.mark && g.to >= examMark.mark && g.isactive);


            string toEmail = student.StudentEmail;    
            string subject = "Exam Result";
            string body = emailBuilder.BuildExamResultEmail(
                       studentName: student.FullName,
                       examName: exam.ExamName,
                       studentId: student.id,
                       subject: studenytsubject.name,
                       mark: examMark.mark,
                       grade.name
       );

            _emailService.SendEmailAsync(toEmail, subject, body);
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

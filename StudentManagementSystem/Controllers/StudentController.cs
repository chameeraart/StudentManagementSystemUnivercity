using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Dto;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Student.cshtml");
        }

        public IActionResult StuduentView()
        {
            return View("~/Views/Pages/StudentView.cshtml");
        }

        public StudentContext Context { get; }
        public StudentController(StudentContext context)
        {
            Context = context;


        }

        public async Task<ActionResult<IEnumerable<Student>>> getall()
        {
            return await Context.students.ToListAsync();
        }

        public IActionResult GetAllStudent()
        {
            var courses = Context.students.Where(x => x.isactive == true).OrderBy(x => x.FullName);
            return new ObjectResult(courses);
        }


        public async Task<ActionResult<Student>> GetStudent(string id)
        {
            var student = await Context.students.Where(t => t.id == Convert.ToInt32(id)).FirstOrDefaultAsync();
            student.PhotoPath = student.PhotoPath.Replace("wwwroot", "");
            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        public async Task<ActionResult<Student>> Create([FromForm] StudentDto studentDto)
        {
            var student = new Student
            {
                Index = studentDto.Index,
                FullName = studentDto.FullName,
                NameWithInitials = studentDto.NameWithInitials,
                DateOfBirth = studentDto.DateOfBirth,
                Gender = studentDto.Gender,
                StudentEmail = studentDto.StudentEmail,
                Address = studentDto.Address,
                GuardianName = studentDto.GuardianName,
                GuardianEmail = studentDto.GuardianEmail,
                Telephone = studentDto.Telephone,
                isactive = studentDto.IsActive,
                Comments = studentDto.Comments,
                created_at = DateTime.Now,
                created_by = 1 // Replace with actual user ID
            };
            string formattedDate = studentDto.DateOfBirth.ToString("yyyyMMdd");
            if (studentDto.Photo != null && studentDto.Photo.Length > 0)
            {
                // Handle file upload
                var filePath = Path.Combine("wwwroot/images", Path.GetFileName(studentDto.Photo.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await studentDto.Photo.CopyToAsync(stream);
                }
                student.PhotoPath = filePath;
            }

            Context.students.Add(student);
            await Context.SaveChangesAsync();
            Users users = new Users();
            users.username = studentDto.StudentEmail;
            users.isactive = true;
            users.password = formattedDate;
            users.UserType = Users.UserTypes.User;
            users.property_id = 100;
            users.companyid = 100;
            users.studentId = student.id;
            Context.Update(users);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.Index }, student);
        }


        public async Task<IActionResult> Update(string id, [FromForm] StudentDto studentDto)
        {
            var student = await Context.students.Where(t => t.id == Convert.ToInt32(studentDto.id)).FirstOrDefaultAsync();
            string formattedDate = studentDto.DateOfBirth.ToString("yyyyMMdd");
            if (student == null)
            {
                return NotFound();
            }
            student.Index = student.Index;
            student.FullName = studentDto.FullName;
            student.NameWithInitials = studentDto.NameWithInitials;
            student.DateOfBirth = studentDto.DateOfBirth;
            student.Gender = studentDto.Gender;
            student.StudentEmail = studentDto.StudentEmail;
            student.Address = studentDto.Address;
            student.GuardianName = studentDto.GuardianName;
            student.GuardianEmail = studentDto.GuardianEmail;
            student.Telephone = studentDto.Telephone;
            student.isactive = studentDto.IsActive;
            student.Comments = studentDto.Comments;
            student.updated_at = DateTime.Now;
            student.updated_by = 1; // Replace with actual user ID

            if (studentDto.Photo != null && studentDto.Photo.Length > 0)
            {
                // Handle file upload
                var filePath = Path.Combine("wwwroot/images", Path.GetFileName(studentDto.Photo.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await studentDto.Photo.CopyToAsync(stream);
                }
                student.PhotoPath = filePath;
            }

            Context.Entry(student).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }


        public async Task<IActionResult> Delete(string id)
        {
            var student = await Context.students.Where(t => t.id == Convert.ToInt32(id)).FirstOrDefaultAsync();

            if (student == null)
            {
                return NotFound();
            }

            Context.students.Remove(student);
            await Context.SaveChangesAsync();

            return NoContent();
        }



        public IActionResult Getnext()
        {
            var stuendent = Context.students.Count();
            int newno = Convert.ToInt32(stuendent) + 1;
            StudentIndexNoDto g = new StudentIndexNoDto();
            g.Id = 1;

            g.Nextno = "S-" + newno.ToString();

            return new ObjectResult(g);
        }

    }
}

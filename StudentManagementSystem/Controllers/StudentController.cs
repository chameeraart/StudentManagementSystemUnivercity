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

        public StudentContext Context { get; }
        public StudentController(StudentContext context)
        {
            Context = context;


        }

        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await Context.students.ToListAsync();
        }


        public async Task<ActionResult<Student>> GetStudent(string id)
        {
            var student = await Context.students.FindAsync(id);

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
                AdmissionDate = studentDto.AdmissionDate,
                AdmissionGrade = studentDto.AdmissionGrade,
                CurrentGrade = studentDto.CurrentGrade,
                FinalGrade = studentDto.FinalGrade,
                FinalYear = studentDto.FinalYear,
                Comments = studentDto.Comments,
                BirthCertificateNumber = studentDto.BirthCertificateNumber,
                created_at = DateTime.Now,
                created_by = 1 // Replace with actual user ID
            };

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

            return CreatedAtAction(nameof(GetStudent), new { id = student.Index }, student);
        }


        public async Task<IActionResult> Update(string id, [FromForm] StudentDto studentDto)
        {
            var student = await Context.students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

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
            student.AdmissionDate = studentDto.AdmissionDate;
            student.AdmissionGrade = studentDto.AdmissionGrade;
            student.CurrentGrade = studentDto.CurrentGrade;
            student.FinalGrade = studentDto.FinalGrade;
            student.FinalYear = studentDto.FinalYear;
            student.Comments = studentDto.Comments;
            student.BirthCertificateNumber = studentDto.BirthCertificateNumber;
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
            var student = await Context.students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            Context.students.Remove(student);
            await Context.SaveChangesAsync();

            return NoContent();
        }

    }
}

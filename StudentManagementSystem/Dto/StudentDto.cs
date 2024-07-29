using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Dto
{
    public class StudentDto
    {
        public string Index { get; set; }
        public string FullName { get; set; }
        public string NameWithInitials { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; }
        public string StudentEmail { get; set; }

        public string Address { get; set; }
        public string GuardianName { get; set; }
        public string GuardianEmail { get; set; }
        public string Telephone { get; set; }
        public bool IsActive { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string AdmissionGrade { get; set; }
        public string CurrentGrade { get; set; }
        public string FinalGrade { get; set; }
        public string FinalYear { get; set; }
        public string Comments { get; set; }
        public string BirthCertificateNumber { get; set; }
        public IFormFile Photo { get; set; }
        public string PhotoPath { get; set; }
    }
}

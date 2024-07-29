using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Student
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string Index { get; set; }

        [Required]
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Required]
        [Display(Name = "Name With Initials")]
        public string NameWithInitials { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date Of Birth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Student Email")]
        public string StudentEmail { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [Display(Name = "Guardian")]
        public string GuardianName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Guardian Email")]
        public string GuardianEmail { get; set; }

        [Required]
        [Phone]
        [Display(Name = "Telephone")]
        public string Telephone { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Admission Date")]
        public DateTime AdmissionDate { get; set; }

        [Required]
        [Display(Name = "Admission Grade")]
        public string AdmissionGrade { get; set; }

        [Required]
        [Display(Name = "Current Grade")]
        public string CurrentGrade { get; set; }

        [Display(Name = "Final Grade")]
        public string FinalGrade { get; set; }

        [Display(Name = "Final Year")]
        public string FinalYear { get; set; }

        [Display(Name = "Comments")]
        public string Comments { get; set; }

        [Display(Name = "Birth Certificate Number")]
        public string BirthCertificateNumber { get; set; }
        public string PhotoPath { get; set; }

        public DateTime created_at { get; set; }
        public int created_by { get; set; }
        public DateTime? updated_at { get; set; }
        public int? updated_by { get; set; }
        public DateTime? deleted_at { get; set; }
        public int? deleted_by { get; set; }

        [DefaultValue(true)]
        public bool isactive { get; set; }


    }
}

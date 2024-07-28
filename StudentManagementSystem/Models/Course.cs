using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace StudentManagementSystem.Models
{
    public class Course
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
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

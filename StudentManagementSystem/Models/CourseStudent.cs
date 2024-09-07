using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace StudentManagementSystem.Models
{
    public class CourseStudent
    {
        [Key]
        public int id { get; set; }

        public int? courseid { get; set; }
        [ForeignKey("courseid")]
        public virtual Course Course { get; set; }
        public int? studentid { get; set; }
        [ForeignKey("studentid")]
        public virtual Student Student { get; set; }
        public string? Remark { get; set; }
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

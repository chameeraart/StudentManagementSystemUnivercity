
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagementSystem.Models
{
    public class CourseSubject
    {
        [Key]
        public int id { get; set; }

        public int? courseid { get; set; }
        [ForeignKey("courseid")]
        public virtual Course Course { get; set; }
        public int? subjectid { get; set; }
        [ForeignKey("subjectid")]
        public virtual Subject Subject { get; set; }
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

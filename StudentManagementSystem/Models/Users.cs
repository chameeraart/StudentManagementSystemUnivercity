using System.ComponentModel;

namespace StudentManagementSystem.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public UserTypes UserType { get; set; }
        public int companyid { get; set; }
        public int property_id { get; set; }

        [DefaultValue(true)]
        public bool isactive { get; set; }

        public enum UserTypes
        {
            Admin = 100,
            User = 101,
        }
    }
}

using StudentManagementSystem.Models;

namespace StudentManagementSystem.Services
{
    public class Seed
    {
        public StudentContext Context { get; }

        public Seed(StudentContext context)
        {

            Context = context;
        }

        public void SeedData()
        {


            var users = Context.users.ToList();

            if (users.Count==0)
            {
                var userlist = new List<Users> {
                   new Users {username="admin",password="admin",UserType= StudentManagementSystem.Models.Users.UserTypes.Admin,isactive=true,studentId=0},
                        new Users {username="ruvi",password="123",UserType= StudentManagementSystem.Models.Users.UserTypes.Admin, isactive = true,studentId=0},
            };

                Context.AddRange(userlist);
                Context.SaveChanges();

            }

        }
    }
}

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


            var users = Context.users;

            if (users == null)
            {
                var userlist = new List<Users> {
                   new Users {username="admin",password="admin",UserType= StudentManagementSystem.Models.Users.UserTypes.Admin,isactive=true},
                        new Users {username="ruvi",password="123",UserType= StudentManagementSystem.Models.Users.UserTypes.Admin, isactive = true},
            };

                Context.AddRange(userlist);
                Context.SaveChanges();

            }

        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentManagementSystem.Auth;
using StudentManagementSystem.Models;
using StudentManagementSystem.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace StudentManagementSystem.Controllers
{
    public class AuthController : Controller
    {
        private StudentContext _context;

        public SessionManager SessionManager { get; }


        public AuthController(StudentContext context, SessionManager sessionManager)
        {
            _context = context;
            SessionManager = sessionManager;
        }

        //[HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            int studentid = 0;
            string image = "";
            string name = "";
            // TODO: Encrypt password
            var user = _context.users
                .Where(t =>
                    t.username == loginDto.Username &&
                    t.password == loginDto.Password &&
                    t.isactive == true
                 )
                 .FirstOrDefault();

            if (user == null)
            {
                return BadRequest("User name or Password Error");
            }

            // admin ?
            var claims = new List<Claim>();
            if (user.UserType == StudentManagementSystem.Models.Users.UserTypes.Admin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }

            if (user.UserType == StudentManagementSystem.Models.Users.UserTypes.User)
            {
                studentid= Convert.ToInt32(user.studentId);
                var student = _context.students.Where(t => t.id == studentid).FirstOrDefault();
                image = "";
                name = student.FullName;
            }
            else
            {
                studentid = 0;
                image ="";
                name = "";
            }

            // symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(SessionManager.salt);

            // signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            // add claims
            claims.Add(new Claim(ClaimTypes.Role, "user"));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

            // create token
            var token = new JwtSecurityToken
            (
                issuer: SessionManager.Issuer,
                audience: SessionManager.Audiance,
                expires: DateTime.Now.AddDays(15),
                signingCredentials: signingCredentials,
                claims: claims
            );


            return new ObjectResult(new UserDto()
            {
                JWT = new JwtSecurityTokenHandler().WriteToken(token),
                UserID = user?.Id,
                JwtValidFrom = token.ValidFrom,
                JwtValidTo = token.ValidTo,
                TokenType = "bearer",
                userrole = user?.UserType.ToString(),
                username = user?.username,
                studentid = studentid,
                image= image,
                name = name,

            });
        }
    }
}

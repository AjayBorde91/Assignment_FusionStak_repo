using DotnetAngularApi.Context;
using DotnetAngularApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DotnetAngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            // Finding the user in the database based on username and password
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);
            // If the user is not found, return a user Not Found response
            if (user == null)
                return NotFound(new { Message = "User Not Found!" });

            user.Token = CreateJwt(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success!"
            });
        }
        // Registration endpoint to add a new user to the database
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
            // Adding the new user to the database
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            // Returning a success message
            return Ok(new
            {
                Message = "User Registered!"
            });
        }
        // Helper method to create a JWT token for a user
        private string CreateJwt(User user)
        {

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Industry),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials 
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        // Endpoint to get a list of all users
        [Authorize] //if user is login and token is generated then only user can access api of list of users 
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }

        //check username exist
        [HttpGet("username-exists")]
        public async Task<IActionResult> CheckUsernameExists(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest();

            var userExists = await _authContext.Users.AnyAsync(u => u.Username == username);

            return Ok(new { exists = userExists });
        }


        // Endpoint to reset a user's password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetRequest)
        {
            if (resetRequest == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == resetRequest.Username);

            if (user == null) 
                return NotFound(new { Message = "User Not Found!" }); 

            // Update the user's password with the new password
            user.Password = resetRequest.NewPassword;

            // Save changes to the database
            await _authContext.SaveChangesAsync();

            // Return a success message
            return Ok(new
            {
                Message = "Password Reset Successfully!"
            });
        }




    }
}

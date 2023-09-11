using System.ComponentModel.DataAnnotations;

namespace DotnetAngularApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }    
        public string CompanyName { get; set; }
        public string Industry { get; set; }
        public string Token { get; set; }

    }
}

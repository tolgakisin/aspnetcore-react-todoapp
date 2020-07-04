using System.ComponentModel.DataAnnotations;

namespace Todo_App.API.Models
{
    public class LoginVM
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
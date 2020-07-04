namespace Todo_App.API.Models.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
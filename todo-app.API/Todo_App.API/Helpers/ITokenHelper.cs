using Todo_App.API.Models.Entities;

namespace Todo_App.API.Helpers
{
    public interface ITokenHelper
    {
        string GenerateJwtToken(User user);
    }
}
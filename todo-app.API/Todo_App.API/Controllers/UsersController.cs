using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Todo_App.API.Helpers;
using Todo_App.API.Models;
using Todo_App.API.Models.Entities;

namespace Todo_App.API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ITokenHelper _tokenHelper;
        public UsersController(ITokenHelper tokenHelper)
        {
            _tokenHelper = tokenHelper;
        }

        [HttpPost("Register")]
        public IActionResult Register(UserVM userVM)
        {
            using (TodoContext _context = new TodoContext())
            {
                if (userVM == null || string.IsNullOrEmpty(userVM.Username) || string.IsNullOrEmpty(userVM.Password)) return BadRequest();

                if (_context.Users.SingleOrDefault(u => u.Username == userVM.Username) != null) return Conflict("Username is already registered.");

                try
                {
                    _context.Add(new User
                    {
                        Username = userVM.Username,
                        Password = userVM.Password
                    });
                    _context.SaveChanges();

                    return Ok();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody] LoginVM loginVm)
        {
            using (TodoContext _context = new TodoContext())
            {
                if (loginVm == null || string.IsNullOrEmpty(loginVm.Username) || string.IsNullOrEmpty(loginVm.Password)) return BadRequest();

                User user = _context.Users.SingleOrDefault(u => u.Username == loginVm.Username && u.Password == loginVm.Password);
                if (user == null) return Unauthorized();

                string token = _tokenHelper.GenerateJwtToken(user);

                return Ok(JsonConvert.SerializeObject(token));
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Todo_App.API.Models;
using Todo_App.API.Models.Entities;

namespace Todo_App.API.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class TodoController : ControllerBase
    {
        private readonly IMapper _mapper;
        public TodoController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            using (TodoContext _context = new TodoContext())
            {
                var userId = User.FindFirstValue(ClaimTypes.Name);
                List<Todo> todos = _context.Todos.Where(t => !t.IsDeleted && t.UserId == Convert.ToInt32(userId)).ToList();
                List<TodosVM> todoList = _mapper.Map<List<TodosVM>>(todos);

                return Ok(JsonConvert.SerializeObject(todoList));
            }
        }

        [HttpPost("ConfirmTodo/{id:int:min(1)}")]
        public IActionResult ConfirmTodo(int? id)
        {
            if (id == null) return NotFound();

            using (TodoContext _context = new TodoContext())
            {
                var userId = User.FindFirstValue(ClaimTypes.Name);
                Todo todo = _context.Todos.FirstOrDefault(t => t.Id == id);
                if (todo == null) return NotFound();

                try
                {
                    todo.IsDone = !todo.IsDone;
                    if (todo.IsDone)
                        todo.DoneDate = DateTime.Now;
                    else
                        todo.DoneDate = default(DateTime);

                    _context.SaveChanges();

                    return Ok();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        [HttpPost]
        public IActionResult Post(TodoVM todoVm)
        {
            if (todoVm == null || string.IsNullOrEmpty(todoVm.Content)) return BadRequest("Object is null");

            var userId = User.FindFirstValue(ClaimTypes.Name);

            using (TodoContext _context = new TodoContext())
            {
                Todo todo = new Todo()
                {
                    Content = todoVm.Content,
                    UserId = Convert.ToInt32(userId)
                };

                try
                {
                    _context.Todos.Add(todo);
                    _context.SaveChanges();

                    return Ok(JsonConvert.SerializeObject(todo));
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        [HttpDelete("{id:int:min(1)}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) return NotFound();

            using (TodoContext _context = new TodoContext())
            {
                Todo todo = _context.Todos.FirstOrDefault(t => t.Id == id);
                if (todo == null) return NotFound();

                try
                {
                    todo.IsDeleted = true;
                    todo.DeletedDate = DateTime.Now;
                    _context.SaveChanges();

                    return Ok();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }
}
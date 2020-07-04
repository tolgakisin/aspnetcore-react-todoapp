using AutoMapper;
using Todo_App.API.Models;
using Todo_App.API.Models.Entities;

namespace Todo_App.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Todo, TodosVM>();
        }
    }
}
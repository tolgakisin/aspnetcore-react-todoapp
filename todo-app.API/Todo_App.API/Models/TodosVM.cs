namespace Todo_App.API.Models
{
    public class TodosVM
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsDone { get; set; }
        public System.DateTime CreatedDate { get; set; }
    }
}
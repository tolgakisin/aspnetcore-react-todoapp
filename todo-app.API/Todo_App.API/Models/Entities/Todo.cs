namespace Todo_App.API.Models.Entities
{
    public class Todo : BaseEntity
    {
        public Todo()
        {
            CreatedDate = System.DateTime.Now;
            IsDeleted = false;
            IsDone = false;
        }

        public string Content { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime DeletedDate { get; set; }
        public bool IsDone { get; set; }
        public System.DateTime DoneDate { get; set; }
        public bool IsDeleted { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
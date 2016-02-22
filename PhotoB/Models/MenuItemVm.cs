namespace PhotoB.Models
{
    public class MenuItemVm
    {
        public string Url { get; set; }
        public string DisplayName { get; set; }
        public string Number { get; internal set; }
        public int TargetId { get; set; }
    }
}

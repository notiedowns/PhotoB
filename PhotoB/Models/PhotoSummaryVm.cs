namespace PhotoB.Models
{
    public class PhotoSummaryVm
    {
        public int Id { get; set; }

        public string Number { get; set; }

        public string Name { get; set; }

        public string ImagePath { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }
    }
}

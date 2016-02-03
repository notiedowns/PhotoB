using System;
using System.ComponentModel.DataAnnotations;

namespace PhotoB.Models.Products
{
    public class PhotoVm
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter a Number")]
        [MaxLength(10, ErrorMessage = "Number can be maximum 10 characters")]
        public string Number { get; set; }

        [Required(ErrorMessage = "Please select a category")]
        public int? CategoryId { get; set; }

        public string CategoryName { get; set; }

        [Required(ErrorMessage = "Please enter a Name")]
        [MaxLength(50, ErrorMessage = "Name can be maximum 50 characters")]
        public string Name { get; set; }

        [MaxLength(200, ErrorMessage = "Image path can be maximum 200 characters")]
        public string ImagePath { get; set; }

        [Required(ErrorMessage = "Please enter a Price")]
        public decimal? Price { get; set; }
        
        public DateTime? DateListed { get; set; }

        [MaxLength(50, ErrorMessage = "Author can be maximum 50 characters")]
        public string Author { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoB.Models.Products
{
    public class PhotoVm
    {
        [Required(ErrorMessage = "Please enter a Number")]
        public string Number { get; set; }

        [Required(ErrorMessage = "Please enter a Name")]
        [MaxLength(50, ErrorMessage = "Name can be maximum 50 characters")]
        public string Name { get; set; }

        public decimal Price { get; set; }

        public DateTime DateListed { get; set; }

        [Required(ErrorMessage = "Please enter an Author")]
        public string Author { get; set; }
    }
}

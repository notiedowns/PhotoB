using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoB.Models.Products
{
    public class CategoryVm
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter a Name")]
        [MaxLength(20, ErrorMessage = "Name can be maximum 20 characters")]
        public string Name { get; set; }

        [MaxLength(50, ErrorMessage = "Description can be maximum 50 characters")]
        public string Description { get; set; }

        public string LastChangedBy { get; set; }

        public DateTime LastChanged { get; set; }
    }
}

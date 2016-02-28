using System.ComponentModel.DataAnnotations;

namespace PhotoB.Models
{
    public class CustomerVm
    {
        // Address details
        [Required(ErrorMessage = "Please enter a Name")]
        [MaxLength(50, ErrorMessage = "Name can be maximum 50 characters")]
        public string  Name { get; set; }

        [Required(ErrorMessage = "Please enter a Street Address")]
        [MaxLength(200, ErrorMessage = "Name can be maximum 200 characters")]
        public string StreetAddress { get; set; }

        [Required(ErrorMessage = "Please enter a Postal Code")]
        [MaxLength(10, ErrorMessage = "Postal Code can be maximum 10 characters")]
        public string PostalCode { get; set; }

        [Required(ErrorMessage = "Please enter a City")]
        [MaxLength(100, ErrorMessage = "City can be maximum 100 characters")]
        public string City { get; set; }

        [Required(ErrorMessage = "Please enter an Email Address")]
        [EmailAddress(ErrorMessage = "Please enter a valid Email Address")]
        [MaxLength(100, ErrorMessage = "Email Address can be maximum 100 characters")]
        public string EmailAddress { get; set; }


        // Payment details
        public string PaymentMethod { get; set; }
    }
}

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PhotoB.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Photo
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public decimal Price { get; set; }
        public System.DateTime DateListed { get; set; }
        public string Author { get; set; }
        public string LastChangedBy { get; set; }
        public System.DateTime LastChanged { get; set; }
    
        public virtual Category Category { get; set; }
    }
}

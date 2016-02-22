using System.Collections.Generic;
using System.Linq;

namespace PhotoB.Models
{
    public class CartVm
    {
        public CartVm()
        {
            Photos = new List<PhotoVm>();
        }

        public List<PhotoVm> Photos { get; set; }

        public int Count { get { return Photos.Count; } }

        public decimal TotalCost { get { return Photos.Where(p => p.Price.HasValue).Sum(x => x.Price.Value); } }
    }
}
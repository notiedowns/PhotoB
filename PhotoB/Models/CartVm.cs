using PhotoB.Models.Products;
using System.Collections.Generic;
using System.Linq;

namespace PhotoB.Controllers
{
    public class CartVm
    {
        public CartVm()
        {
            Photos = new List<PhotoVm>();
        }

        public List<PhotoVm> Photos { get; set; }

        public int Count { get { return Photos.Count; } }

        public decimal TotalCost { get { return Photos.Where(p => p.Price != null).Sum(x => x.Price.Value); } }
    }
}
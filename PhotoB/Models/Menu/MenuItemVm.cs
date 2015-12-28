using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoB.Models.Menu
{
    public class MenuItemVm
    {
        public string Url { get; set; }
        public string DisplayName { get; set; }
        public string Number { get; internal set; }
    }
}

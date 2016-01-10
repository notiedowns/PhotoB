using PhotoB.Models.Menu;
using PhotoB.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoB.Repositories
{
    public class MenuRepository
    {
        private static MenuItemVm[] MenuData;

        static MenuRepository()
        {
            MenuData = new[]
            {
                new MenuItemVm { DisplayName = "Photo List", Url = "/Shop/#/PhotoList/"},
                new MenuItemVm { DisplayName = "Create New Photo", Url = "/Shop/#/CreatePhoto"},
                new MenuItemVm { DisplayName = "BS Table", Url = "/Shop/#/BSTable"},
                new MenuItemVm { DisplayName = "BS Table Angular", Url = "/Shop/#/BSTableAngular"}
            };
        }

        public MenuItemVm[] GetMenuList()
        {
            return MenuData;
        }
    }
}

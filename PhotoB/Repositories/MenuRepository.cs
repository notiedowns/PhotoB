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
        private static MenuItemVm[] AdminMenuData;

        static MenuRepository()
        {
            MenuData = new[]
            {
                new MenuItemVm { DisplayName = "Photo List", Url = "/Shop/ProductStart#/PhotoList/"},
                new MenuItemVm { DisplayName = "Create New Photo", Url = "/Shop/ProductStart#/CreatePhoto"},
                new MenuItemVm { DisplayName = "BS Table", Url = "/Shop/ProductStart#/BSTable"},
                new MenuItemVm { DisplayName = "BS Table Angular", Url = "/Shop/ProductStart#/BSTableAngular"}
            };

            AdminMenuData = new[]
            {
                new MenuItemVm { DisplayName = "Category List", Url = "/Shop/AdminStart#/CategoryList/"}
            };
        }

        public MenuItemVm[] GetMenuList()
        {
            return MenuData;
        }

        public MenuItemVm[] GetAdminMenuList()
        {
            return AdminMenuData;
        }
    }
}

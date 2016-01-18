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
        private readonly CategoryRepository _categoryRepository = new CategoryRepository();

        private static MenuItemVm[] ProductMenuData;
        private static MenuItemVm[] AdminMenuData;

        static MenuRepository()
        {
            //ProductMenuData = new[]
            //{
            //    //new MenuItemVm { DisplayName = "Photo List", Url = "/Shop/ProductStart#/PhotoList/"},
            //    //new MenuItemVm { DisplayName = "Create New Photo", Url = "/Shop/ProductStart#/CreatePhoto"},
            //    //new MenuItemVm { DisplayName = "BS Table", Url = "/Shop/ProductStart#/BSTable"}
            //    //new MenuItemVm { DisplayName = "BS Table Angular", Url = "/Shop/ProductStart#/BSTableAngular"}
            //};

            AdminMenuData = new[]
            {
                new MenuItemVm { DisplayName = "Category List", Url = "/Shop/AdminStart#/CategoryList/"},
                new MenuItemVm { DisplayName = "Photo List", Url = "/Shop/AdminStart#/PhotoList/"},
                new MenuItemVm { DisplayName = "Create New Photo", Url = "/Shop/AdminStart#/CreatePhoto"},
                new MenuItemVm { DisplayName = "BS Table", Url = "/Shop/AdminStart#/BSTable"}
            };
        }

        public MenuItemVm[] GetProductMenuList()
        {
            var categories = _categoryRepository.GetCategoryList();

            return categories.Select(c => new MenuItemVm { DisplayName = c.Name, Url = c.Name }).ToArray();
        }

        public MenuItemVm[] GetAdminMenuList()
        {
            return AdminMenuData;
        }
    }
}

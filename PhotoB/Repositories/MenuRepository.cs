using PhotoB.Models;
using System.Linq;

namespace PhotoB.Repositories
{
    public class MenuRepository
    {
        private readonly CategoryRepository _categoryRepository = new CategoryRepository();

        private static readonly MenuItemVm[] AdminMenuData;

        static MenuRepository()
        {
            AdminMenuData = new[]
            {
                new MenuItemVm { DisplayName = "Category List", Url = "/Shop/AdminStart#/CategoryList/"},
                new MenuItemVm { DisplayName = "Photo List", Url = "/Shop/AdminStart#/PhotoList/"},
                new MenuItemVm { DisplayName = "BS Table", Url = "/Shop/AdminStart#/BSTable"}
            };
        }

        public MenuItemVm[] GetCategoryMenuList()
        {
            var categories = _categoryRepository.GetCategoryList();
            return categories.Select(c => new MenuItemVm { DisplayName = c.Name, Url = c.Name, TargetId = c.Id }).ToArray();
        }

        public MenuItemVm[] GetAdminMenuList()
        {
            return AdminMenuData;
        }
    }
}

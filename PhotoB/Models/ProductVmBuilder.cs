using PhotoB.Models.Authors;
using PhotoB.Models.Menu;
using PhotoB.Models.Products;
using PhotoB.Models.Shop;

namespace PhotoB.Models
{
    public class ShopVmBuilder
    {
        public PhotoVm[] PhotoList()
        {
            var products = new[]
            {
                new PhotoVm { Number = "1", Name = "Product 1", Manufacturer = "Wayne"},
                new PhotoVm { Number = "2", Name = "Product 2", Manufacturer = "Wayne"},
                new PhotoVm { Number = "3", Name = "Product 3", Manufacturer = "Wayne"}
            };

            return products; //ObjectSerializer.SerializeObject(products);
        }


        public MenuItemVm[] Menu()
        {
            var menuItems = new[]
            {
                new MenuItemVm { DisplayName = "Menu1", Url = "Controller1/Action1"},
                new MenuItemVm { DisplayName = "Menu1", Url = "Controller1/Action1"}
            };

            return menuItems;
            }

        //private string GetSerializedAuthorList()
        //{
        //    var authors = new[]
        //    {
        //        new AuthorVm { Number = "1", Name = "Product 1"},
        //        new AuthorVm { Number = "2", Name = "Product 2"},
        //        new AuthorVm { Number = "3", Name = "Product 3"}
        //    };

        //    return ObjectSerializer.SerializeObject(authors);
        //}
    }
}

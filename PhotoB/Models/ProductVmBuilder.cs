using PhotoB.Models.Authors;
using PhotoB.Models.Menu;
using PhotoB.Models.Products;
using PhotoB.Models.Shop;
using System;

namespace PhotoB.Models
{
    public class ShopVmBuilder
    {
        public PhotoVm[] PhotoList()
        {
            var products = new[]
            {
                new PhotoVm { Number = "1", Name = "Product 1", Author = "Wayne", Price = 12.9m, DateListed = DateTime.Now},
                new PhotoVm { Number = "2", Name = "Product 2", Author = "Wayne", Price = 9.955m, DateListed = DateTime.Now.AddDays(-1)},
                new PhotoVm { Number = "3", Name = "Product 3", Author = "Wayne", Price = 1257m, DateListed = DateTime.Now.AddMinutes(-30)}
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

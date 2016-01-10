using PhotoB.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoB.Repositories
{
    public class PhotoRepository
    {
        private static PhotoVm[] PhotoData;

        static PhotoRepository()
        {
            PhotoData = new[]
            {
                new PhotoVm { Number = "1", Name = "Cats", Author = "Wayne", Price = 12.9m, DateListed = DateTime.Now},
                new PhotoVm { Number = "2", Name = "Dogs", Author = "Wayne", Price = 9.955m, DateListed = DateTime.Now.AddMonths(-2).AddDays(-1)},
                new PhotoVm { Number = "3", Name = "Rabbits", Author = "Wayne", Price = 1257m, DateListed = DateTime.Now.AddYears(-3).AddMinutes(-30)}
            };
        }

        public PhotoVm[] GetPhotoList()
        {
            return PhotoData;
        }
    }
}

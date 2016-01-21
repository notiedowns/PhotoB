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
                new PhotoVm { Number = "1", ImageName = "a 004.jpg", CategoryId = 1, Name = "Cats", Author = "Wayne", Price = 12.9m, DateListed = DateTime.Now},
                new PhotoVm { Number = "2", ImageName = "Timmernabben 011.jpg", CategoryId = 2, Name = "Dogs", Author = "Wayne", Price = 9.955m, DateListed = DateTime.Now.AddMonths(-2).AddDays(-1)},
                new PhotoVm { Number = "3", ImageName = "a 040.jpg", CategoryId = 3, Name = "Rabbits", Author = "Wayne", Price = 1257m, DateListed = DateTime.Now.AddYears(-3).AddMinutes(-30)},
                new PhotoVm { Number = "4", ImageName = "aboda 088.jpg", CategoryId = 3, Name = "Snakes", Author = "Wayne", Price = 125m, DateListed = DateTime.Now.AddYears(-2).AddMinutes(-60)},
                new PhotoVm { Number = "5", ImageName = "aboda 098.jpg", CategoryId = 2, Name = "Snails", Author = "Wayne", Price = 5557m, DateListed = DateTime.Now.AddYears(-1).AddMinutes(-30)},
                new PhotoVm { Number = "6", ImageName = "ålem 074.jpg", CategoryId = 1, Name = "Tigers", Author = "Wayne", Price = 12666m, DateListed = DateTime.Now.AddMinutes(-30)},
                new PhotoVm { Number = "7", ImageName = "Öland 374.jpg", CategoryId = 1, Name = "Lions", Author = "Wayne", Price = 987m, DateListed = DateTime.Now.AddYears(-7)}
            };
        }

        public PhotoVm[] GetPhotoList()
        {
            return PhotoData;
        }
    }
}

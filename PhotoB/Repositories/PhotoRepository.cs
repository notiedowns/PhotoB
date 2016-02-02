using PhotoB.Models;
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
        public PhotoVm[] GetPhotoList()
        {
            using (var model = new PhotoBEntities())
            {
                return model.Photos.Select(x =>
                    new PhotoVm
                    {
                        Id = x.Id,
                        CategoryId = x.CategoryId,
                        Name = x.Name,
                        Number = x.Number,
                        ImagePath = x.ImagePath,
                        Price = x.Price,
                        DateListed = x.DateListed,
                        Author = x.Author
                    }
                ).ToArray();
            }
        }
    }
}

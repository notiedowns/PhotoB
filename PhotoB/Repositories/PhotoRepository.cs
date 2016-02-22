using PhotoB.Models;
using System;
using System.Linq;

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
                        CategoryName = x.Category.Name,
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

        public void EditPhoto(PhotoVm photoVm)
        {
            using (var model = new PhotoBEntities())
            {
                var photo = new Photo
                {
                    Name = photoVm.Name,
                    Number = photoVm.Number,
                    CategoryId = photoVm.CategoryId.Value,
                    Price = photoVm.Price.Value,
                    ImagePath = photoVm.ImagePath,
                    DateListed = DateTime.Now,
                    Author = photoVm.Author,
                    LastChangedBy = "System",
                    LastChanged = DateTime.Now
                };

                model.Photos.Add(photo);

                model.SaveChanges();
            }
        }

        public void Updatephoto(PhotoVm photoVm)
        {
            using (var model = new PhotoBEntities())
            {
                var photo = model.Photos.FirstOrDefault(x => x.Id == photoVm.Id);
                if(photo != null)
                {
                    photo.Name = photoVm.Name;
                    photo.Number = photoVm.Number;
                    photo.CategoryId = photoVm.CategoryId.Value;
                    photo.Price = photoVm.Price.Value;
                    photo.ImagePath = photoVm.ImagePath;
                    photo.Author = photoVm.Author;
                    photo.LastChangedBy = "System";
                    photo.LastChanged = DateTime.Now;
                }
                    
                model.SaveChanges();
            }
        }

        public PhotoVm GetPhotoById(int photoId)
        {
            using (var model = new PhotoBEntities())
            {
                var photo = model.Photos.FirstOrDefault(x => x.Id == photoId);
                if (photo != null)
                {
                    return new PhotoVm
                    {
                        Id = photo.Id,
                        Number = photo.Number,
                        Name = photo.Name,
                        CategoryId = photo.CategoryId,
                        CategoryName = photo.Category.Name,
                        ImagePath = photo.ImagePath,
                        Price = photo.Price,
                        Author = photo.Author,
                        DateListed = photo.DateListed,
                        LastChanged = photo.LastChanged,
                        LastChangedBy = photo.LastChangedBy
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        public void DeleteCategory(int photoId)
        {
            using (var model = new PhotoBEntities())
            {
                var photo = model.Photos.FirstOrDefault(x => x.Id == photoId);
                if (photo != null)
                {
                    model.Photos.Remove(photo);
                    model.SaveChanges();
                }
            }
        }
    }
}

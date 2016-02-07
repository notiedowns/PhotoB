using PhotoB.Models;
using PhotoB.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoB.Repositories
{
    public class CategoryRepository
    {
        public CategoryVm[] GetCategoryList()
        {
            using (var model = new PhotoBEntities())
            {
                return model.Categories.Select(x =>
                    new CategoryVm
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        LastChangedBy = x.LastChangedBy,
                        LastChanged = x.LastChanged
                    }).ToArray();
            }
        }

        public void EditCategory(CategoryVm categoryVm)
        {
            using (var model = new PhotoBEntities())
            {
                var category = new Category
                {
                    Name = categoryVm.Name,
                    Description = categoryVm.Description,
                    LastChangedBy = "System",
                    LastChanged = DateTime.Now
                };

                model.Categories.Add(category);

                model.SaveChanges();
            }
        }

        public void UpdateCategory(CategoryVm categoryVm)
        {
            using (var model = new PhotoBEntities())
            {
                var category = model.Categories.FirstOrDefault(x => x.Id == categoryVm.Id);

                if (category != null)
                {
                    category.Name = categoryVm.Name;
                    category.Description = categoryVm.Description;
                    category.LastChangedBy = "System";
                    category.LastChanged = DateTime.Now;
                }

                model.SaveChanges();
            }
        }

        public void DeleteCategory(int categoryId)
        {
            using (var model = new PhotoBEntities())
            {
                var category = model.Categories.FirstOrDefault(x => x.Id == categoryId);

                if (category != null)
                    model.Categories.Remove(category);

                model.SaveChanges();
            }
        }

        public bool CheckCategoryInUse(int categoryId)
        {
            using (var model = new PhotoBEntities())
            {
                return model.Photos.Any(x => x.CategoryId == categoryId);
            }
        }
    }
}

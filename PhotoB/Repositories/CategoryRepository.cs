using PhotoB.Models;
using System;
using System.Linq;

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

        public CategoryVm GetCategoryById(int categoryId)
        {
            using (var model = new PhotoBEntities())
            {
                var category = model.Categories.FirstOrDefault(x => x.Id == categoryId);
                if (category != null)
                {
                    return new CategoryVm
                    {
                        Id = category.Id,
                        Name = category.Name,
                        Description = category.Description,
                        LastChanged = category.LastChanged,
                        LastChangedBy = category.LastChangedBy
                    };
                }
                else
                {
                    return null;
                }
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

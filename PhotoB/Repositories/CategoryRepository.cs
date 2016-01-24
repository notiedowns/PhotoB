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
        private static CategoryVm[] CategoryData;

        static CategoryRepository()
        {
            CategoryData = new[]
            {
                new CategoryVm { Id = 1, Name = "Portrait", Description = "People posing", LastChangedBy = "System", LastChanged = DateTime.Now },
                new CategoryVm { Id = 2, Name = "Landscape", Description = "Wide view natural scenes", LastChangedBy = "System", LastChanged = DateTime.Now },
                new CategoryVm { Id = 3, Name = "Macro", Description = "Close ups", LastChangedBy = "System", LastChanged = DateTime.Now },
            };
        }

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

        public void CreateCategory(CategoryVm categoryVm)
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
    }
}

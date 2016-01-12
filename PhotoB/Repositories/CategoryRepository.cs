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
            return CategoryData;
        }
    }
}

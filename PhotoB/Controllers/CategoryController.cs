using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly CategoryRepository _categoryRepository = new CategoryRepository();

        // GET: Category
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCategories(string query = "")
        {
            var categories = _categoryRepository.GetCategoryList();

            if (!string.IsNullOrWhiteSpace(query))
                categories = categories.Where(x => x.Name.ToLower().Contains(query.ToLower())).ToArray();

            return JsonResult(categories, JsonRequestBehavior.AllowGet);
        }
    }
}
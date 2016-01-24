using PhotoB.Models.Products;
using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
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


        [HttpPost]
        public ActionResult CreateCategory(HttpRequestMessage request, CategoryVm category)
        {
            if (ModelState.IsValid)
            {
                _categoryRepository.CreateCategory(category);

                return new JsonResult();
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return JsonResult(GetErrorMessages(), JsonRequestBehavior.AllowGet);
        }


        private List<KeyValuePair<string, string>> GetErrorMessages()
        {
            var errors = new List<KeyValuePair<string, string>>();

            foreach (var modelProperty in ModelState)
            {
                if (!modelProperty.Value.Errors.Any())
                    continue;

                var errorMessage = new StringBuilder();

                foreach (var error in modelProperty.Value.Errors)
                {
                    if (errorMessage.Length > 0)
                        errorMessage.Append(". ");

                    errorMessage.Append(error.ErrorMessage);
                }

                errors.Add(new KeyValuePair<string, string>(modelProperty.Key, errorMessage.ToString()));
            }

            return errors;
        }
    }
}
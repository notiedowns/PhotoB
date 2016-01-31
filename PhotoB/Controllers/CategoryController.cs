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
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly CategoryRepository _categoryRepository = new CategoryRepository();

        // GET: Category
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCategories(string query = "")
        {
            try
            {
                var categories = _categoryRepository.GetCategoryList();

                if (!string.IsNullOrWhiteSpace(query))
                    categories = categories.Where(x => x.Name.ToLower().Contains(query.ToLower())).ToArray();

                return JsonResult(categories, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving categories", ex);

                Response.StatusCode = 500;
                return Json(new { message = "Error retrieving categories" });
            }
        }


        [HttpPost]
        public ActionResult CreateCategory(HttpRequestMessage request, CategoryVm category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if(category.Id == 0)
                        _categoryRepository.CreateCategory(category);
                    else
                        _categoryRepository.UpdateCategory(category);

                    return new JsonResult();
                }

                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { validationErrors = GetErrorMessages() });
            }
            catch (Exception ex)
            {
                var exceptionMessage = "Error creating category";
                Logger.Error(exceptionMessage, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = exceptionMessage });
            }
        }


        [HttpPost]
        public ActionResult DeleteCategory(HttpRequestMessage request, int categoryId)
        {
            try
            {
                _categoryRepository.DeleteCategory(categoryId);

                return new JsonResult();
            }
            catch (Exception ex)
            {
                Logger.Error("Error deleting category", ex);

                Response.StatusCode = 500;
                return Json(new { message = "Error deleting category" });
            }
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
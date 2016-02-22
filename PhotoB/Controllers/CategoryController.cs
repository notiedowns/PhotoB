using PhotoB.Models;
using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class CategoryController : BaseController
    {
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly CategoryRepository _categoryRepository = new CategoryRepository();


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
                var message = "Error retrieving categories";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }

        public ActionResult GetCategoryById(int? categoryId)
        {
            try
            {
                if(!categoryId.HasValue)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { exceptionMessage = "CategoryId not set" });
                }

                var category = _categoryRepository.GetCategoryById(categoryId.Value);
                
                return JsonResult(category, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var message = "Error retrieving category by id";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }


        [HttpPost]
        public ActionResult EditCategory(HttpRequestMessage request, CategoryVm category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if(category.Id == 0)
                        _categoryRepository.EditCategory(category);
                    else
                        _categoryRepository.UpdateCategory(category);

                    return new JsonResult();
                }

                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { validationErrors = GetErrorMessages() });
            }
            catch (Exception ex)
            {
                var message = "Error creating category";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }


        [HttpPost]
        public ActionResult DeleteCategory(HttpRequestMessage request, int categoryId)
        {
            try
            {
                var categoryInUse = _categoryRepository.CheckCategoryInUse(categoryId);

                if (categoryInUse)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { exceptionMessage = "Cannot delete this category. It is referenced by one or more photos" });
                }
                else
                {
                    _categoryRepository.DeleteCategory(categoryId);
                    return Json(new {});
                }
            }
            catch (Exception ex)
            {
                var message = "Error deleting category";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
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
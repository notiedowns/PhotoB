using PhotoB.Models.Products;
using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class PhotoController : BaseController
    {
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly PhotoRepository _photoRepository = new PhotoRepository();


        public ActionResult PhotoList()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetProductList()
        {
            try
            {
                Logger.Debug("Retrieving product list");

                var photos = _photoRepository.GetPhotoList();

                return Json(photos, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Logger.Error("Error getting product list", ex);
                return Json(new { Result = "ERROR", ex.Message });
            }
        }

        
        public ActionResult GetPhotos(string query, int? categoryId)
        {
            try
            {
                Logger.Debug("Retrieving photo list");

                var photos = _photoRepository.GetPhotoList();

                if (!string.IsNullOrWhiteSpace(query))
                    photos = photos.Where(x => x.Name.ToLower().Contains(query.ToLower())).ToArray();

                if(categoryId.HasValue)
                    photos = photos.Where(x => x.CategoryId == categoryId.Value).ToArray();

                return JsonResult(photos, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var message = "Error retrieving product list";

                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }


        public ActionResult GetPhotoById(int? photoId)
        {
            try
            {
                if (!photoId.HasValue)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { exceptionMessage = "PhotoId not set" });
                }

                var photo = _photoRepository.GetPhotoById(photoId.Value);

                return JsonResult(photo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var message = "Error retrieving photo by id";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }


        public ActionResult GetPhotoPaths()
        {
            try
            {
                Logger.Debug("Retrieving photo path list");

                var photoFolder = new DirectoryInfo(Server.MapPath("/") + "/images");
                var photoPaths = photoFolder.GetFiles().Select(x => x.Name);

                return JsonResult(photoPaths, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var message = "Error retrieving photo path list";

                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }


        [HttpGet]
        public ActionResult EditPhoto()
        {
            return View();
        }


        [HttpPost]
        public ActionResult EditPhoto(HttpRequestMessage request, PhotoVm photo)
        {
            try
            {
                Logger.Debug("Creating photo");

                if (ModelState.IsValid)
                {
                    if (photo.Id == 0)
                        _photoRepository.EditPhoto(photo);
                    else
                        _photoRepository.Updatephoto(photo);

                    return new JsonResult();
                }

                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { validationErrors = GetErrorMessages() });
            }
            catch (Exception ex)
            {
                var exceptionMessage = "Error creating photo";
                Logger.Error(exceptionMessage, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = exceptionMessage });
            }
        }


        [HttpPost]
        public ActionResult DeletePhoto(HttpRequestMessage request, int photoId)
        {
            try
            {
                _photoRepository.DeleteCategory(photoId);

                return Json(new {});
            }
            catch (Exception ex)
            {
                var message = "Error deleting photo";
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
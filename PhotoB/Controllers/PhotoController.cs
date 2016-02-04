﻿using PhotoB.Models.Products;
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
                Logger.Error("Error retrieving product list", ex);

                Response.StatusCode = 500;
                return Json(new { message = "Error retrieving product list" });
            }
        }       


        [HttpGet]
        public ActionResult CreatePhoto()
        {
            return View();
        }


        [HttpPost]
        public ActionResult CreatePhoto(HttpRequestMessage request, PhotoVm photo)
        {
            try
            {
                Logger.Debug("Creating photo");

                if (ModelState.IsValid)
                {
                    if (photo.Id == 0)
                        _photoRepository.CreatePhoto(photo);
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

                return new JsonResult();
            }
            catch (Exception ex)
            {
                Logger.Error("Error deleting photo", ex);

                Response.StatusCode = 500;
                return Json(new { message = "Error deleting photo" });
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
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PhotoB.Models;
using PhotoB.Models.Products;
using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class PhotoController : BaseController
    {
        private static readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly PhotoRepository _photoRepository = new PhotoRepository();
        private readonly MenuRepository _menuRepository = new MenuRepository();


        public ActionResult PhotoList()
        {
            logger.Info("First log");
            return View();
        }


        [HttpGet]
        public JsonResult GetProductList()
        {
            try
            {
                var photos = _photoRepository.GetPhotoList();

                return Json(photos, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //Logger.Error("Error getting product list", ex);
                return Json(new { Result = "ERROR", ex.Message });
            }
        }

        
        public ActionResult GetPhotos(string query)
        {
            var photos = _photoRepository.GetPhotoList();

            if (!string.IsNullOrWhiteSpace(query))
                photos = photos.Where(x => x.Name.ToLower().Contains(query.ToLower())).ToArray();

            return JsonResult(photos, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetMenu()
        {
            return JsonResult(_menuRepository.GetProductMenuList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAdminMenu()
        {
            var data = _menuRepository.GetAdminMenuList();
            return JsonResult(data, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult CreatePhoto()
        {
            return View();
        }


        [HttpPost]
        public ActionResult CreatePhoto(HttpRequestMessage request, PhotoVm photo)
        {
            if (ModelState.IsValid)
            {
                return new JsonResult();
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return JsonResult(GetErrorMessages(), JsonRequestBehavior.AllowGet);
        }


        //public JsonResult EditPhotoBT(int? productId, string productName, bool isActive)
        //{
        //    try
        //    {
        //        var productDto = new ProductDto();

        //        productDto.Name = productName;
        //        productDto.IsActive = isActive;

        //        var validationErrors = ValidationInput(productId, productName);

        //        if (validationErrors.Count > 0)
        //            return Json(new { ValidationErrors = validationErrors });

        //        if (productId != null)
        //        {
        //            productDto.ProductId = productId.Value;
        //            _productRepository.UpdateProduct(productDto, GetCurrentLogonName());
        //        }
        //        else
        //        {
        //            Logger.InfoFormat("Adding product '{0}'", productName);

        //            _productRepository.AddProduct(productDto, GetCurrentLogonName());
        //        }

        //        return Json(new { result = true, JsonRequestBehavior.AllowGet });
        //    }
        //    catch (Exception ex)
        //    {
        //        Logger.Error("Error updating product", ex);
        //        return Json(new { result = false, Properties.Resources.rm_generalUpdateError, productId, JsonRequestBehavior.AllowGet });
        //    }
        //}


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
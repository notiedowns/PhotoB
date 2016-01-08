using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PhotoB.Models;
using PhotoB.Models.Products;
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
        private ShopVmBuilder _shopVmBuilder = new ShopVmBuilder();


        public ActionResult PhotoList()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetProductList()
        {
            try
            {
                var photos = _shopVmBuilder.PhotoList();

                return Json(photos, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //Logger.Error("Error getting product list", ex);
                return Json(new { Result = "ERROR", ex.Message });
            }
        }


        // GET: Product
        public ActionResult GetPhotos(string query)
        {
            var photos = _shopVmBuilder.PhotoList();

            if (!string.IsNullOrWhiteSpace(query))
                photos = photos.Where(x => x.Name.ToLower().Contains(query.ToLower())).ToArray();

            return JsonResult(photos, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetMenu()
        {
            return JsonResult(_shopVmBuilder.Menu(), JsonRequestBehavior.AllowGet);
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
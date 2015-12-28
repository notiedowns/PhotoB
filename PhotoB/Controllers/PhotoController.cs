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


        // GET: Product
        public ActionResult GetPhotos()
        {
            return Json(_shopVmBuilder.PhotoList(), JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetMenu()
        {
            return Json(_shopVmBuilder.Menu(), JsonRequestBehavior.AllowGet);
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

            Response.StatusCode = 400;
            return Json(GetErrorMessages(), JsonRequestBehavior.AllowGet);
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
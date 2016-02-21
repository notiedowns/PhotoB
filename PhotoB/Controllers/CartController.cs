using PhotoB.Models.Products;
using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class CartController : BaseController
    {
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly PhotoRepository _photoRepository = new PhotoRepository();

        private CartVm Cart
        {
            get
            {
                if (Session["Cart"] != null)
                    return (CartVm)Session["Cart"];

                return new CartVm();
            }

            set
            {
                Session["Cart"] = value;
            }
        }


        public ActionResult GetCart()
        {
            try
            {
                Logger.Debug("Retrieving cart");
                var cart = Cart;
                return JsonResult(cart, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var message = "Error retrieving cart";
                Logger.Error(message, ex);
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }


        [HttpPost]
        public ActionResult AddToCart(int photoId)
        {
            try
            {
                var cart = Cart;

                var photo = _photoRepository.GetPhotoById(photoId);
                cart.Photos.Add(photo);

                Cart = cart;

                return Json(new { });
            }
            catch (Exception ex)
            {
                var message = "Error adding photo to cart";
                Logger.Error(message, ex);
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }
    }
}
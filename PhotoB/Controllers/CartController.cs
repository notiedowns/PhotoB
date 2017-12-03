using PhotoB.Models;
using PhotoB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
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

        private CustomerVm Customer
        {
            get
            {
                if (Session["Customer"] != null)
                    return (CustomerVm)Session["Customer"];

                return new CustomerVm();
            }

            set
            {
                Session["Customer"] = value;
            }
        }

        public ActionResult GetCart()
        {
            try
            {
                Logger.Debug("Retrieving cart");
                var cart = Cart;

                var cartSummary = cart.Photos.GroupBy(x => x.Id)
                                    .Select(p => new PhotoSummaryVm
                                    {
                                        Id = p.Key,
                                        Number = p.First().Number,
                                        Name = p.First().Name,
                                        ImagePath = p.First().ImagePath,
                                        Price = p.First().Price.Value,
                                        Quantity = p.Count(),
                                        TotalPrice = p.Sum(s => s.Price.Value)
                                    }).ToList();


                return Json(new { cart = cart, cartSummary = cartSummary }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var message = "Error retrieving cart";
                Logger.Error(message, ex);
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }

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

        public ActionResult RemoveFromCart(int photoId)
        {
            try
            {
                var cart = Cart;

                cart.Photos.RemoveAll(x => x.Id == photoId);

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

        public ActionResult SaveDeliveryAddress(CustomerVm customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Customer = customer;
                    return new JsonResult();
                }

                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { validationErrors = GetErrorMessages() });
            }
            catch (Exception ex)
            {
                var exceptionMessage = "Error saving delivery address";
                Logger.Error(exceptionMessage, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage });
            }
        }

        public ActionResult SavePaymentMethod(string paymentMethod)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(paymentMethod))
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    var validationErrors = new List<KeyValuePair<string, string>>();
                    validationErrors.Add(new KeyValuePair<string, string>("PaymentMethod", "Payment Method is mandatory"));
                    return Json(new { validationErrors });
                }

                var customer = Customer;
                customer.PaymentMethod = paymentMethod;
                Customer = customer;

                return new JsonResult();
            }
            catch (Exception ex)
            {
                var exceptionMessage = "Error saving payment method";
                Logger.Error(exceptionMessage, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage });
            }
        }

        public ActionResult GetDeliveryAddress()
        {
            try
            {
                var customer = Customer;
                return Json(customer, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var exceptionMessage = "Error retreiving delivery address";
                Logger.Error(exceptionMessage, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage });
            }
        }

        public ActionResult GetPaymentMethod()
        {
            try
            {
                var customer = Customer;
                return Json(customer.PaymentMethod, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var exceptionMessage = "Error retreiving payment method";
                Logger.Error(exceptionMessage, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage });
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
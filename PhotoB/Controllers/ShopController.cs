﻿using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class ShopController : Controller
    {
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ActionResult ProductStart()
        {
            return View();
        }

        public ActionResult AdminStart()
        {
            return View();
        }

        public ActionResult Checkout()
        {
            return View();
        }
    }
}
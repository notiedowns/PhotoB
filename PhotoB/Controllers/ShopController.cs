using PhotoB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class ShopController : Controller
    {
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ActionResult ProductStart()
        {
            Logger.Debug("Products started");
            return View();
        }

        public ActionResult AdminStart()
        {
            Logger.Debug("Admin started");
            return View();
        }
    }
}
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
        public ActionResult ProductStart()
        {
            return View();
        }

        public ActionResult AdminStart()
        {
            return View();
        }
    }
}
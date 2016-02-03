using PhotoB.Models.Products;
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
    public class MenuController : BaseController
    {
        private static readonly log4net.ILog Logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly MenuRepository _menuRepository = new MenuRepository();
               

        public ActionResult GetCategoryMenu()
        {
            try
            {
                Logger.Debug("Retrieving category menu");

                return JsonResult(_menuRepository.GetCategoryMenuList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving category menu", ex);

                Response.StatusCode = 500;
                return Json(new { message = "Error retrieving category menu" });
            }
        }


        public ActionResult GetAdminMenu()
        {
            try
            {
                Logger.Debug("Retrieving admin menu");

                var data = _menuRepository.GetAdminMenuList();

                return JsonResult(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving admin menu", ex);

                Response.StatusCode = 500;
                return Json(new { message = "Error retrieving admin menu" });
            }
        }       
    }
}
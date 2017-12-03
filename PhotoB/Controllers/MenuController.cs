using PhotoB.Repositories;
using System;
using System.Net;
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
                var message = "Error retrieving category menu";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
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
                var message = "Error retrieving admin menu";
                Logger.Error(message, ex);

                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { exceptionMessage = message });
            }
        }
    }
}
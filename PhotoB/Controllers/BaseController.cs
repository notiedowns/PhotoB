using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net;
using System.Web.Mvc;

namespace PhotoB.Controllers
{
    public class BaseController : Controller
    {
        protected ActionResult JsonResult(object data, JsonRequestBehavior behaviour = JsonRequestBehavior.DenyGet)
        {
            var jsonSerializerSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };

            if(Request.RequestType == WebRequestMethods.Http.Get && behaviour == JsonRequestBehavior.DenyGet)
                throw new InvalidOperationException("GET in not permitted for this request");

            return new ContentResult
            {
                    Content = JsonConvert.SerializeObject(data, jsonSerializerSettings),
                    ContentType = "application/json"
            };
        }
    }
}
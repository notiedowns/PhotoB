﻿using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Web;

namespace PhotoB.Models
{
    public static class ObjectSerializer
    {
        public static string SerializeObject(object value)
        {
            using (var stringWriter = new StringWriter())
            using (var jsonWriter = new JsonTextWriter(stringWriter))
            {
                var serializer = new JsonSerializer
                {
                    // Let's use camelCasing as is common practice in JavaScript
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };

                // We don't want quotes around object names
                jsonWriter.QuoteName = false;
                serializer.Serialize(jsonWriter, value);

                return new HtmlString(stringWriter.ToString()).ToString();
            }
        }
    }
}

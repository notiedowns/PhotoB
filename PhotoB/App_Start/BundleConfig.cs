﻿using System.Web.Optimization;

namespace PhotoB
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-table").Include(
                      "~/Scripts/Bootstrap-table/bootstrap-table.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootbox").Include(
                      "~/Scripts/bootbox.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/css/site.css",
                      "~/Content/bootstrap-sandstone.css",
                      "~/Scripts/Bootstrap-table/bootstrap-table.css"));

            bundles.Add(new StyleBundle("~/Scripts/Bootstrap-table").Include(
                      "~/Scripts/Bootstrap-table/bootstrap-table.css"));
        }
    }
}

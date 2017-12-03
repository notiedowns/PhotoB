$(document).ready(function () {

    'use strict';

    $('.styleMenuItem').click(function () {
        var styleName = $(this).attr('data-styleName');
        setStyle(styleName);
        setCookie("photob-style-name", styleName, 5);
    });


    function setStyle(styleName) {
        var stylePath = "/Content/bootstrap" + styleName + ".css";
        $('link[href*="bootstrap"]').attr('href', stylePath);
    };


    var styleNameCookieValue = getCookie("photob-style-name");
    setStyle(styleNameCookieValue);


    function setCookie(cname, cvalue, exdays) {
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = cname + "=" + cvalue + "; path=/" + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

});
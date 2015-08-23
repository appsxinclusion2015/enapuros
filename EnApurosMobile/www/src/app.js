/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs */
/*cordova:false, device:false */

requirejs([], function() {
    "use strict";

    function hideSplashScreen() {
        if (navigator.splashscreen && navigator.splashscreen.hide) {
            navigator.splashscreen.hide();
        }

        if (window.intel && intel.xdk && intel.xdk.device) {
            if (intel.xdk.device.hideSplashScreen) {
                intel.xdk.device.hideSplashScreen();
            }
        }
    }

    function initEvents() {
        $("#btnTest").on("click", function () {
            alert("Hi!");
        });

        hideSplashScreen();
    }

    initEvents();
});

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs */
/*cordova:false, device:false */

app.LOG = app.LOG || false;

requirejs([], function() {
    "use strict";

    function hideSplashScreen() {
        // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
        // Do the following if you disabled App Framework autolaunch (in index.html, for example)
        // $.ui.launch() ;

        if (navigator.splashscreen && navigator.splashscreen.hide) { // Cordova API detected
            navigator.splashscreen.hide();
        }

        if (window.intel && intel.xdk && intel.xdk.device) {
            if (intel.xdk.device.hideSplashScreen) {
                intel.xdk.device.hideSplashScreen();
            }
        }
    }

    function initEvents() {
        var el, evt;

        if (navigator.msPointerEnabled || !('ontouchend' in window)) {
            evt = "click";
        } else {
            evt = "touchend";
        }

        hideSplashScreen();
    }

    document.addEventListener("app.Ready", app.initEvents, false);
});

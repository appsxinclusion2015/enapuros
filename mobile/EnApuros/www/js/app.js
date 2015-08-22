/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */

window.app = window.app || {}; // there should only be one of these...

app.LOG = app.LOG || false;

app.consoleLog = function () {
    if (app.LOG) {
        var args = Array.prototype.slice.call(arguments, 0);
        console.log.apply(console, args);
    }
};

app.initEvents = function () {
    "use strict";
    var fName = "app.initEvents():";
    app.consoleLog(fName, "entry");

    var el, evt;

    if (navigator.msPointerEnabled || !('ontouchend' in window)) {
        evt = "click";
    } else {
        evt = "touchend";
    }

    app.hideSplashScreen(); // after init is good time to remove splash screen; using a splash screen is optional

    app.consoleLog(fName, "exit");
};

// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function () {
    "use strict";
    var fName = "app.hideSplashScreen():";
    app.consoleLog(fName, "entry");

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

    app.consoleLog(fName, "exit");
};

document.addEventListener("app.Ready", app.initEvents, false);

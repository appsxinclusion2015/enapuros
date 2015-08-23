/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs */
/*cordova:false, device:false */

requirejs(["./notifications"], function(Notification) {
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
        $("#btnEmail").on("click", function () {
            Notification.sendEmail();
        });
        
        $("#btnSMS").on("click", function () {
            Notification.sendSMS();
        });
        
        $("#btnAudio").on("click", function () {
            Notification.openAudio();
        });
        
        $("#btnCall").on("click", function () {
            Notification.call();
        });

        hideSplashScreen();
    }

    initEvents();
});

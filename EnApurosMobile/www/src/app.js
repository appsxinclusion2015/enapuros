/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs */
/*cordova:false, device:false */

requirejs([
    "./models/models",
    "./views/controller",
    "./notifications"
], function(Models, Controller, Notification) {

    "use strict";

    var controller = new Controller(Models);

    controller.initialize();

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
    }

    initEvents();
});

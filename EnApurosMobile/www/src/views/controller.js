/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs, define, sms */
/*cordova:false, device:false */

define([
    "./view"
], function (MainView) {

    /**
     * @constructor
     */
    function Controller(models) {
        this._models = models;
        this._view = new MainView(this);

        this._selection = {};
    }

    Controller.prototype.initialize = function () {
        console.log("initialize");
        var status = this._models.getStatus();

        this._view.initialize(status);
    };

    Controller.prototype.hideSplashScreen = function () {
        if (navigator.splashscreen && navigator.splashscreen.hide) {
            navigator.splashscreen.hide();
        }

        if (window.intel && intel.xdk && intel.xdk.device) {
            if (intel.xdk.device.hideSplashScreen) {
                intel.xdk.device.hideSplashScreen();
            }
        }
    };

    Controller.prototype.statusSelected = function (statusId) {
        console.log("statusSelected", statusId);

        this._selection.status = statusId;

        this._view.showLocation(this._models.getLocations());
    };

    Controller.prototype.locationSelected = function (locationId) {
        console.log("locationSelected", locationId);

        this._selection.location = locationId;

        var status = this._models.getStatusById(this._selection.status),
            type = (status) ? status.type : this._models.StatusCategory.POSITIVE,
            scenarios = this._models.getScenariosByStatus(this._selection.status);

        this._view.showScenarios(scenarios);
    };

    Controller.prototype.scenarioSelected = function (scenarioId) {
        console.log("scenarioSelected", scenarioId);

        this._selection.scenario = scenarioId;

        this._view.showContacts(this._models.getContacts());
    };

    Controller.prototype.contactSelected = function (contactId) {
        console.log("contactSelected", contactId);

        this._selection.contact = contactId;

        this._view.showNotifications();
    };

    Controller.prototype.notificationSelected = function (action) {
        switch (action) {
            case "email":
                // TODO complete
                break;
            case "location":
                // TODO navigator.geolocation.getCurrentPosition(onSuccess, onError);
                break;
            case "sms":
                var text = "[EnApuros] Mamá: estoy en el colegio, me lastimé.\n";

                function sendSms(message) {
                    var options = {
                        replaceLineBreaks: false,
                        android: {
                            intent: 'INTENT'
                        }
                    };

                    // TODO add phone number for demo
                    sms.send("+123", message, options, function () {
                        console.log('Message sent successfully');
                    }, function (error) {
                        console.log('Message failed', error);
                    });
                }

                sendSms(text);

                break;
            case "call":
                var number = "+123"; // TODO add phone number for demo

                navigator.callphone.call(function () {}, function (error) {
                    console.log(error.call);
                }, number);

                break;
        }
    };

    return Controller;
});

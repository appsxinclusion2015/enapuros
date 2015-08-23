/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs, define */
/*cordova:false, device:false */

define([
    "./view",
    "../notifications"
], function (MainView, Notification) {

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
    };

    Controller.prototype.contactActionSelected = function (action) {
        switch (action) {
            case "email":
                Notification.sendEmail();
                break;
            case "sms":
                Notification.sendSMS();
                break;
            case "call":
                Notification.call();
                break;
        }

        // Notification.openAudio();
    };

    return Controller;
});

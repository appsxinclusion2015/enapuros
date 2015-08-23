/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs, define */
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
    
    var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
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
                break;
                case "location":
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
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

                    var success = function () { console.log('Message sent successfully'); };
                    var error = function (e) { console.log('Message Failed:' + e); };

                    sms.send("+5493513715088", message, options, success, error);
                }

                sendSms(text);

                break;
            case "call":
                var number = "+5493513715088";

                navigator.callphone.call(function () {}, function (error) {
                    console.log(error.call);
                }, number);

                break;
        }

        // Notification.openAudio();
    };

    return Controller;
});

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
        this._view.initialize();
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
    
    Controller.prototype.navigateHome = function () {
        this._view.showStatus(this._models.getStatus());
    };
    
    Controller.prototype.navigateToUnlockSettings = function () {
        
        this._view.showUnlockSettings();
    };
    
    Controller.prototype.verifySettingsPassword = function (password) {
        console.log("password", password);
        var currentPwd = localStorage.getItem("password");
        if(currentPwd == password){
            this._view.showMainSettings();
        }
        else{
            alert("Invalid Pwd");
        }
    };
    
    Controller.prototype.updatePassword = function (currentPassword, newPassword, confirmedNewPassword) {
        var currentStoredPwd = localStorage.getItem("password");
        if(currentStoredPwd == currentPassword){
            this.passwordsMatch(newPassword, confirmedNewPassword);
        }
        else{
            alert("La contraseña actual es incorrecta");
        }
    };
    
    Controller.prototype.newPassword = function (newPassword, confirmedNewPassword) {
        this.passwordsMatch(newPassword, confirmedNewPassword);
    };
    
    
    Controller.prototype.passwordsMatch = function(newPwd, confirmedNewPwd){
        if(newPwd!== "" && newPwd === confirmedNewPwd){
            localStorage.setItem("password", newPwd);
            this._view.showUnlockSettings();
        }
        else{
            alert("La nueva contraseña no corresponde con la confirmacion");
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
    
    Controller.prototype.contactToUpdateSelected = function (contactId) {
        var contact = this._models.getContactById(contactId);
        this._view.showUpdateContact(contact);
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
    
    Controller.prototype.goToUpdateContactsSelected = function () {
        this._view.showUpdateContacts(this._models.getContacts());
    };
    
    Controller.prototype.goToUpdateLocationsSelected = function () {
        this._view.showUpdateLocations(this._models.getLocations());
    };
    
    Controller.prototype.goToUpdateScenariosSelected = function () {
        this._view.showUpdateLocations(this._models.getScenarios());
    };
    
    Controller.prototype.updateContactSelected = function (contactId) {
        this._view.showMainSettings();
    };
    
    return Controller;
});

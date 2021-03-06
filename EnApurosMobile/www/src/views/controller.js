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
        var currentPwd = localStorage.getItem("password");
        if (currentPwd === password) {
            this._view.showMainSettings();
        } else {
            alert("La contraseña ingresada es incorrecta");
        }
    };
    
    Controller.prototype.updatePassword = function (currentPassword, newPassword, confirmedNewPassword) {
        var currentStoredPwd = localStorage.getItem("password");
        if (currentStoredPwd === currentPassword) {
            this.passwordsMatch(newPassword, confirmedNewPassword);
        } else {
            alert("La contraseña actual es incorrecta");
        }
    };
    
    Controller.prototype.newPassword = function (newPassword, confirmedNewPassword) {
        this.passwordsMatch(newPassword, confirmedNewPassword);
    };
    
    Controller.prototype.passwordsMatch = function(newPwd, confirmedNewPwd){
        if (newPwd !== "" && newPwd === confirmedNewPwd) {
            localStorage.setItem("password", newPwd);
            this._view.showUnlockSettings();
        }
        else{
            alert("La nueva contraseña no corresponde con la confirmacion");
        }
    };

    Controller.prototype.statusSelected = function (statusId) {
        this._selection.status = statusId;

        this._view.showLocation(this._models.getLocations());
    };

    Controller.prototype.locationSelected = function (locationId) {
        this._selection.location = locationId;

        var status = this._models.getStatusById(this._selection.status),
            type = (status) ? status.type : this._models.StatusCategory.POSITIVE,
            scenarios = this._models.getScenariosByStatus(this._selection.status);

        this._view.showScenarios(scenarios);
    };

    Controller.prototype.scenarioSelected = function (scenarioId) {
        this._selection.scenario = scenarioId;

        this._view.showContacts(this._models.getContacts());
    };

    Controller.prototype.contactSelected = function (contactId) {
        this._selection.contact = contactId;

        this._view.showNotifications();
    };
    
    Controller.prototype.contactToUpdateSelected = function (contactId) {
        var contact = this._models.getContactById(contactId);
        this._view.showUpdateContact(contact);
    };
    
    Controller.prototype.scenarioToUpdateSelected = function (scenarioId) {
        var scenario = this._models.getScenarioById(scenarioId);
        this._view.showUpdateScenario(scenario);
    };
    
    Controller.prototype.locationToUpdateSelected = function (locationId) {
        var location = this._models.getLocationById(locationId);
        this._view.showUpdateLocation(location);
    };

    Controller.prototype.notificationSelected = function (action) {
        var contact = this._models.getContactById(this._selection.contact);

        switch (action) {
            case "email":
                // TODO complete
                break;
            case "location":
                // TODO navigator.geolocation.getCurrentPosition(onSuccess, onError);
                break;
            case "sms":                
                var text = "[EnApuros]: " + contact.name + 
                            " estoy en " + this._models.getLocationById(this._selection.location).name + " " + 
                            this._models.getScenarioById(this._selection.scenario).name + "\n";
                    
                function sendSms(number, message) {
                    var options = {
                        replaceLineBreaks: false,
                        android: {
                            intent: 'INTENT'
                        }
                    };

                    // TODO add phone number for demo
                    sms.send(number, message, options, function () {
                        console.log('Message sent successfully');
                    }, function (error) {
                        console.log('Message failed', error);
                    });
                }

                sendSms(contact.phone, text);

                break;
            case "call":
                navigator.callphone.call(function () {}, function (error) {
                    console.log(error.call);
                }, contact.phone);

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
        this._view.showUpdateScenarios(this._models.getScenarios());
    };
    
    Controller.prototype.updateContactSelected = function (contactId, contactName, contactEmail, contactPhone, contactImg) {
        this._models.updateContact(contactId, contactName, contactPhone, contactEmail, contactImg);
        this._view.showUpdateContacts(this._models.getContacts());
    };
    
     Controller.prototype.updateScenarioSelected = function (scenarioId, scenarioName, scenarioStatusType, scenarioImg) {
        this._models.updateScenario(scenarioId, scenarioName, scenarioStatusType, scenarioImg);
        this._view.showUpdateScenarios(this._models.getScenarios());
    };
    
    Controller.prototype.updateLocationSelected = function (locationId, locationName, locationImg) {
        this._models.updateLocation(locationId, locationName, locationImg);
        this._view.showUpdateLocations(this._models.getLocations());
    };
    
    return Controller;
});

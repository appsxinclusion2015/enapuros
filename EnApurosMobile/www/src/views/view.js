/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs, define */
/*cordova:false, device:false */

define(function () {

    /**
     * @constructor
     */
    function MainView(controller) {
        this._controller = controller;
        this._$splashPage = null;
        this._$unlockSettingsPage = null;
        this._$updatePwdPage = null;
        this._$newPwdPage = null;
        this._$statusPage = null;
        this._$locationsPage = null;
        this._$scenariosPage = null;
        this._$contactsPage = null;
        this._$notificationsPage = null;
        this._$settingsMainPage = null;
        
        this._$updateContactsPage = null;
        this._$updateLocationsPage = null;
        this._$updateScenariosPage = null;
        
        this._$contactName = null;
        this._$contactId = null;
        this._$contactEmail = null;
        this._$contactPhone = null;
        this._$contactImg = null;
        this._$btnChangeContactImg = null;
        
        this._$locationId = null;
        this._$locationName = null;
        this._$locationImg = null;
        this._$btnChangeLocationImg = null;
        
        this._$scenarioId = null;
        this._$scenarioName = null;
        this._$scenarioStatusType = null;
        this._$scenarioImg = null;
        this._$btnChangeScenarioImg = null;
        
        
        this._$btnGoToHome = null;
        this._$btnGear = null;
        this._$btnUnlock = null;
        this._$btnUpdatePwd = null;
        this._$btnNewPwd = null;
        
        this._$btnGoToUpdateContacts = null;
        this._$btnGoToUpdateLocations = null;
        this._$btnGoToUpdateScenarios = null;
        this._$btnGoToUpdatePassword = null;
        
        this._$btnUpdateContact = null;
        this._$btnUpdateLocation = null;
        this._$btnUpdateScenario = null;
        
        this._$statusList = null;
        this._$locationsList = null;
        this._$scenariosList = null;
        this._$contactsList = null;
        
        this._$contactsToUpdateList = null;
        this._$scenariosToUpdateList = null;
        this._$locationsToUpdateList = null;
        
        this._$imgToUpdate = null;
    }

    MainView.prototype.initialize = function () {
        this._$splashPage = $("#splash-page");
        this._$unlockSettingsPage= $("#unlock-settings-page");
        this._$updatePwdPage= $("#update-settings-pwd-page");
        this._$newPwdPage= $("#new-settings-pwd-page");
        this._$statusPage = $("#status-page");
        this._$locationsPage = $("#location-page");
        this._$scenariosPage = $("#scenarios-page");
        this._$contactsPage = $("#contacts-page");
        this._$notificationsPage = $("#notification-page");
        this._$settingsMainPage = $("#settings-main-page");
        
        this._$updateContactsPage = $("#update-contacts-page");
        this._$updateContactPage = $("#update-contact-page");
        this._$updateLocationsPage = $("#update-locations-page");
        this._$updateLocationPage = $("#update-location-page");
        this._$updateScenariosPage = $("#update-scenarios-page");
        this._$updateScenarioPage = $("#update-scenario-page");

        this._$btnGoToHome = this._$splashPage.find("#btn-init");
        this._$btnGear = this._$splashPage.find("#btn-settings");
        
        this._$btnUnlock = this._$unlockSettingsPage.find("#btn-unlock");

        this._$btnUpdatePwd = this._$updatePwdPage.find("#btn-update-pwd");
        this._$btnNewPwd = this._$newPwdPage.find("#btn-new-pwd");
        
        this._$btnGoToUpdateContacts =  this._$settingsMainPage.find("#go-to-edit-contacts");
        this._$btnGoToUpdateLocations = this._$settingsMainPage.find("#go-to-edit-locations");
        this._$btnGoToUpdateScenarios = this._$settingsMainPage.find("#go-to-edit-scenarios");
        this._$btnGoToUpdatePassword = this._$settingsMainPage.find("#go-to-edit-contrasena");
        
        this._$btnUpdateContact = this._$updateContactPage.find("#btn-update-contact");
        this._$btnUpdateLocation = this._$updateLocationPage.find("#btn-update-location");
        this._$btnUpdateScenario = this._$updateScenarioPage.find("#btn-update-scenario");

        this._$statusList = this._$statusPage.find("#status-list");
        this._$locationsList = this._$locationsPage.find("#locations-list");
        this._$scenariosList = this._$scenariosPage.find("#scenarios-list");
        this._$contactsList = this._$contactsPage.find("#contacts-list");

        this._$contactsToUpdateList = this._$updateContactsPage.find("#contacts-to-update-list");
        this._$scenariosToUpdateList = this._$updateScenariosPage.find("#scenarios-to-update-list");
        this._$locationsToUpdateList = this._$updateLocationsPage.find("#locations-to-update-list");
        
        this._$contactId = this._$updateContactPage.find("#contact-id");
        this._$contactName = this._$updateContactPage.find("#contact-name");
        this._$contactEmail = this._$updateContactPage.find("#contact-email");
        this._$contactPhone = this._$updateContactPage.find("#contact-phone");
        this._$contactImg = this._$updateContactPage.find("#contact-img");
        this._$btnChangeContactImg = this._$updateContactPage.find("#change-contact-img");
        this._$btnUpdateContact.on("tap", this._onUpdateContact.bind(this));
        
        this._$locationId = this._$updateLocationPage.find("#location-id");
        this._$locationName = this._$updateLocationPage.find("#location-name");
        this._$locationImg = this._$updateLocationPage.find("#location-img");
        this._$btnChangeLocationImg = this._$updateLocationPage.find("#change-location-img");
        this._$btnUpdateLocation.on("tap", this._onUpdateLocation.bind(this));
        
        this._$scenarioId = this._$updateScenarioPage.find("#scenario-id");
        this._$scenarioName = this._$updateScenarioPage.find("#scenario-name");
        this._$scenarioImg = this._$updateScenarioPage.find("#scenario-img");
        this._$scenarioStatusType = this._$updateScenarioPage.find("#scenario-status-type");
        this._$btnChangeScenarioImg = this._$updateScenarioPage.find("#change-scenario-img");
        this._$btnUpdateScenario.on("tap", this._onUpdateScenario.bind(this));
        
        
        this._$btnGoToHome.on("tap", this._onNavigateToHome.bind(this));
        this._$btnGear.on("tap", this._onNavigateToUnlockSettings.bind(this));
        this._$btnUnlock.on("tap", this._onSettingsPasswordProvided.bind(this));
        this._$btnUpdatePwd.on("tap", this._onSettingsPasswordUpdated.bind(this));
        this._$btnNewPwd.on("tap", this._onSettingsPasswordCreated.bind(this));
        
        
        this._$btnGoToUpdateContacts.on("tap", this._onGoToUpdateContacts.bind(this));
        this._$btnGoToUpdateLocations.on("tap", this._onGoToUpdateLocations.bind(this));
        this._$btnGoToUpdateScenarios.on("tap", this._onGoToUpdateScenarios.bind(this));
        this._$btnGoToUpdatePassword.on("tap", this._onGoToUpdatePassword.bind(this));
        
        this._$btnChangeContactImg.on("tap", this._onChangeContactImage.bind(this));
        this._$btnChangeLocationImg.on("tap", this._onChangeLocationImage.bind(this));
        this._$btnChangeScenarioImg.on("tap", this._onChangeScenarioImage.bind(this));
        
        this._$statusList.on("tap", "[data-status]", this._onStatusSelected.bind(this));
        this._$locationsList.on("tap", "[data-location]", this._onLocationSelected.bind(this));
        this._$scenariosList.on("tap", "[data-scenario]", this._onScenarioSelected.bind(this));
        this._$contactsList.on("tap", "[data-contact]", this._onContactSelected.bind(this));

        this._$contactsToUpdateList.on("tap", "[data-contact]", this._onContactToUpdateSelected.bind(this));
        this._$locationsToUpdateList.on("tap", "[data-location]", this._onLocationToUpdateSelected.bind(this));
        this._$scenariosToUpdateList.on("tap", "[data-scenario]", this._onScenarioToUpdateSelected.bind(this));
        
        this._$notificationsPage.on("tap", "[data-notification-action]", this._onNotificationSelected.bind(this));
        
        $.mobile.toolbar.prototype.options.backBtnText = "VOLVER";
        
    };

    MainView.prototype.showSplash = function () {
        $.mobile.changePage(this._$splashPage);
    };
    
    MainView.prototype.showUnlockSettings = function () {
        this._$unlockSettingsPage.find("#password").val("");
        $.mobile.changePage(this._$unlockSettingsPage);
    };
    
    MainView.prototype.showUpdatePassword = function () {
        $.mobile.changePage(this._$updatePwdPage);
    };
    
    MainView.prototype.showNewPassword = function () {
        $.mobile.changePage(this._$newPwdPage);
    };
    
    MainView.prototype.showSettings = function () {
        //TODO: Go to settings page
        $.mobile.changePage(this._$splashPage);
    };
    
    MainView.prototype.showStatus = function (status) {
        $.mobile.changePage(this._$statusPage);
        
        this._renderOptions(status, "status", this._$statusList);
    };

    MainView.prototype.showLocation = function (locations) {
        $.mobile.changePage(this._$locationsPage);

        this._renderOptions(locations, "location", this._$locationsList);
    };

    MainView.prototype.showScenarios = function (scenarios) {
        $.mobile.changePage(this._$scenariosPage);

        this._renderOptions(scenarios, "scenario", this._$scenariosList);
    };

    MainView.prototype.showContacts = function (contacts) {
        $.mobile.changePage(this._$contactsPage);

        this._renderOptions(contacts, "contact", this._$contactsList);
    };

    MainView.prototype.showNotifications = function () {
        $.mobile.changePage(this._$notificationsPage);
    };
    
     MainView.prototype.showMainSettings = function () {
        $.mobile.changePage(this._$settingsMainPage);
    };
    
    MainView.prototype.showUpdateContacts = function (contacts) {
        $.mobile.changePage(this._$updateContactsPage);
        this._renderOptions(contacts, "contact", this._$contactsToUpdateList);
    };
    
     MainView.prototype.showUpdateLocations = function (locations) {
        $.mobile.changePage(this._$updateLocationsPage);
        this._renderOptions(locations, "location", this._$locationsToUpdateList);
    };
    
    MainView.prototype.showUpdateScenarios = function (scenarios) {
        $.mobile.changePage(this._$updateScenariosPage);
        this._renderOptions(scenarios, "scenario", this._$scenariosToUpdateList);
    };
    
    MainView.prototype.showUpdateContact = function (contact) {
        $.mobile.changePage(this._$updateContactPage);
        this._$contactId.val(contact.id);
        this._$contactName.val(contact.name);
        this._$contactEmail.val(contact.email);
        this._$contactPhone.val(contact.phone);
        this._$contactImg.attr('src', contact.image);
        
    };
    
    MainView.prototype.showUpdateLocation = function (location) {
        $.mobile.changePage(this._$updateLocationPage);
        this._$locationId.val(location.id);
        this._$locationName.val(location.name);
        this._$locationImg.attr('src', location.image);
    };
    
    MainView.prototype.showUpdateScenario = function (scenario) {
        $.mobile.changePage(this._$updateScenarioPage);
        this._$scenarioId.val(scenario.id);
        this._$scenarioName.val(scenario.name);
        this._$scenarioStatusType.val(scenario.statusType).selectmenu('refresh');
        this._$scenarioImg.attr('src', scenario.image);
    };
    
    
    MainView.prototype.needToSetupSettingsPwd = function(){
        return (localStorage.getItem("password") === null);
    };
    
    /**
     * @private
     */
    MainView.prototype._renderOptions = function (options, dataKey, $list) {
        var i,
            item,
            $wrapper,
            $image,
            $text,
            count = options.length;

        $list.empty();

        for (i = 0; i < count; i++) {
            item = options[i];
            $wrapper = $("<div data-" + dataKey + "='" + item.id + "' class='list-option'></div>");
            $image = $("<img src='" + item.image + "' draggable='false'></img>");
            $text = $("<h3>" + item.name + "</h3>");

            $wrapper.append($image);
            $wrapper.append($text);
            $list.append($wrapper);
        }
    };
    
    /**
     * @private
     */
    MainView.prototype._renderUpdateList = function(options, dataKey, $list){
        var i,
            item,
            $wrapper,
            $imageDiv,
            $image,
            $dataDiv,
            $data,
            $text,
            count = options.length;

        $list.empty();
        for (i = 0; i < count; i++) {
            item = options[i];
            $wrapper = $("<div data-" + dataKey + "='" + item.id + "' class='list-option'></div>");
            //Img section
            $imageDiv = $("<div style='width: 20%; float:left'></div>");
            $image = $("<img src='" + item.image + "' draggable='false' style='height: 100%; width: 100%; object-fit: contain'></img>");
            $imageDiv.append($image);
            
            //Data section
            $dataDiv = $("<div style='width: 80%;float:right'></div>");
            $data = $("<label for='item-name'>Nombre: </label><span><input type='text' name='name' id='item-name' value="+item.name+"></span>");
            $dataDiv.append($data);
            $wrapper.append($imageDiv);
            $wrapper.append($dataDiv);
            $list.append($wrapper);
        }
    };
    
    /**
     * @private
     */
    MainView.prototype._onNavigateToHome = function () {
        this._controller.navigateHome();
    };
    
    /**
     * @private
     */
    MainView.prototype._onNavigateToUnlockSettings = function () {
        if(this.needToSetupSettingsPwd()){
            this.showNewPassword();
        }else{
            this._$unlockSettingsPage.find("#password").val("");
            this._controller.navigateToUnlockSettings();
        }
    };
    
    /**
     * @private
     */
    MainView.prototype._onSettingsPasswordProvided = function (event) {
        this._controller.verifySettingsPassword(this._$unlockSettingsPage.find("#password").val());
    };
    
    /**
     * @private
     */
    MainView.prototype._onSettingsPasswordUpdated = function (event) {
        this._controller.updatePassword(this._$updatePwdPage.find("#current-password").val(), 
                                       this._$updatePwdPage.find("#new-password").val(),
                                       this._$updatePwdPage.find("#confirmed-new-password").val());
    };
    
     /**
     * @private
     */
    MainView.prototype._onSettingsPasswordCreated = function (event) {
        this._controller.newPassword(this._$newPwdPage.find("#new-password").val(),
                                     this._$newPwdPage.find("#confirmed-new-password").val());
    };

    /**
     * @private
     */
    MainView.prototype._onStatusSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("status");

        this._controller.statusSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onLocationSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("location");

        this._controller.locationSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onScenarioSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("scenario");

        this._controller.scenarioSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onContactSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("contact");

        this._controller.contactSelected(key);
    };
    
    /**
     * @private
     */
    MainView.prototype._onContactToUpdateSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("contact");
        this._controller.contactToUpdateSelected(key);
    };
    
    /**
     * @private
     */
    MainView.prototype._onLocationToUpdateSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("location");
        this._controller.locationToUpdateSelected(key);
    };
    
    /**
     * @private
     */
    MainView.prototype._onScenarioToUpdateSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("scenario");
        this._controller.scenarioToUpdateSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onNotificationSelected = function (event) {
        var $target = $(event.currentTarget),
            key = $target.data("notification-action");

        this._controller.notificationSelected(key);
    };
    
    /**
     * @private
     */
    MainView.prototype._onGoToUpdateContacts = function () {
        this._controller.goToUpdateContactsSelected();
    };
    
    /**
     * @private
     */
    MainView.prototype._onGoToUpdateLocations = function () {
        this._controller.goToUpdateLocationsSelected();
    };
    
    /**
     * @private
     */
    MainView.prototype._onGoToUpdateScenarios = function () {
        this._controller.goToUpdateScenariosSelected();
    };
    
    /**
     * @private
     */
    MainView.prototype._onGoToUpdatePassword = function () {
        this.showUpdatePassword();
    };
    
    /**
     * @private
     */
    MainView.prototype._onUpdateContact = function () {
        this._controller.updateContactSelected(this._$contactId.val(), this._$contactName.val(), this._$contactEmail.val(),  this._$contactPhone.val(), this._$contactImg.attr('src'));
    };
    
    /**
     * @private
     */
    MainView.prototype._onUpdateLocation = function () {
         this._controller.updateLocationSelected(this._$locationId.val(), this._$locationName.val(), this._$locationImg.attr('src'));
    };
    
    /**
     * @private
     */
    MainView.prototype._onUpdateScenario = function () {
        this._controller.updateScenarioSelected(this._$scenarioId.val(), this._$scenarioName.val(), this._$scenarioStatusType.val(), this._$scenarioImg.attr('src'));
    };
    
    /**
     * @private
     */
    MainView.prototype._onChangeContactImage = function () {
        this._$imgToUpdate = 'contact-img';
        this._onChangeImage();
    };
    
    /**
     * @private
     */
    MainView.prototype._onChangeLocationImage = function () {
       //move to controller
        navigator.camera.getPicture(this._onLocationObtainedSuccess, this._onPictureObtainedFail,
            { destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    
    /**
     * @private
     */
    MainView.prototype._onLocationObtainedSuccess = function(imageURI){
        var image = document.getElementById('location-img');
        image.src = imageURI;
    };
    
    /**
     * @private
     */
    MainView.prototype._onChangeScenarioImage = function () {
        //move to controller
        navigator.camera.getPicture(this._onScenarioObtainedSuccess, this._onPictureObtainedFail,
            { destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    
    /**
     * @private
     */
    MainView.prototype._onScenarioObtainedSuccess = function(imageURI){
        var image = document.getElementById('scenario-img');
        image.src = imageURI;
    };
    
    /**
     * @private
     */
    MainView.prototype._onChangeContactImage = function (entity) { 
        //move to controller
        navigator.camera.getPicture(this._onContactObtainedSuccess, this._onPictureObtainedFail,
            { destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    
    MainView.prototype._onContactObtainedSuccess = function(imageURI){
        var image = document.getElementById('contact-img');
        image.src = imageURI;
    };
    
    MainView.prototype._onPictureObtainedFail = function (msg){
        alert("No pudimos obtener la imagen, por favor intente nuevamente");
    };
    
    return MainView;
});

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs, define */
/*cordova:false, device:false */

define(function () {

    /**
     * @constructor
     */
    function MainView(controller) {
        this._controller = controller;
        this._$statusPage = null;
        this._$locationsPage = null;
        this._$scenariosPage = null;
        this._$contactsPage = null;
        this._$notificationsPage = null;
        this._$statusList = null;
        this._$locationsList = null;
        this._$scenariosList = null;
        this._$contactsList = null;
    }

    MainView.prototype.initialize = function (statusList) {
        this._$statusPage = $("#status-page");
        this._$locationsPage = $("#location-page");
        this._$scenariosPage = $("#scenarios-page");
        this._$contactsPage = $("#contacts-page");
        this._$notificationsPage = $("#notification-page");

        this._$statusList = this._$statusPage.find("#status-list");
        this._$locationsList = this._$locationsPage.find("#locations-list");
        this._$scenariosList = this._$scenariosPage.find("#scenarios-list");
        this._$contactsList = this._$contactsPage.find("#contacts-list");

        this._$statusList.on("tap", "[data-status]", this._onStatusSelected.bind(this));
        this._$locationsList.on("tap", "[data-location]", this._onLocationSelected.bind(this));
        this._$scenariosList.on("tap", "[data-scenario]", this._onScenarioSelected.bind(this));
        this._$contactsList.on("tap", "[data-contact]", this._onContactSelected.bind(this));

        this._$notificationsPage.on("tap", "[data-notification-action]", this._onNotificationSelected.bind(this));

        this._renderOptions(statusList, "status", this._$statusList);
    };

    MainView.prototype.showStatus = function () {
        $.mobile.changePage(this._$statusPage);
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
            //$item = $("<button data-" + dataKey + "='" + item.id + "' class='ui-btn ui-corner-all'>" + item.name + "</button>");
            $wrapper = $("<div data-" + dataKey + "='" + item.id + "' class='list-option'></div>");
            $image = $("<img src='" + item.image + "' draggable='false'></img>");
            $text = $("<p>" + item.name + "</p>");

            $wrapper.append($image);
            $wrapper.append($text);
            $list.append($wrapper);
        }
    };

    /**
     * @private
     */
    MainView.prototype._onStatusSelected = function (event) {
        var $target = $(event.target),
            key = $target.data("status");

        this._controller.statusSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onLocationSelected = function (event) {
        var $target = $(event.target),
            key = $target.data("location");

        this._controller.locationSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onScenarioSelected = function (event) {
        var $target = $(event.target),
            key = $target.data("scenario");

        this._controller.scenarioSelected(key);
    };

    /**
     * @private
     */
    MainView.prototype._onContactSelected = function (event) {
        var $target = $(event.target),
            key = $target.data("contact");

        this._controller.contactSelected(key);
    };

    MainView.prototype._onNotificationSelected = function (event) {
        var $target = $(event.target),
            key = $target.data("notification-action");

        this._controller.notificationSelected(key);
    };

    return MainView;
});

/* global define */

define(["exports"], function (exports) {

    var contacts = [],
        status = [],
        locations = [],
        scenarios = [];

    /**
     * @constructor
     */
    function Contact(id, name, photo, phone) {
        this._id = id;
        this._name = name;
        this._photo = photo;
        this._phone = phone;
    }

    Object.defineProperties(Contact.prototype, {
        "id": {
            get: function () {
                return this._id;
            }
        },
        "name": {
            get: function () {
                return this._name;
            }
        },
        "photo": {
            get: function () {
                return this._photo;
            }
        },
        "phone": {
            get: function () {
                return this._phone;
            }
        }
    });

    /**
     * @constructor
     */
    function Status(id, name, type, icon) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._icon = icon;
    }

    Status.Categories = {
        POSITIVE: "positive",
        NEUTRAL: "neutral",
        NEGATIVE: "negative"
    };

    Object.defineProperties(Status.prototype, {
        "id": {
            get: function () {
                return this._id;
            }
        },
        "name": {
            get: function () {
                return this._name;
            }
        },
        "type": {
            get: function () {
                return this._type;
            }
        },
        "icon": {
            get: function () {
                return this._icon;
            }
        }
    });

    /**
     * @constructor
     */
    function Location(id, name, icon) {
        this._id = id;
        this._name = name;
        this._icon = icon;
    }

    Object.defineProperties(Location.prototype, {
        "id": {
            get: function () {
                return this._id;
            }
        },
        "name": {
            get: function () {
                return this._name;
            }
        },
        "icon": {
            get: function () {
                return this._icon;
            }
        }
    });

    /**
     * @constructor
     */
    function Scenario(id, name, statusType, icon) {
        this._id = id;
        this._name = name;
        this._statusType = statusType;
        this._icon = icon;
    }

    Object.defineProperties(Scenario.prototype, {
        "id": {
            get: function () {
                return this._id;
            }
        },
        "name": {
            get: function () {
                return this._name;
            }
        },
        "statusType": {
            get: function () {
                return this._statusType;
            }
        },
        "icon": {
            get: function () {
                return this._icon;
            }
        }
    });

    function getContacts() {
        return contacts;
    }

    function getStatus() {
        return status;
    }

    function getStatusById(id) {
        var status = null;

        status.some(function (item) {
            var isEqual = (item.id === id);

            if (isEqual) {
                status = item;
            }

            return isEqual;
        });

        return status;
    }

    function getLocations() {
        return locations;
    }

    function getScenariosByStatus(statusType) {
        var currentScenarios = [];

        scenarios.forEach(function (scenario) {
            if (scenario.statusType === statusType) {
                currentScenarios.push(scenario);
            }
        });

        return scenarios;
    }

    function _init() {
        status.push(new Status("feliz", "Feliz", Status.Categories.POSITIVE, null)); // TODO use icons url
        status.push(new Status("triste", "Triste", Status.Categories.NEGATIVE, null));

        locations.push(new Location("casa", "Casa", null));
        locations.push(new Location("escuela", "Escuela", null));
        locations.push(new Location("calle", "Calle", null));
        locations.push(new Location("parque", "Parque", null));

        scenarios.push(new Scenario(1, "Me lastime", Status.Categories.NEGATIVE, null));
        scenarios.push(new Scenario(2, "Estoy encerrado", Status.Categories.NEGATIVE, null));
        scenarios.push(new Scenario(3, "Me perdi", Status.Categories.NEGATIVE, null));

        contacts.push(new Contact(1, "Ana", "test", 123));
        contacts.push(new Contact(2, "Roberto", "test", 123));
        contacts.push(new Contact(3, "Susanita", "test", 123));
    }

    _init();

    exports.getContacts          = getContacts;
    exports.getStatus            = getStatus;
    exports.getLocations         = getLocations;
    exports.getScenariosByStatus = getScenariosByStatus;
    exports.StatusCategory       = Status.Categories;
});

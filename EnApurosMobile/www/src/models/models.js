/* global define */

define(["exports"], function (exports) {

    var contacts = [],
        statusList = [],
        locations = [],
        scenarios = [];

    /**
     * @constructor
     */
    function Contact(id, name, image, phone) {
        this._id = id;
        this._name = name;
        this._image = image;
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
    function Status(id, name, type, image) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._image = image;
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
        "image": {
            get: function () {
                return this._image;
            }
        }
    });

    /**
     * @constructor
     */
    function Location(id, name, image) {
        this._id = id;
        this._name = name;
        this._image = image;
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
        "image": {
            get: function () {
                return this._image;
            }
        }
    });

    /**
     * @constructor
     */
    function Scenario(id, name, statusType, image) {
        this._id = id;
        this._name = name;
        this._statusType = statusType;
        this._image = image;
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
        "image": {
            get: function () {
                return this._image;
            }
        }
    });

    function getContacts() {
        return contacts;
    }

    function getStatus() {
        return statusList;
    }

    function getStatusById(id) {
        var status = null;

        statusList.some(function (item) {
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
        statusList.push(new Status("feliz", "Feliz", Status.Categories.POSITIVE, "assets/happy.png"));
        statusList.push(new Status("triste", "Triste", Status.Categories.NEGATIVE, "assets/sad.png"));

        locations.push(new Location("casa", "Casa", "assets/house.png"));
        locations.push(new Location("escuela", "Escuela", "assets/school.png"));
        locations.push(new Location("calle", "Calle", "assets/road.png"));
        locations.push(new Location("parque", "Parque", "assets/park.png"));

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
    exports.getStatusById        = getStatusById;
    exports.getScenariosByStatus = getScenariosByStatus;
    exports.StatusCategory       = Status.Categories;
});

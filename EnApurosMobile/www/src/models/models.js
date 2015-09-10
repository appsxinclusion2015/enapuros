/* global define */

define(["exports"], function (exports) {

    var contacts = [],
        splashList = [],
        statusList = [],
        locations = [],
        scenarios = [];

    /**
     * @constructor
     */
    function Contact(id, name, phone, image) {
        this._id = id;
        this._name = name;
        this._phone = phone;
        this._image = image;
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
        "image": {
            get: function () {
                return this._image;
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
    function Splash(image) {
        this._image = image;
    }

    Object.defineProperties(Splash.prototype, {
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
    
    function getSplash(){
        return splashList;
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

        scenarios.push(new Scenario(1, "Me lastimé", Status.Categories.NEGATIVE, "assets/hurt.png"));
        scenarios.push(new Scenario(2, "Estoy encerrado", Status.Categories.NEGATIVE, "assets/encerrado.png"));
        scenarios.push(new Scenario(3, "Me perdí", Status.Categories.NEGATIVE, "assets/perdido.png"));

        contacts.push(new Contact(1, "Mamá", 123, "assets/mom.jpg"));
        contacts.push(new Contact(2, "Papá", 123, "assets/dad.jpg"));
        contacts.push(new Contact(3, "Maestra", 123, "assets/teacher.png"));
    }

    _init();

    exports.getContacts          = getContacts;
    exports.getStatus            = getStatus;
    exports.getSplash            = getSplash;
    exports.getLocations         = getLocations;
    exports.getStatusById        = getStatusById;
    exports.getScenariosByStatus = getScenariosByStatus;
    exports.StatusCategory       = Status.Categories;
});

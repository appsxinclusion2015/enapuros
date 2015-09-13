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
    function Contact(id, name, phone, email, image) {
        this._id = id;
        this._name = name;
        this._phone = phone;
        this._email = email;
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
        },
        "email": {
            get: function () {
                return this._email;
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
    
    function getScenarios() {
        return scenarios;
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
    
    function getContactById(id) {
        var result  = contacts.filter(function(c){return c._id== id;} );
        return result? result[0] : null; 
    }

    function _init() {        
        statusList.push(new Status("feliz", "Feliz", Status.Categories.POSITIVE, "assets/icon-feliz.png"));
        statusList.push(new Status("triste", "Triste", Status.Categories.NEGATIVE, "assets/icon-triste.png"));
        
        var locationsToStore = [{"id":"casa","name":"Casa", "img":"assets/icon-casa.png"}, {"id":"escuela","name":"Escuela", "img":"assets/icon-escuela.png"}, {"id":"calle","name":"Calle", "img":"assets/icon-calle.png"}, {"id":"parque","name":"Parque", "img":"assets/icon-parque.png"}];
    
    var scenariosToStore = [{"id":1,"name":"Me lastimé", "status_type": Status.Categories.NEGATIVE, "img":"assets/icon-lastimado.png"}, {"id":2,"name":"Estoy encerrado", "status_type":Status.Categories.NEGATIVE, "img":"assets/icon-encerrado.png"}, {"id":3,"name":"Me perdí",  "status_type": Status.Categories.NEGATIVE, "img":"assets/icon-perdido.png"}];
    
    var contactsToStore = [{"id":1,"name":"Mamá", "phone":123, "email":"mama@mama.com", "img":"blob:file%3A///490b3d98-756f-40dd-af82-0e42f74b5ea1"},{"id":2,"name":"Papá", "phone":123, "email":"papa@papa.com", "img":"assets/icon-papa.png"}, {"id":3,"name":"Maestra", "phone":123, "email":"maestra@mama.com", "img":"assets/icon-maestro.png"}];
        
    localStorage.setItem('locations', JSON.stringify(locationsToStore));
    localStorage.setItem('scenarios', JSON.stringify(scenariosToStore));
    localStorage.setItem('contacts', JSON.stringify(contactsToStore));
        
        var locationsFromStorage = JSON.parse(localStorage.getItem('locations'));
        for (var i = 0; i < locationsFromStorage.length; i++) {
            var location = locationsFromStorage[i];
            locations.push(new Location(location.id, location.name, location.img));
        }
        
        var scenariosFromStorage = JSON.parse(localStorage.getItem('scenarios'));
        for (i = 0; i < scenariosFromStorage.length; i++) {
            var scenario = scenariosFromStorage[i];
            scenarios.push(new Scenario(scenario.id, scenario.name, scenario.status_type, scenario.img));
        }
        
        var contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));
        for (i = 0; i < contactsFromStorage.length; i++) {
            var contact = contactsFromStorage[i];
            contacts.push(new Contact(contact.id, contact.name, contact.phone, contact.email, contact.img));
        }
    }

    _init();

    exports.getContacts          = getContacts;
    exports.getStatus            = getStatus;
    exports.getSplash            = getSplash;
    exports.getLocations         = getLocations;
    exports.getStatusById        = getStatusById;
    exports.getScenariosByStatus = getScenariosByStatus;
    exports.getContactById       = getContactById;
    exports.StatusCategory       = Status.Categories;
});

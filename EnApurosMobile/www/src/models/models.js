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
    function Contact(id, name, phone, email, image, contactMethods) {
        this._id = id;
        this._name = name;
        this._phone = phone;
        this._email = email;
        this._image = image;
        this._contactMethods = contactMethods;
        
    }
    
    Contact.ContactMethods = {
        PHONE: "phone",
        EMAIL: "email",
        SMS: "sms"
    };
    
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
        },
        "contact-methods": {
            get: function () {
                return this.contactMethods;
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
    
    function updateContact(contactId, name, phone, email, img, contactMethods){
        var contactsFromStorage = getStoredItem('contacts');
        var id = parseInt(contactId);
        for (var i = 0; i < contactsFromStorage.length; i++) {
            if(id === contactsFromStorage[i].id){  
                contactsFromStorage[i].name = name;
                contactsFromStorage[i].phone = phone;
                contactsFromStorage[i].email = email;
                contactsFromStorage[i].img = img;
                contactsFromStorage[i]._contactMethods = contactMethods;
                break;  
            }
        }
        
        //Cleanup current items before updating
        restoreItem('contacts');
        contacts = [];
        
        saveItem('contacts', contactsFromStorage);  
        
        //Update contacts list object with new info
        retrieveContacts();
    }
    
    function updateScenario(scenarioId, name, status_type, img){
        var scenariosFromStorage = getStoredItem('scenarios');
        var id = parseInt(scenarioId);
        for (var i = 0; i < scenariosFromStorage.length; i++) {
            if(id === scenariosFromStorage[i].id){  
                scenariosFromStorage[i].name = name;
                scenariosFromStorage[i].status_type = status_type;
                scenariosFromStorage[i].img = img;
                break;  
            }
        }
        
        //Cleanup current items before updating
        restoreItem('scenarios');
        scenarios = [];
        
        saveItem('scenarios', scenariosFromStorage);  
        
        //Update scenarios list object with new info
        retrieveScenarios();
    }
    
    function updateLocation(locationId, name, img){
        var locationsFromStorage = getStoredItem('locations');
        for (var i = 0; i < locationsFromStorage.length; i++) {
            if(locationId === locationsFromStorage[i].id){  
                locationsFromStorage[i].name = name;
                locationsFromStorage[i].img = img;
                break;  
            }
        }
        
        //Cleanup current items before updating
        restoreItem('locations');
        locations = [];
        
        saveItem('locations', locationsFromStorage);  
        
        //Update locations list object with new info
        retrieveLocations();
    }
    
    
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
    
    function getLocationById(id) {
        var result  = locations.filter(function(l){return l._id== id;} );
        return result? result[0] : null; 
    }
    
    function getScenarioById(id) {
        var result  = scenarios.filter(function(s){return s._id== id;} );
        return result? result[0] : null; 
    }

    function _init() {    
        
        loadInitialData();
        retrieveLocations();
        retrieveScenarios();
        retrieveContacts();
    }
    
    function retrieveLocations(){
        var locationsFromStorage = getStoredItem('locations');
        for (var i = 0; i < locationsFromStorage.length; i++) {
            var location = locationsFromStorage[i];
            locations.push(new Location(location.id, location.name, location.img));
        }
    }
    function retrieveScenarios(){
        var scenariosFromStorage = getStoredItem('scenarios');
        for (var i = 0; i < scenariosFromStorage.length; i++) {
            var scenario = scenariosFromStorage[i];
            scenarios.push(new Scenario(scenario.id, scenario.name, scenario.status_type, scenario.img));
        }
    }
    function retrieveContacts(){
        var contactsFromStorage = getStoredItem('contacts');
        for (var i = 0; i < contactsFromStorage.length; i++) {
            var contact = contactsFromStorage[i];
            contacts.push(new Contact(contact.id, contact.name, contact.phone, contact.email, contact.img, contact.contactMethods));
        }
    }
    
    function loadInitialData(){
        //TODO: Move this to an installation time only
        statusList.push(new Status("feliz", "Feliz", Status.Categories.POSITIVE, "assets/icon-feliz.png"));
        statusList.push(new Status("triste", "Triste", Status.Categories.NEGATIVE, "assets/icon-triste.png"));
        
        if(getStoredItem('locations') === null){
            var locationsToStore = [{"id":"casa","name":"Casa", "img":"assets/icon-casa.png"}, {"id":"escuela","name":"Escuela", "img":"assets/icon-escuela.png"}, {"id":"calle","name":"Calle", "img":"assets/icon-calle.png"}, {"id":"parque","name":"Parque", "img":"assets/icon-parque.png"}];   
            saveItem('locations', locationsToStore);
        }
        
        if(getStoredItem('scenarios') === null){
            var scenariosToStore = [{"id":1,"name":"Me lastimé", "status_type": Status.Categories.NEGATIVE, "img":"assets/icon-lastimado.png"}, {"id":2,"name":"Estoy encerrado", "status_type":Status.Categories.NEGATIVE, "img":"assets/icon-encerrado.png"}, {"id":3,"name":"Me perdí",  "status_type": Status.Categories.NEGATIVE, "img":"assets/icon-perdido.png"}];
            saveItem('scenarios', scenariosToStore);

        }
    
        if(getStoredItem('contacts') === null){
            var contactsToStore = [{"id":1,"name":"Mamá", "phone":123, "email":"mama@mama.com", "img":"assets/icon-mama.png", "contactMethods": [Contact.ContactMethods.PHONE, Contact.ContactMethods.EMAIL, Contact.ContactMethods.SMS]},{"id":2,"name":"Papá", "phone":123, "email":"papa@papa.com", "img":"assets/icon-papa.png", "contactMethods": [Contact.ContactMethods.PHONE, Contact.ContactMethods.EMAIL]}, {"id":3,"name":"Maestra", "phone":123, "email":"maestra@mama.com", "img":"assets/icon-maestro.png", "contactMethods": [Contact.ContactMethods.EMAIL, Contact.ContactMethods.SMS]}];
            saveItem('contacts', contactsToStore);
        }
        
    }
    
    function getStoredItem(key){
        return JSON.parse(localStorage.getItem(key));
    }
    
    function restoreItem(key){
        localStorage.removeItem(key);
    }
    
    function saveItem(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }

    _init();

    exports.getContacts          = getContacts;
    exports.getStatus            = getStatus;
    exports.getSplash            = getSplash;
    exports.getLocations         = getLocations;
    exports.getScenarios         = getScenarios;
    exports.getStatusById        = getStatusById;
    exports.getScenariosByStatus = getScenariosByStatus;
    exports.getContactById       = getContactById;
    exports.getLocationById      = getLocationById;
    exports.getScenarioById      = getScenarioById;
    exports.StatusCategory       = Status.Categories;
    exports.updateContact        = updateContact;  
    exports.updateScenario       = updateScenario;
    exports.updateLocation       = updateLocation;  
});

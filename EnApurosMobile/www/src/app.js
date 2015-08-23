/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs */
/*cordova:false, device:false */

requirejs([
    "./models/models",
    "./views/controller"
], function(Models, Controller) {

    "use strict";

    var controller = new Controller(Models);

    controller.initialize();
});

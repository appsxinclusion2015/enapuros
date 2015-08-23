/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false, requirejs, define */
/*cordova:false, device:false */

define(["exports"], function (exports) {

    function call(e) {
        var number = "+5493513715088";

        navigator.callphone.call(function () {}, function (error) {
            console.log(error.call);
        }, number);
    }

    function sendSms(e) {
        var messageInfo = {
            phoneNumber: "+5493513715088",
            textMessage: "This is a test message"
        };

        sms.sendMessage(messageInfo, function (message) {
            console.log("success: " + message);
        }, function (error) {
            console.log("error", error);
        });
    }

    function openAudio(e) {
        var myMedia = new Media('cdvfile://localhost/temporary/recording.mp3');
        myMedia.play();
    }

    function sendEmail(e) {
        alert('hola');
        window.plugins.emailComposer.showEmailComposer("subject","body", "recipient@something.com", "cc@something.com", "bcc@something.com",false);
    });

    exports.call      = call;
    exports.sendSMS   = sendSms;
    exports.openAudio = openAudio;
    exports.sendEmail = sendEmail;
});

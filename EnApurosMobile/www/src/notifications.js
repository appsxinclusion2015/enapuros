define(["exports"], function (exports) {

    function call(e){
        var number = "+5493513715088"
        navigator.callphone.call(function () {}, function (error) {              
           showErrorDialog(errors.call); log(error); 
       }, number );
    }

    function sendSms(e){
       var messageInfo = {
        phoneNumber: "+5493513715088",
        textMessage: "This is a test message"
       };

        sms.sendMessage(messageInfo, function(message) {
            console.log("success: " + message);
        }, function(error) {
            console.log("code: " + error.code + ", message: " + error.message);
        });
    }

    function openAudio(e){
        var my_media = new Media('cdvfile://localhost/temporary/recording.mp3')
        my_media.play();
    }
    
    function sendEmail(e){
        emailclient.sendEmail({
        host: 'smtp.gmail.com',
        port: '993',
        email: 'emiliat09@gmail.com',
        password: 'emt07SA3648*',
        from: 'm.emilia.torino@gmail.com',
        fromName: 'Emi',
        subject: 'Hola',
        body: 'Estoy en apuros'
        }, function(data){
            console.log('data', JSON.parse(data));
        }, function(){
            console.log('failed');
        });
    }

    exports.call = call;
    exports.sendSMS = sendSms;
    exports.openAudio = openAudio;
    exports.sendEmail = sendEmail;
});
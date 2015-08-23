define(["exports"], function (exports) {

    function call(e){
       alert('hola');
    }

    function sendSms(e){
       alert('hola');
    }

    function openAudio(e){
        var my_media = new Media('cdvfile://localhost/temporary/recording.mp3')
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
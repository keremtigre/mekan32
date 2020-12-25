var mongoose=require('mongoose');
var dbURI='mongodb://localhost/mekan32';
mongoose.connect(dbURI,{useNewUrlParser:true});

//bağlandığımızda konsola bağlantı bilgilerini yazdırır.
mongoose.connection.on('connected',function(){
console.log('Mongoose '+dbURI+' adresindeki veritabanına bağlandı\n');
});

//bağlantı hatası olduğunda konsola hata bilgisini yazdıracak
mongoose.connection.on('error',function(err){
console.log('Mongoose bağlantı hatası\n: '+err);
});

//bağlantı kesildiğinde konsola bağlantı kesildi bilgisini yazacak.
mongoose.connection.on('disconnected',function(){
console.log('Mongoose bağlantısı kesildi\n');
});

kapat=function(msg,callback){
    mongoose.connection.close(function(){
        console.log('Mongoose kapatıldı\n '+msg);
        callback();
    });
};
//nodemon için kapatma
process.once('SIGUSR2', function(){
    kapat('nodemon kapatıldı\n',function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});
//uygulama kapandığında kapatma
process.on('SIGINT',function(){
    kapat=('Uygulama kapatıldı\n',function(){
process.exit(0);
    });
});
//herokudan kapatma işlemi gerçekleşirse
process.on('SIGTERM',function(){
    kapat=('heroku kapatıldı\n',function(){
process.exit(0);
    });
});
require('./mekansema');



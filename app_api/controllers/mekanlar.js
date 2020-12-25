const mongoose = require('mongoose');
const Mekan = mongoose.model('mekan');
const cevapOlustur = function (res, status, content) {
  res
    .status(status)
    .json(content);
};

const mekanlariListele = function (req, res) {
  cevapOlustur(res, 200, { "durum": "Mekan Listeleme başarılı" });
}
const mekanEkle = function (req, res) {
  cevapOlustur(res, 200, { "durum": "Ekleme başarılı" });

}
const mekanGetir = function (req, res) {
 if(req.params&&req.params.mekanid){
   Mekan.findById(req.params.mekanid)
   .exec(
    function(hata,mekan){
      if(!mekan){
        cevapOlustur(res,404,{"durum":"mekanid bulunmadı"});
        return;
      }
      else if(hata){
        cevapOlustur(res,404,hata);
        return;
      }
      cevapOlustur(res,200,mekan);
    } 
   );
 }
 else 
 cevapOlustur(res,404,{"durum":"istekte mekanid yok"});
}

const mekanGuncelle = function (req, res) {
  cevapOlustur(res, 200, { "durum": "başarılı" });
}
const mekanSil = function (req, res) {
  cevapOlustur(res, 200, { "durum": "başarılı" });
}
module.exports = {

  mekanlariListele,
  mekanEkle,
  mekanGetir,
  mekanGuncelle,
  mekanSil

};
const BandeiraController = require('../controllers/BandeiraController')
var moment = require('moment');

inicio = moment().format();
fim = moment().format();
BandeiraController.create(inicio,fim)
var tipoBandeira = 0

var setBanderia = function(numero){
  tipoBandeira = numero
}

module.exports = {

  buscaBandeiraDoMes(){
    inicio = moment().format()
    fim = inicio = moment().format()
    setInterval(() => {
      dia = moment().day()
      if( dia === 1){
        BandeiraController.create(inicio,fim)
      }
    },1000)
  }, 

  bandeiraCorrente(){
    setInterval(() => {
      var response = BandeiraController.getUltimaBandeira();
      response.then(function(result) {
        setBanderia(result.tipoBandeira)
      })

    },2000)

  },

  getTipoBandeira(){
    return tipoBandeira;
  }

}
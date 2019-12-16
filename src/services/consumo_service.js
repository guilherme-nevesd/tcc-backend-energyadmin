const LeituraController = require('../controllers/LeituraController')
const ConsumoController = require('../controllers/ConsumoController')
const Controle = require('../models/Controle')
var moment = require('moment');

var somatorioConsumoDoDia = 0

// Inicializa o calculo do consumo diario
var inicioStart =  moment.utc().hours(0).minutes(0).seconds(0).milliseconds(0).format()
var fimStart = moment.utc().hours(0).minutes(0).seconds(0).milliseconds(0).add(1, 'day').format()
response = ConsumoController.getConsumoDia(inicioStart,fimStart).exec()
response.then(function(result) {
  somaConsumdoDoDia(result)
})

// Salva no banco o calculo de consumo a cada minuto
var persisteConsumo = function(dados){
  var fator5s = 5/3600;
  var somatorioConsumo = 0;

  dados.forEach(function(dado){
    somatorioConsumo = somatorioConsumo + ((dado.corrente * 127) * fator5s)
  })
  
  ConsumoController.create(somatorioConsumo)
};

// Soma o consumo diario para exibicao
var somaConsumdoDoDia = function(dados){
  somatorioConsumoDoDia = 0
  dados.forEach(function(dado){
    somatorioConsumoDoDia = somatorioConsumoDoDia + dado.watts
  });
}


module.exports = {

  calculaConsumoMinuto(){
    setInterval(() => {
      var inicio =  moment.utc().subtract(1, 'minutes').format()
      var fim = moment.utc().format()

      if(moment().second() === 0){
        response = LeituraController.getIntervalo(inicio, fim).exec()
        response.then(function(result) {
          persisteConsumo(result)
        })
      }
      
    },1000)
  },

  calculaCosumoDoDia(){
    setInterval(() => {
      var inicio =  moment.utc().hours(0).minutes(0).seconds(0).milliseconds(0).format()
      var fim = moment.utc().hours(0).minutes(0).seconds(0).milliseconds(0).add(1, 'day').format()
      response = ConsumoController.getConsumoDia(inicio,fim).exec()

      response.then(function(result) {
        somaConsumdoDoDia(result)
      })
    },2000)
  },

  getConsumoDia(){
    return somatorioConsumoDoDia.toFixed(2)
  },

  testeSendMqtt(device){
    setInterval(() => {

      response = Controle.find().sort({ _id: -1 }).limit(1)
      response.then(function(result) {
        // console.log('== controle ', result[0].comando)
        if(result[0].comando === 1){
          let randon2 = Math.random();
          let randon = 2 - randon2
          let message = { "dispositivo" : " Eps32 ", "corrente" : `${randon.toFixed(9)}`  }
          device.publish('$aws/things/esp32g/shadow/update/delta', JSON.stringify({ message: message}));
        } else {
          let randon = 0
          let message = { "dispositivo" : " Eps32 ", "corrente" : `${randon.toFixed(9)}`  }
          device.publish('$aws/things/esp32g/shadow/update/delta', JSON.stringify({ message: message}));
        }
        // let message = { "dispositivo" : " Eps32 ", "corrente" : `${(randon*10).toFixed(2)}`  }
  
      })


    }, 3000);
  },
  
}

const axios = require('axios');
const Leitura = require('../models/Leitura');

module.exports = {

  async index(req = null, res = null) {

    const { inicio, fim } = req.query;

    if(inicio && fim){
      var dataInicio = new Date(inicio);
      var dataFim = new Date(fim);

      const leituras = await Leitura.find({
        $and:[
          { createdAt: { $gte: dataInicio } },
          { createdAt: { $lte: dataFim } },
        ]
      }).sort({createdAt: 'desc'}).limit(60);

      return res.json(leituras)

    } else {
      const leituras = await Leitura.find({}).sort({createdAt: 'desc'}).limit(60);
      
      return res.json(leituras);
        
    }
    
  },

  async store(req, res) {
    const { dispositivo, corrente } = req.body;

    const leitura = await Leitura.create({
      dispositivo: dispositivo,
      corrente: corrente
    });

    return res.json(leitura)
  },

  async create(leitura) {
    let dispositivo = leitura["message"]['dispositivo']
    let corrente = leitura["message"]['corrente']
    
    await Leitura.create({
      dispositivo: dispositivo,
      corrente: corrente
    });
  },

  getIntervalo(inicio,fim) {
    if(inicio && fim){
      const leituras = Leitura.find({
        $and:[
          { createdAt: { $gte: inicio } },
          { createdAt: { $lte: fim } },
        ]
      });

      return leituras;

    } else {
      const leituras = Leitura.find({});
      return leituras;
        
    }
  }

};

// {
//   "dispositivo" : " conteudo ",
//   "corrente" : " conteudo ",
// }

// { "dispositivo" : " conteudo ", "corrente" : " conteudo " }


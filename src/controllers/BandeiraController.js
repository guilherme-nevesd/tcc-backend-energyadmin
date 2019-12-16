const axios = require('axios');
const Bandeira = require('../models/Bandeira');
var moment = require('moment')

const bandeiras = ['Bandeira Verde', 
                   'Bandeira Amarela', 
                   'Bandeira Vermelha P1', 
                   'Bandeira Vermelha P2'
                  ]

module.exports = {

  async index() {

    var bandeiras = await Bandeira.find({})

    return bandeiras

  },

  async create(inicio, fim) {

    response = await axios.get(`https://apidosetoreletrico.com.br/api/energy-providers/tariff-flags?monthStart=${inicio}&monthEnd=${fim}`)

    const { flagType, month } = response.data.items[0]


    bandeiraExists = await Bandeira.findOne({
      $and:[
        { tipoBandeira: flagType },
        { mes: moment(month).month() + 1 },
      ]
    })

    if(!bandeiraExists){
      await Bandeira.create({
        tipoBandeira: flagType,
        descricao: bandeiras[flagType],
        mes: moment(month).month() + 1
      });
    }
  },

  async getUltimaBandeira() {
    var bandeira = await Bandeira.find({})

    if(bandeira){
      return bandeira[bandeira.length - 1]
    }
  }
}
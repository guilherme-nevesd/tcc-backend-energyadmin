const axios = require('axios');
const Cadastro = require('../models/Cadastro');
var moment = require('moment')

module.exports = {

  async index(req = null, res = null) {

    var cadastros = await Cadastro.find({})

    return res.json(cadastros);

  },

  async store(req, res) {
    const { client_id, host_aws, private_key_aws, certificate_aws, root_certificate_aws, status } = req.body;

    const cadastro = await Cadastro.create({
      client_id: client_id,
      host_aws: host_aws,
      private_key_aws: private_key_aws,
      certificate_aws: certificate_aws,
      root_certificate_aws: root_certificate_aws,
      status: status

    });

    return res.json(cadastro)
  },

  // async create(inicio, fim) {

  //   response = await axios.get(`https://apidosetoreletrico.com.br/api/energy-providers/tariff-flags?monthStart=${inicio}&monthEnd=${fim}`)

  //   const { flagType, month } = response.data.items[0]


  //   bandeiraExists = await Bandeira.findOne({
  //     $and:[
  //       { tipoBandeira: flagType },
  //       { mes: moment(month).month() + 1 },
  //     ]
  //   })

  //   if(!bandeiraExists){
  //     await Bandeira.create({
  //       tipoBandeira: flagType,
  //       descricao: bandeiras[flagType],
  //       mes: moment(month).month() + 1
  //     });
  //   }
  // },
}

// {
//   "client_id": "client_id",
//   "host_aws": "host_aws",
//   "private_key_aws": "private_key_aws",
//   "certificate_aws": "certificate_aws",
//   "root_certificate_aws": "root_certificate_aws"
// }
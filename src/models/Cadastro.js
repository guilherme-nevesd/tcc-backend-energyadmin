const { Schema, model } = require('mongoose');

const CadastroSchema = new Schema({
  client_id: {
    type: String,
    required: true,
  },
  host_aws: {
    type: String, 
    required: true,
  },
  private_key_aws: {
    type: String, 
    required: true,
  },
  certificate_aws: {
    type: String, 
    required: true,
  },
  root_certificate_aws: {
    type: String, 
    required: true,
  },
  status: {
    type: String
  },
});

module.exports = model('Cadastro', CadastroSchema); 
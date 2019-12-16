const { Schema, model } = require('mongoose');

const BandeiraSchema = new Schema({
  tipoBandeira: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  mes: {
    type: Number, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = model('Bandeira', BandeiraSchema); 
const { Schema, model } = require('mongoose');

const LeituraSchema = new Schema({
  dispositivo: {
    type: String,
    required: true,
  },
  corrente: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = model('Leitura', LeituraSchema); 
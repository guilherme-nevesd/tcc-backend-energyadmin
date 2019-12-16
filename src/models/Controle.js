const { Schema, model } = require('mongoose');

const ControleSchema = new Schema({
  comando: {
    type: Number,
    required: true,
  },
});

module.exports = model('Controle', ControleSchema); 
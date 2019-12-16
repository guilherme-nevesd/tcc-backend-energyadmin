const { Schema, model } = require('mongoose');

const ConsumoSchema = new Schema({
  watts: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = model('Consumo', ConsumoSchema);
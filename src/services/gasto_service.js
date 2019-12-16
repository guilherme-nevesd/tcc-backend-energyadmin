
const tarifas = [
                 0.62833, // 0 - bandeira verde
                 0.64333, // 1 - bandeira amarelo
                 0.66833, // 2 - bandeira vermelho P1
                 0.68833  // 3 - bandeira vermelho P2
                ]

var gastoDia = 0

module.exports = {

  calculaGastoDiario(consumoDiario, bandeira){
    gastoDia = consumoDiario * tarifas[bandeira]

    return gastoDia.toFixed(2)
  }
}

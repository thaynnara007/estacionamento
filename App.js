const Gerenciador = require('./src/Gerenciador')
const vagasTotais = 40;

let gerencia = new Gerenciador(vagasTotais);

gerencia.start();
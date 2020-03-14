const Gerenciador = require('./src/Gerenciador')
const vagasTotais = process.env.VAGAS_TOTAIS || 40;

let gerencia = new Gerenciador(vagasTotais);

gerencia.start();
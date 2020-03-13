const Ticket = require('./Ticket');

class Estacionamento{

    constructor(vagasTotais){
        this.vagasOcupadas = 0;
        this.vagasTotais = vagasTotais; 
        this.locacao = new Array();
        this.horaMinima = 3;
        this.valorMinimoCarro = 5; // até 3 horas
        this.valorExtraCarro = 2; // 2 reais a mais para cada hora passada 
        this.valorMinimoMoto = 3; // até 3 horas
        this.valorExtraMoto = 1; // 1 reais a mais para cada hora passada
    }

    getVagasOcupadas(){
        return this.vagasOcupadas;
    }

    getVagasTotais(){
        return this.vagasTotais;
    }

    setVagasTotais(novoLimite){
        this.vagasTotais = novoLimite;
    }

    getLocacao(){
        return this.locacao;
    }

    setLocacao(novaLocacao){
        this.locacao = novaLocacao;
    }

    getHoraMinima(){
        return this.horaMinima;
    }

    setHoraMinima(novaHora){
        this.horaMinima = novaHora;
    }

    getValorMinimoCarro(){
        return this.valorMinimoCarro;
    }

    setValorMinimoCarro(novoValor){
        this.valorMinimoCarro = novoValor;
    }

    getValorExtraCarro(){
        return this.valorExtraCarro;
    }

    setValorExtraCarro(novoValor){
        this.valorExtraCarro = novoValor;
    }

    getValorMinimoMoto(){
        return this.valorMinimoMoto;
    }

    setValorMinimoMoto(novoValor){
        this.valorMinimoMoto = novoValor;
    }

    getValorExtraMoto(){
        return this.valorExtraMoto;
    }

    setValorExtraMoto(novoValor){
        this.valorExtraMoto = novoValor;
    }

    getVagaVazia(){

        let i = 0;
        let ticket = this.locacao[i];

        while (ticket != undefined){
            i += 1;
            ticket = ticket[i];
        }

        return i;
    }

    emiteTicket(veiculo){

        let ticket = "";

        if (this.vagasOcupadas < this.vagasTotais) {

            let id = this.getVagaVazia();
            let novoTicket = new Ticket(new Date(), id, veiculo);

            this.locacao[id] = novoTicket;
            this.vagasOcupadas += 1
            ticket = novoTicket.toString();
        }
        else
            ticket = "O estacionamente está lotado. Volte mais tarde :)";
        
        return ticket;
    }

    calculaValor(hora, veiculo){
        
        let valor = 0;

        if (veiculo == "CARRO")
            valor = (hora > this.horaMinima) ? (this.valorMinimoCarro + (hora - this.horaMinima) * this.valorExtraCarro) : this.valorMinimoCarro;
        else
            valor = (hora > this.horaMinima) ? (this.valorMinimoMoto + (hora - this.horaMinima) * this.valorExtraMoto) : this.valorMinimoMoto;

        return valor;
    }

    consultarValor (ticketId){

        let ticket = this.locacao[ticketId];
        let hora = ticket.getIntervalo();
        let valor = this.calculaValor(hora, ticket.getVeiculo());

        return valor;
    }

    removeTicket(ticketId){

        novaLocacao = this.locacao.splice(ticketId, 1);
        this.setLocacao(novaLocacao);
        this.vagasOcupadas -= 1;
    }
}

module.exports = {Estacionamento}
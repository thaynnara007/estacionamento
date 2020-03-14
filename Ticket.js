class Ticket {

    constructor (horaEntrada, id, veiculo){
        this.horaEntrada = horaEntrada;
        this.pago = false;
        this.id = id;
        this.veiculo = veiculo;
    }

    getId(){
        return this.id;
    }

    setId(newId){
        this.id = newId;
    }

    getPago() {
        return this.pago;
    }

    setPago() {
        this.pago = !this.pago;
    }

    getHoraEntrada(){
        return this.horaEntrada;
    }

    getVeiculo(){
        return this.veiculo;
    }

    getIntervalo() {

        let difference = Date.now() - Date.parse(this.horaEntrada);
        let hours = Math.ceil((difference / (1000 * 60 * 60)) % 24);
        
        return hours;
    }

    toString(){

        let pagamento = this.pago ? "sim" : "nao"

        let descricao = `Horario de entrada: ${this.horaEntrada}\n` +
                    `Veiculo: ${this.veiculo}\n` +
                    `Ticket numero: ${this.id}\n` +
                    `Pago: ${pagamento}`;

        return descricao;
    }
}

module.exports = Ticket



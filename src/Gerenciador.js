const Estacionamento = require('./Estacionamento.js');
const rl = require('readline-sync');


class Gerenciador{

    constructor (vagasTotais){
        this.estacionamento = new Estacionamento(vagasTotais);
    }

    showMenu(){

        let menu = "\nBem-vindo ao Estacionamento!\n" +
                `Vagas comportadas: ${this.estacionamento.vagasTotais}\n` +
                `Vagas ocupadas: ${this.estacionamento.vagasOcupadas}\n` +
                `Vagas disponiveis: ${this.estacionamento.getVagasDisponiveis()}`
                "1 - Emitir um ticket\n" +
                "2 - Vizualizar o valor a ser pago em um ticket\n" +
                "3 - Efetuar pagamento de um ticket\n" +
                "4 - Sair do estacionamento\n" +
                "0 - Para sair do sistema"; 
        
        console.log(menu);
    }

    delega(escolha){

        if (escolha == "1"){

            let resposta = rl.question("Informe qual o veiculo (1- Carro ou 2- Moto): ");
            let veiculo = (resposta == '1') ? "CARRO" : "MOTO";
            let ticket = this.estacionamento.emiteTicket(veiculo);

            console.log(ticket);            
        }
        else if (escolha == "2"){

            let ticketId = rl.question("Informe o id do ticket: ")
            let valor = this.estacionamento.consultaValor(ticketId);
            let mensagem = (valor > 0) ? `${valor} R$` : "Ticket id inexistente";

            console.log(mensagem);
        }
        else if (escolha == "3"){ 

            let ticketId = rl.question("Informe o id do ticket a ser pago: ") 
            let ticket = this.estacionamento.pagaTicket(ticketId);
            let mensagem = (ticket) ? ticket.toString() : "Pagamento falhou, verifica se o numero do ticket esta correto";
            
            console.log(mensagem);
        }
        else if (escolha == "4"){
            let ticketId = rl.question("Informe o id do ticket para sair: ") 
            let ticket = this.estacionamento.getLocacao()[ticketId];
            let mensagem = (ticket.getPago()) ? "Acesso liberado" : "Seu ticket ainda não foi pago, por favor pagar";
            
            console.log(mensagem)
        }
        else console.log("Por favor, digite umas das opções disponíveis");
    }
    start(){
        let escolha;

        while (escolha != "0"){
            this.showMenu();
            escolha = rl.question('Escolha uma opcao: ');
            this.delega(escolha);   
        }
    }
}

module.exports = Gerenciador;




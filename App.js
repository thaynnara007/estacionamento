const Estacionamente = require('./Estacionamento.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function main(){

    let vagasTotais = 40;
    let estacionamento = new Estacionamento(vagasTotais);

    function showMenu(){

        let menu = "Bem-vindo ao Estacionamento!\n" +
                `Vagas comportadas: ${estacionamento.vagasTotais}\n` +
                `Vagas ocupadas: ${estacionamento.vagasOcupadas}\n` +
                "1 - Emitir um ticket\n" +
                "2 - Vizualizar o valor a ser pago em um ticket\n" +
                "3 - Efetuar pagamento de um ticket\n" +
                "0 - Para sair"; 
        
        console.log(menu);
    }

    function delega(escolha){

        switch (escolha){

            case "1":
                rl.question("Informe qual o veiculo (1- Carro ou 2- Moto): ", (resposta) =>{
                    
                    let veiculo = (resposta == '1') ? "CARRO" : "MOTO";
                    let ticket = this.estacionamento.emiteTicket(veiculo);
                    console.log(ticket);
                })
        }
    }
    /*
    do{
        this.showMenu();
        rl.question("Digite uma opcao: ", (escolha) =>{
           
        })
    }
    */
}



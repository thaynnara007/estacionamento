const Estacionamento = require('../src/Estacionamento');
const mocha = require('mocha');
const chai = require('chai');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(assertArrays);

let estacionamento = new Estacionamento(5);

describe('Testando funcoes do estacionamento', () =>{

    it ("TESTE01: deve averiguar que os Ids dos tickets nao estao em uso", () =>{

        expect(estacionamento.vagaNaoVazia(0)).to.be.false;
        expect(estacionamento.vagaNaoVazia(1)).to.be.false;
        expect(estacionamento.vagaNaoVazia(2)).to.be.false;
        expect(estacionamento.vagaNaoVazia(3)).to.be.false;
        expect(estacionamento.vagaNaoVazia(4)).to.be.false;
    })

    it ("TESTE02: verifica que vagas ocupada eh igual a zero", () =>{

        expect(estacionamento.getVagasOcupadas()).to.equals(0);
    })

    it ("TESTE03: deve everiguar uso do Id apos emissao do ticket", () =>{

        estacionamento.emiteTicket("CARRO");
        estacionamento.emiteTicket("MOTO");

        expect(estacionamento.vagaNaoVazia(0)).to.be.true;
        expect(estacionamento.vagaNaoVazia(1)).to.be.true;
        expect(estacionamento.vagaNaoVazia(2)).to.be.false;
        expect(estacionamento.vagaNaoVazia(3)).to.be.false;
        expect(estacionamento.vagaNaoVazia(4)).to.be.false;
    })

    it ("TESTE04: verifica que vagas ocupada eh igual a dois", () =>{

        expect(estacionamento.getVagasOcupadas()).to.equals(2);
    })

    it ("TESTE05: deve retorna o valor para as horas minimas", () =>{

        expect(estacionamento.calculaValor(1, "CARRO")).to.equals(5);
        expect(estacionamento.calculaValor(3, "CARRO")).to.equals(5);

        expect(estacionamento.calculaValor(1, "MOTO")).to.equals(3);
        expect(estacionamento.calculaValor(3, "MOTO")).to.equals(3);
    })

    it ("TESTE06: deve retorna o valor para as horas acima da minima", () =>{

        expect(estacionamento.calculaValor(4, "CARRO")).to.equals(7);
        expect(estacionamento.calculaValor(8, "CARRO")).to.equals(15);

        expect(estacionamento.calculaValor(4, "MOTO")).to.equals(4);
        expect(estacionamento.calculaValor(8, "MOTO")).to.equals(8);
    })

    it ("TESTE07: deve retorna a primeira vaga vazia", () =>{

        expect(estacionamento.getVagaVazia()).to.equals(2);
        estacionamento.emiteTicket("CARRO");
        expect(estacionamento.getVagaVazia()).to.equals(3);
    })

    it("TESTE08: nao deve emitir tickets quando o estacionamento estiver cheio", () =>{

        estacionamento.emiteTicket("MOTO");
        estacionamento.emiteTicket("MOTO");

        expect(estacionamento.getVagasDisponiveis()).to.equals(0);
        expect(estacionamento.getVagasOcupadas()).to.equals(5);
        expect(estacionamento.getLocacao()).to.be.an('array').to.be.ofSize(5);

        expect(estacionamento.emiteTicket("CARRO")).to.equals("O estacionamente está lotado. Volte mais tarde :)");

        expect(estacionamento.getVagasDisponiveis()).to.equals(0);
        expect(estacionamento.getVagasOcupadas()).to.equals(5);
        expect(estacionamento.getLocacao()).to.be.an('array').to.be.ofSize(5);
        
    })

    it ("TESTE09: deve retirar tickets da alocacao", () =>{

        estacionamento.removeTicket(1);

        expect(estacionamento.getVagasDisponiveis()).to.equals(1);
        expect(estacionamento.getVagasOcupadas()).to.equals(4);
        expect(estacionamento.getLocacao()).to.be.an('array').to.be.ofSize(5);
        expect(estacionamento.getVagaVazia()).to.equals(1);

        estacionamento.removeTicket(0);

        expect(estacionamento.getVagasDisponiveis()).to.equals(2);
        expect(estacionamento.getVagasOcupadas()).to.equals(3);
        expect(estacionamento.getLocacao()).to.be.an('array').to.be.ofSize(5);
        expect(estacionamento.getVagaVazia()).to.equals(0);
    })

    it("TESTE10: deve pagar tickets de id usados", () =>{

        let ticket2 = estacionamento.pagaTicket(2);
        expect(ticket2.getPago()).to.be.true;
    })

    it("TESTE11: nao deve pagar tickets de id nao usados ou ja pagos", () =>{

        expect(estacionamento.pagaTicket(10)).to.equal(undefined);
        expect(estacionamento.pagaTicket(0)).to.equal(undefined);
        expect(estacionamento.pagaTicket(2)).to.equal(undefined);
    })
})
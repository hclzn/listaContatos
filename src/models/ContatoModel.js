const mongoose = require('mongoose');
const { default: validator } = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    telefone: { type: String, required: false },
    email: { type: String, required: false },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: String, required: true },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async cadastrar() {
        this.valida();
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
        return this.contato;
    }


    async editar(id) {
        if (typeof id !== 'string') return;
        this.valida();
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
        return this.contato;
    }


    valida() {
        this.cleanUp();

        if (!this.body.nome) this.errors.push('Informe o nome do contato.');
        if (!this.body.email && !this.body.telefone) this.errors.push('Informe telefone e/ou e-mail.');
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            telefone: this.body.telefone,
            email: this.body.email,
            createdBy: 'Ajustado na sequência'
        }

    }

    static async buscaPorId(id) {
        if (typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    }

    static async listaContatos() {
        const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
        return contatos;
    }

    static async excluir(id) {
        if (typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({ _id: id });
        return contato;
    }

    static async addUser(contatoId, userId) {
        if (typeof contatoId !== 'string') return;
        if (typeof userId !== 'string') return;
        await ContatoModel.findByIdAndUpdate(contatoId, { createdBy: userId });
    }

}

module.exports = Contato;
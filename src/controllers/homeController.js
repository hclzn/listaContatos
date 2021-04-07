const Contato = require('../models/ContatoModel');

exports.paginaInicial = async (req, res) => {
    let userId = '';
    if(req.session.user) userId = req.session.user._id;
    const contatosAll = await Contato.listaContatos();
    const contatos = contatosAll.filter(function(contato) {
        return contato.createdBy == userId;
    });
    res.render('home', {contatos});
};


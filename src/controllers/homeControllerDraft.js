// const HomeModel = require('../models/HomeModel');

// HomeModel.create({
//     titulo: 'Título de outra coisa',
//     descricao: 'Descrição de outra coisa.'
// })
//      .then(dados => console.log(dados))
//      .catch(e => console.log(e));

// HomeModel.find()
//      .then(dados => console.log(dados))
//      .catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    // req.session.usuario = { nome: 'Luiz', logado: true };
    // console.log(req.session.usuario); //fica por 7 dias!
    // req.flash('info', 'Olá!');
    // req.flash('error', 'ERRROOOU');
    // req.flash('success', 'SUCESSOOOO');
    // console.log(req.flash('info'),req.flash('error'), req.flash('success'));
    res.render('index');
    return;
};

exports.trataPost = (req, res) => {
    res.send(req.body);
}

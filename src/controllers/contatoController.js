const Contato = require('../models/ContatoModel');

exports.novoContato = (req,res) => {
    res.render('contato', {contato: {}});
}

exports.register = async (req,res) => {
    const contato = new Contato(req.body);
    const contatoCriado = await contato.cadastrar();
    
    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => {
            res.redirect('/novoContato');
        });
        return;
    }
    
    await Contato.addUser(String(contatoCriado._id), req.session.user._id);
    
    req.flash('success', 'Contato registrado!');
    req.session.save(() => {
        res.redirect('/');
    });
}

exports.editarIndex = async(req,res) => {
    if(!req.params.id) return res.render('404');
    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');
    res.render('contato', {contato})
}

exports.editar = async (req,res) => {
    if(!req.params) return res.render('404');
    const contato = new Contato(req.body);
    const contatoEditado = await contato.editar(req.params.id);
    
    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => {
            res.redirect(`/editarIndex/${req.params.id}`);
        });
        return;
    }
    
    await Contato.addUser(String(contatoEditado._id), req.session.user._id);
    req.flash('success', 'Edições salvas :)');
    req.session.save(() => {
        res.redirect('/');
    });
    
    return;
}

exports.excluir = async (req, res) => {
    if(!req.params) return res.render('404');

    const contato = await Contato.excluir(req.params.id);
    if(!contato) return res.render('404');
    
    req.flash('success', 'Contato excluído :(');
    req.session.save(() => {
        res.redirect('/');
    });
    
    return;
}
const Login = require('../models/LoginModel');

exports.loginInicial = (req, res) => {
    if (req.session.user) return res.render('loginLogado');
    res.render('login');
};

exports.cadastro = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login');
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso! Faça login para acessar seus contatos.');
        req.session.save(function () {
            return res.redirect('/login');
        });


        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
    return;
}

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.logar();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login');
            });
            return;
        }
       
        req.flash('success', 'Usuário logado com sucesso.');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/login');
        });


    } catch (e) {
        console.log(e);
        res.render('404');
    }
    return;
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/login');
}
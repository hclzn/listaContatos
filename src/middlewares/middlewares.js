const path = require('path');
const pathToBundleJs = path.resolve(__dirname, 'public', 'assets', 'js')

exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Coruja';
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.pathToBundleJs = pathToBundleJs;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.logado = (req, res, next) => {
    
    if(!req.session.user) {
        req.flash('errors', 'Você precisa estar logado para cadastrar contatos.');
        req.session.save(() => res.redirect('/login'));
        return;
    }
    
    res.locals.createdBy = req.session.user;
    next();

}
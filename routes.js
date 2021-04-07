//Vê a rota e trata chamando controlador!

const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController= require('./src/controllers/loginController');
const contatoController= require('./src/controllers/contatoController');

const { logado } = require('./src/middlewares/middlewareTeste');

//Rotas da home, próximo parametros da rota são middlewares!
route.get('/', homeController.paginaInicial);

//Rotas de login
route.get('/login', loginController.loginInicial);
route.post('/register', loginController.cadastro);
route.post('/logado', loginController.login);
route.get('/logout', loginController.logout);

//Rotas de contato
route.get('/novoContato', logado,  contatoController.novoContato);
route.post('/novo', logado,  contatoController.register);
route.get('/editarIndex/:id', logado,  contatoController.editarIndex);
route.post('/editar/:id', logado,  contatoController.editar);
route.get('/excluir/:id', logado,  contatoController.excluir);
// route.get('/:id', logado,  contatoController.novoContato);

module.exports = route;
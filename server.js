require('dotenv').config(); //coisas relacionadas com MEU ambiente de desenvolvimento, .git ignora ele
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
 })
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

const session = require('express-session'); //identifica navegador do cliente, cookie
const flash = require('connect-flash'); //flash messages! auto-destrutivas, salvas em sessões!

const MongoStore = require('connect-mongo'); //sessões salvas em base de dados

const routes = require('./routes');
const path = require('path');

const helmet = require('helmet');
const csrf = require('csurf'); //sites externos não postam dentro da nossa aplicação
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middlewareTeste');

app.use(helmet());

app.use(express.urlencoded({ extended: true })); //trata body das requisições, para não ficar undefined
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); //pode acessar diretamente

const sessionOptions = session({
    secret: 'segredo',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); //mais se aproxima do html! if, for, print no html consigo fazer com engine

app.use(csrf()); //2 middlewares: injetar token e check for error
//Nossos próprios Middlewares <3
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});


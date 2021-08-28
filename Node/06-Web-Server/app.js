require('dotenv').config();

const EXPRESS = require('express');

const HBS = require('hbs');

const APP = EXPRESS();

const PORT = process.env.PORT;

APP.set('view engine','hbs');

HBS.registerPartials(__dirname + '/views/partials');

APP.use(EXPRESS.static('public'));

/*
APP.get('/', (request,response) => {
    response.render('home',{
        nombre: '  Stephanie Castillo',
        titulo: ' Curso de NODE  '
    });
});

APP.get('/generic', (request,response) => {
    response.render('generic',{
        nombre: '  Stephanie Castillo',
        titulo: ' Curso de NODE  '
    });
});

APP.get('/elements', (request,response) =>{
    response.render('elements',{
        nombre: '  Stephanie Castillo',
        titulo: ' Curso de NODE  '
    });
});
*/

APP.get('*', (request,response) => {
    response.sendFile(__dirname + '/public/index.html');
});

APP.listen(PORT,() =>{
    console.log(`Example spp listenig at http://localhost:${PORT}`)
})
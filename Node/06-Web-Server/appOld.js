const HTTP = require('http');

HTTP.createServer((request, response) => {
    response.writeHead(200,{
        'Content-Type': 'application/json'
    })
    response.setHeader('Content-Disposition', 'attachment; filename = lista.csv');
    response.writeHead(200,{
        'Content-Type': 'application/csv'
    });
    response.write('Hola tefi <3');
    response.end();
})
.listen(8080);
console.log('Escuchando en el puerto 8080');
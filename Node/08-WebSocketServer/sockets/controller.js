const SOCKET_CONTROLLER = (socket) => {
    console.log('Cliente conectado', socket.ID);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.ID);
    });
    socket.on('enviar-mensaje', (payload, callback) => {
        const ID = 1234;
        callback({ID, FECHA: new Date().getTime()});
        socket.broadcast.emit('enviar-mensaje', payload);
    });
}

module.exports = {
    SOCKET_CONTROLLER,
}
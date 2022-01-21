const { SOCKET } = require('socket.io');
const { COMPROBAR_JWT } = require('../helpers');
const { CHAT_MENSAJE_MODELS } = require('../models');

const CHAT_MENSAJE = new CHAT_MENSAJE_MODELS();


const socketController = async( socket = new SOCKET(), io ) => {

    const usuario = await COMPROBAR_JWT(socket.handshake.headers['x-token']);
    if ( !usuario ) {
        return socket.disconnect();
    }

    CHAT_MENSAJE.conectarUsuario( usuario );
    io.emit('usuarios-activos',     CHAT_MENSAJE.usuariosArr );
    socket.emit('recibir-mensajes', CHAT_MENSAJE.ultimos10 );

    socket.join( usuario.id );
    
    socket.on('disconnect', () => {
        CHAT_MENSAJE.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', CHAT_MENSAJE.usuariosArr );
    })

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        
        if ( uid ) {
            socket.to( uid ).emit( 'mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            CHAT_MENSAJE.enviarMensaje(usuario.id, usuario.nombre, mensaje );
            io.emit('recibir-mensajes', CHAT_MENSAJE.ultimos10 );
        }
    })
}



module.exports = {
    socketController
}
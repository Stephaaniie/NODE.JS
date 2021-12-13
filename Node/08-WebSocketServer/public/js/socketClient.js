const LBL_ONLINE = document.querySelector('#lblOnline');

const LBL_OFFLINE = document.querySelector('#lblOffline');

const TXT_MENSAJE = document.querySelector('#txtMensaje');

const BTN_ENVIAR = document.querySelector('#btnEnviar');

const SOCKET = io();

SOCKET.on('connect', () => {
    console.log('Conectado al servidor');
    LBL_OFFLINE.style.display = 'none';
    LBL_ONLINE.style.display = '';
});

SOCKET.on('disconnect', () => {
    console.log('Desconectado del servidor')
    LBL_ONLINE.style.display = 'none';
    LBL_OFFLINE.style.display = '';
});

SOCKET.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

BTN_ENVIAR.addEventListener('click', () => {
    const MENSAJE = txtMensaje.value;
    const PAYLOAD = {
        MENSAJE,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    SOCKET.emit('enviar-mensaje', PAYLOAD, (id) => {
        console.log('Desde el server',id);
    });
})
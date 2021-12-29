const SEARCH_PARAMS = new URLSearchParams(window.location.search);

if (!SEARCH_PARAMS.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio ')
}

const ESCRITORIO = SEARCH_PARAMS.get('escritorio');

const LBL_ESCRITORIO = document.querySelector('h1');

const BTN_NUEVO = document.querySelector('button');

const LBL_TICKET = document.querySelector('small');

const DIV_ALERTA = document.querySelector('.alert');

const LBL_PENDIENTES = document.querySelector('#lblPendientes');

const SOCKET = io();

DIV_ALERTA.style.display = 'none';

SOCKET.on('connect', () => {
    BTN_NUEVO.disabled = false;
});

SOCKET.on('disconnect', () => {
    BTN_NUEVOBTN_NUEVO.disabled = true;
});

SOCKET.on('tickets-pendientes', (pendiente) => {
    if (pendiente === 0) {
        LBL_PENDIENTES.style.display = 'none';
    } else{
        LBL_PENDIENTES.style.display = '';
        LBL_PENDIENTES.innerText = pendiente;
    }
});

SOCKET.on('ultimo-ticket',(ultimo) => {
    LBL_NUEVO_TICKET.innerText = 'Ticket' + ultimo;
});

SOCKET.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

SOCKET.on('siguiente-ticket',(payload, callback) =>{
    const SIGUIENTE = TICKET_CONTROL.siguiente();
    callback(SIGUIENTE);
    socket.broadcast.emit('tickets-pendientes', TICKET_CONTROL.tickets.length);
});

BTN_NUEVO.addEventListener('click', () => {
    
    SOCKET.emit('nuevo-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if (!ok) {
            LBL_TICKET.innerText = 'Nadie. '
            return DIV_ALERTA.style.display = '';
        }

        LBL_TICKET.innerText = 'Ticket ' + ticket.numero
    });
})
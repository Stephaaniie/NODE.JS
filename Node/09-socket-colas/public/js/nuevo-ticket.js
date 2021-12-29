const LBL_NUEVO_TICKET = document.querySelector('#lblNuevoTicket');

const BTN_CREAR       = document.querySelector('button');

const SOCKET = io();

SOCKET.on('connect', () => {
    BTN_CREAR.disabled = false;
});

SOCKET.on('disconnect', () => {
    BTN_CREAR.disabled = true;
});

SOCKET.on('ultimo-ticket',(ultimo) => {
    LBL_NUEVO_TICKET.innerText = 'Ticket' + ultimo;
});

BTN_ENVIAR.addEventListener('click', () => {
    
    SOCKET.emit('siguiente-ticket', null, (ticket) => {
        LBL_NUEVO_TICKET.innerText = ticket;
    });
})
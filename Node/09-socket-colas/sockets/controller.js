const { TicketControl } = require("../models/ticket-controll");

const TICKET_CONTROL = new TicketControl();

const SOCKET_CONTROLLER = (socket) => {
    socket.emit('ultimo-ticket', TICKET_CONTROL.ultimo);
    socket.emit('estado-actual', TICKET_CONTROL.ultimosCuatro);
    socket.emit('ticket-pendiente', TICKET_CONTROL.tickets.length);
    socket.on('Siguiente-ticket', (payload, callback) => {
        const SIGUIENTE = TicketControl.siguiente();
        callback(SIGUIENTE);
    });
    socket.on('nuevo-ticket', ({escritorio}, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const TICKET = TICKET_CONTROL.atenderTiceket(escritorio);
        
        socket.broadcast.emit('estado-actual', TICKET_CONTROL.ultimosCuatro);
        socket.emit('tickets-pendientes', TICKET_CONTROL.tickets.length);
        socket.broadcast.emit('tickets-pendientes', TICKET_CONTROL.tickets.length);
        
        if (!TICKET) {
            callback({
                ok: false,
                msg:'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                TICKET
            });
        }
    });
}

module.exports = {
    SOCKET_CONTROLLER,
}
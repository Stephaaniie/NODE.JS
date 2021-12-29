const LBL_TICKET1 =  document.querySelector('#lblTicket1');

const LBL_TICKET2 =  document.querySelector('#lblTicket2');

const LBL_TICKET3 =  document.querySelector('#lblTicket3');

const LBL_TICKET4 =  document.querySelector('#lblTicket4');

const LBL_ESCRITORIO1 = document.querySelector('#lblEscritorio1');

const LBL_ESCRITORIO2 = document.querySelector('#lblEscritorio2');

const LBL_ESCRITORIO3 = document.querySelector('#lblEscritorio3');

const LBL_ESCRITORIO4 = document.querySelector('#lblEscritorio4');

const SOCKET = io();

SOCKET.on('estado-actual', (payload) => {
    const AUDIO = new Audio('./audio/new-ticket.mp3');

    AUDIO.play();

    const [TICKET1, TICKET2, TICKET3, TICKET4] = payload;
    
    if (!TICKET1) {
        LBL_TICKET1.innerText = 'Ticket ' + TICKET1.numero;
        LBL_ESCRITO1.innerText = 'Ticket ' + TICKET1.escritorio;
    }
    if (!TICKET2) {
        LBL_TICKET2.innerText = 'Ticket ' + TICKET2.numero;
        LBL_ESCRITO2.innerText = 'Ticket ' + TICKET2.escritorio;
    }
    if (!TICKET3) {
        LBL_TICKET3.innerText = 'Ticket ' + TICKET3.numero;
        LBL_ESCRITO3.innerText = 'Ticket ' + TICKET3.escritorio;
    }
    if (!TICKET4) {
        LBL_TICKET4.innerText = 'Ticket ' + TICKET4.numero;
        LBL_ESCRITO4.innerText = 'Ticket ' + TICKET4.escritorio;
    }
});

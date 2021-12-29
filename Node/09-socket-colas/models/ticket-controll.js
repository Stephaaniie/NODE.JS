const PATH = require('path');

const FS = require('fs');

const INCREMENTO = 1;

const MAX_LECTURA_TKT = 4;

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.actual = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
    }

    get toJson(){
        return{
            ultimo: this.ultimo,
            actual: this.actual,
            tickets:this.tickets,
            ultimosCuatro:this.ultimosCuatro
        }
    }

    init(){
        const {ultimo, actual, tickets, ultimosCuatro} = require('../db/data.json');
        if(actual === this.actual){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimosCuatro = ultimosCuatro;
        }
        this.guardarDB();
    }

    guardarDB(){
        const DB_PATH = PATH.join(__dirname, '../db/data.json');
        FS.writeFileSync(DB_PATH, JSON.stringify(this.toJson));
    }

    siguiente(){
        this.ultimo += INCREMENTO;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.guardarDB();
        return 'Ticket: '+ this.ultimo;
    }

    atenderTiceket( escritorio) {
        if (this.tickets.length ===0) {
            return null;
        }
        const TICKET = this.tickets.shift();
        ticket.escritorio = this.escritorio;
        this.ultimosCuatro.unshift(TICKET);
    
        if (this.ultimosCuatro.length > MAX_LECTURA_TKT ) {
            this.ultimosCuatro.splice(-1, 1);
        }
        this.guardarDB();
        return TICKET;
    }
}

module.exports = TicketControl;
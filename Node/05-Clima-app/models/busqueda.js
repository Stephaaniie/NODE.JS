const AXIOS = require('axios');

class Busqueda {

    historial = ['Buenos Aires','Mexico','Francia','Italia','Estados Unidos','Siza'];
    
    constructor(){

    }

    async ciudad(lugar = ''){

       // console.log(lugar);
        const RESP = await AXIOS.get('https://api.mapbox.com/geocoding/v5/mapbox.places/-58.3778060483437%2C-34.60086615658818.json?access_token=pk.eyJ1Ijoic2NlbGkiLCJhIjoiY2tzdjIycGJyMWxiaTJvbzM1dmlpMGV3diJ9.GXGFAfNRE7Jr5V9IetYdaQ');
        return[];
    }
}

module.exports = Busquedas;
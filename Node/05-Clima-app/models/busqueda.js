const AXIOS = require('axios');

class Busqueda {

    historial = ['Buenos Aires','Mexico','Francia','Italia','Estados Unidos','Siza'];
    
    constructor(){

    }

    get paramsMapbox() {
        return{
            'access_token' :  '',
            'limit' : 5,
            'lenguage' : 'es'
        }
    }

    async ciudad(lugar = ''){

        const INSTANCE = AXIOS.create({
            BASE_URL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json?`,
            PARAMS : this.paramsMapbox
        })
        const RESP = await  INSTANCE.get();
        return[];
    }
}

module.exports = Busquedas;
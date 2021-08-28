const AXIOS = require('axios');

const FS = require('fs');

const MAXIMA_LIMIT = 5;

const PRIMER_INDICE = 0;

class Busqueda {
    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.historialCapitalizado(' ');
            palabras = palabras.map( p => p[PRIMER_INDICE].toUpperCase() + p.substring(1));
            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return{
            'access_token' :  process.env.MAPBOX_EY,
            'limit' : MAXIMA_LIMIT,
            'lenguage' : 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            const INSTANCE = AXIOS.create({
                BASE_URL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json?`,
                PARAMS : this.paramsMapbox
            });
            const RESP = await  INSTANCE.get();
            return RESP.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lag: lugar.center[PRIMER_INDICE],
                lat: lugar.center[1]
            }));
            
        } catch (error) {
            return[];
        }
    }

    async climaLugar( lat, lon ) {
        try { 
            const INSTANCE = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })
            const RESP = await INSTANCE.get();
            const { weather, main } = RESP.data;
            return {
                desc: weather[PRIMER_INDICE].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ) {
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift( lugar.toLocaleLowerCase() );

        this.guardarDB();
    }

    guardarDB() {
        const PAYLOAD = {
            historial: this.historial
        };
        FS.writeFileSync( this.dbPath, JSON.stringify( PAYLOAD ) );
    }

    leerDB() {
        if( !FS.existsSync( this.dbPath ) ) return;
        const INFO = FS.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const DATA = JSON.parse( INFO );

        this.historial = DATA.historial;
    }
}

module.exports = Busquedas;
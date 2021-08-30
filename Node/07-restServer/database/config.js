const MONGOOSE = require('mongoose');

const DB_CONECTION = async() => {
    try {
        await MONGOOSE.connect( process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    DB_CONECTION
}
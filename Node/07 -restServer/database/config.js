const MONGOOSE = require('mongoose');

const DB_CONNECTION = async() => {
    try {
        await MONGOOSE.connect( process.env.MONGODB_CNN, {
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
    DB_CONNECTION
}

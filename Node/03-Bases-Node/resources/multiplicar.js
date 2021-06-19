const FS = require('fs');
const COLORS = require('colors');

const CREAR_ARCHIVO_TABLA = async (base = 5, listar = false, hasta = 10) =>{
    try {  
        let salida, consola = '';
        for (let index = 1; index <= hasta; index++) {
            salida +=`${base} x ${index} = ${base*index}\n`;
            consola +=`${base} ${'x'.bgCyan} ${index} ${'='.bgYellow} ${base*index}\n`;
        }
        if (listar) {
            console.log('************************************'.bgMagenta);
            console.log(`  LA TABLA DEL  ${base}`.red);
            console.log('************************************'.bgMagenta);
            console.log(consola);
        }
        FS.writeFileSync(`./salida/tabla-${base}.txt`,salida);
        return `tabla-${base}.txt`;
    } catch (error) {
        throw(error);
    }
}

module.exports = {
    CREAR_ARCHIVO_TABLA
}

/*
 * FS.writeFile(`tabla-${base}.txt`,salida,(err)=>{
        if (err) throw err;
        console.log(`tabla-${base}.txt creada`);
    })
 */
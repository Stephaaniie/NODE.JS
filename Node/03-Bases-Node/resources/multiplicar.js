const FS = require('fs');

const CREAR_ARCHIVO_TABLA = async (base) =>{
    try {
        console.log('************************************');
        console.log(`  LA TABLA DEL  ${base}`);
        console.log('************************************');

        let salida = '';

        for (let index = 1; index <= 10; index++) {
            salida +=`${base} X ${index} = ${base*index}\n`;
        }
        console.log(salida);

        FS.writeFileSync(`tabla-${base}.txt`,salida);
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
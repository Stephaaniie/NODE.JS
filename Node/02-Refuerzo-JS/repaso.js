
/*  
    var, let, const
    No es recomendable la utilizacion de var porque var se crea en un ambito global 

let nombre = 'Wolverine';

if(true){
    let nombre = 'magneto';
    console.log(nombre);
}

console.log(nombre);
*/

/*
    * template y string

const NOMBRE = 'STEPHANIE';
const APELLIDO = 'CASTILLO';
const NOMBRE_COMPLETO = NOMBRE + ' ' + APELLIDO;
const TEMPLATE = `${NOMBRE} ${APELLIDO}`;

console.log(NOMBRE_COMPLETO);
console.log(TEMPLATE);
console.log(NOMBRE_COMPLETO === TEMPLATE);

const HTML = `
<h1>Hola</h1>
<p>Mundo</p>
`;
console.log(HTML);
*/

/*
    * desestructuracion


const DEADPOOL = {
    NOMBRE: 'Wade',
    APELLIDO:'Winston',
    PODER:'Regeneracion',
    getNombre(){
        return `${this.NOMBRE} ${this.APELLIDO} ${this.PODER}`;
    }
}

console.log(DEADPOOL.getNombre());

    const NOMBRE = DEADPOOL.nombre;
    const APELLIDO = DEADPOOL.APELLIDO;
    const PODER = DEADPOOL.PODER;
    CON DESESTRUCTURACION EVITAREMOS ESCRIBIR TANTO "CODIGO"


const {NOMBRE, APELLIDO, PODER} = DEADPOOL;
console.log(NOMBRE, APELLIDO, PODER);


const DEADPOOL = {
    NOMBRE: 'Wade',
    APELLIDO:'Winston',
    PODER:'Regeneracion',
    //EDAD: 50,
    getNombre(){
        return `${this.NOMBRE} ${this.APELLIDO} ${this.PODER}`;
    }
}
console.log(DEADPOOL.getNombre());
const {NOMBRE, APELLIDO, PODER, EDAD = 0} = DEADPOOL; 
console.log(NOMBRE, APELLIDO, PODER, EDAD);

function imprimeHeroe({NOMBRE, APELLIDO, PODER, EDAD = 0}){
    console.log(NOMBRE, APELLIDO, PODER, EDAD);
}

imprimeHeroe(DEADPOOL);

const HEROES = ['Superman','Batman','Deadpool'];

const H1 = HEROES[0];
const H2 = HEROES[1];
const H3 = HEROES[2];
console.log(H1,H2,H3);

const[H1, H2, H3] = HEROES;
console.log(H1,H2,H3);
const[ , , H3] = HEROES;
console.log(H3);

*/

/*
 * Funcion flechita 


function sumar(a, b){
    return(a + b);
}
console.log(sumar(5,5));


// Como transformamos la funcion clasica a una de flecha?

const sumar = (a,b) => {
    return (a + b);
}
*/
// unicamente para sentencias de una solo linea podemos hacer lo siguiente

const SUMAR = (a,b) => a + b;

const SALUDAR = () => 'Hola Stephy =) ';

console.log(SUMAR(5,5));
console.log(SALUDAR());
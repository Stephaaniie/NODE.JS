//ejemplo de estructuras no bloqueantes 
/*
* El orden de ejecucion es:
    Inincio de programa 
    Fin de programa 
    Segundo timeout
    Tercer timeout
    Primer timeout

*/

console.log('Inicio de programa');

setTimeout(()=>{
    console.log('Primer timeout');
},3000);

setTimeout(()=>{
    console.log('segundo timeout');
},0);

setTimeout(()=>{
    console.log('tercer timeout');
},0);

console.log('Fin de programa');
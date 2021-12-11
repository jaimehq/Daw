formulario={
    'nombre':{
       valido:true,
       mensaje:'prueba1'},
    'direccion':{
        valido:false,
        mensaje:'prueba2'
    }
}
if(formulario.every(e=> e.valido===true))
    console.log('algo true');
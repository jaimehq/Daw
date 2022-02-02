let peticion= fetch('https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=ofertas-de-empleo&q=&sort=fecha_de_publicacion&facet=provincia&facet=fecha_de_publicacion&facet=fuentecontenido')
peticion.then(correcta)
peticion.catch(incorrecta)
function correcta(respuesta){
    respuesta.json().then(function(respuestaJSON){
        debugger//registros dentro de respuestaJSON.records
        console.log(respuestaJSON)
    })
    
}
function incorrecta(error){
    console.log(error)
}
let input=document.getElementById('provincia')
let boton=document.getElementById('pedir')
boton.addEventListener('click',peticionFetch)
let tratado='';
function peticionFetch(){
    let peticion= fetch(`peticion.php?provincia=${input.value}`)
    peticion.then(correctaFetch)
    peticion.catch(incorrectaFetch)
}


function correctaFetch(resultado){
    debugger
    resultado.text().then(res2=>{
        debugger
        tratado=JSON.parse(res2)
        pintarMonumentos(tratado)
    })
}
function incorrectaFetch(error){
    console.log(error)
}
function pintarMonumentos(arrayMonumentos){
    let fragmento=document.createDocumentFragment();
    arrayMonumentos.forEach((monumento)=>{
        let parrafo=document.createElement('p')
        parrafo.innerText=`${monumento.nombre} esta en las coordenadas: ${monumento.coordenadas.latitud} ${monumento.coordenadas.longitud}`;
        fragmento.appendChild(parrafo)
    })
    document.body.appendChild(fragmento)
}
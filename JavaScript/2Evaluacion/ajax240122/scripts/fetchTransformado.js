

let varGlobal;
let peticion = fetch('./scripts/tratamientoXMLphp.php')
peticion.then(correctaPhp)
peticion.catch(incorrectaPhp)

function correctaPhp(respuesta) {
    respuesta.text().then(function (res2) {
        let varGlobal = JSON.parse(res2)
        filtrarJson(varGlobal)
    })
}
function incorrectaPhp(errores) {
    console.log(errores)
}
function filtrarJson(json) {    
    mostrarTitulos(json.channel.item)
}
function mostrarTitulos(array) {
    let frag = document.createDocumentFragment()
    array.forEach((tiutlar) => {
        let parrafo = document.createElement('p')
        parrafo.innerText = tiutlar.title
        frag.appendChild(parrafo)
    })
    document.body.appendChild(frag)
}
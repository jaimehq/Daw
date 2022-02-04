debugger
let peticion = fetch('./sources/catalogo.xml');
peticion.then(correcta);
peticion.catch(incorrecta);
let json = '';
let discos = [];
titulo.addEventListener('focusout', buscarTitulo)
artista.addEventListener('focusout', buscarTitulo)
document.addEventListener('keydown',calcularTotal)
function calcularTotal(evento){    
    if(evento.keyCode===13 && caja.firstElementChild!=null){
        let checkboxes=document.querySelectorAll('#discosCheck')
        let arraySeleccionados=[];
        debugger
        checkboxes.forEach((cb)=>{
            if(cb.checked===true){
                arraySeleccionados.push(cb.value)
            }
        })
        imprimirTotal(calcularMostrar(arraySeleccionados))
    }
}
function imprimirTotal(cantidad){
    let nodo=crearElemento('h1',['id'],['total'],`La cantidad total asciende a: ${cantidad}`)
    if(document.getElementById('total')){
        document.body.replaceChild(nodo,document.getElementById('total'))
    }else{
        document.body.appendChild(nodo)
    }
    
}
function calcularMostrar(arrayS){
    let total=0;
    arrayS.forEach((elemento)=>{
        debugger
        total+=Number(parseFloat(elemento))
        
    })
    return total.toFixed(2);
}
function correcta(respuesta) {    
    respuesta.text().then(function (prueba2) {
        let domParse = new window.DOMParser();
        json = domParse.parseFromString(prueba2, 'text/xml');
        //discos=json.getElementsByTagName('CD')
        discos = Object.values(json.getElementsByTagName('CD'))        
        cargarAnos(json);
    })
}
function incorrecta(error) {
    debugger
    json = error;
    
}
function cargarAnos(datosXML) {
    let anos = datosXML.getElementsByTagName('YEAR')
    let arrayAnos = [];
    Object.values(anos).forEach(ano => {
        if (!arrayAnos.includes(ano.firstChild.nodeValue)) {
            arrayAnos.push(ano.firstChild.nodeValue);
        }
    });
    crearSelect(arrayAnos)
    document.getElementById('anos').addEventListener('change', mostrarPorAnos)

}
function buscarTitulo(evento) {
    //primero declaramos el array de libros byscados y lo validamos mostrando en caso
    //de error el mensaje solicitado
    let arrayBuscados = [];
    if (caja.firstElementChild != null) {
        caja.firstElementChild.remove();
    }
    this.value = this.value.trim();    
    if (this.value === '') {
        caja.appendChild(crearElemento('p',[],[],"Se requiere algun caracter de busqueda que no esté en blanco"))
            
    } else {//si es valido recorremos los libros buscando los que tengan el parametro y lo metemos al array
        let campoBuscar=this.id.toUpperCase();
        discos.forEach((disco) => {
            if (disco.querySelector(campoBuscar).textContent.includes(this.value)) arrayBuscados.push(disco);
        });
        if (arrayBuscados.length != 0) {
            caja.appendChild(crearTablaDiscos(arrayBuscados));
            this.value = '';
        }//si se han encontrado alguno se crea la tabla
        else caja.appendChild(crearElemento('p',[],[],"Titulo no encontrado"));//en caso contrario mostramos el mensaje
    }
}



function mostrarPorAnos() {
    let valor = anos.value;
    let discosPaMostrar = '';
    if (caja.firstElementChild != null) {
        caja.firstElementChild.remove();
    }
    //si no hemos seleccionado la primera opcion que es la de seleccionar o la ultima que es todos filtraremos los libros que queremos mostrar y crearemos la tabla
    if (valor != "" && valor != "todos") {
        discosPaMostrar = discos.filter((disco) => {
            return disco.querySelector('YEAR').textContent == valor;
        });
        caja.appendChild(crearTablaDiscos(discosPaMostrar));
    } else if (valor === "todos") {//si elegimos todos pasamos a la funcion un array con todos los libros para que nos lo cree
        caja.appendChild(crearTablaDiscos(Object.values(discos)));
    }
}
function crearTablaDiscos(arrayDiscos) {
    let tabla = crearElemento('table', ['id'], ['tablaResultados'])
    let campos = ['TITULO', 'ARTISTA', 'PAIS', 'COMPANY', 'PRECIO', 'YEAR']
    let tablaFragment = document.createDocumentFragment();
    arrayDiscos.forEach((disco) => {
        let discoLinea = crearElemento('tr');
        let celdaCheckBox = crearElemento('td', ['style'], ['width:auto'])
        celdaCheckBox.appendChild(crearElemento('input', ['type', 'id', 'value'], ['checkbox', 'discosCheck',disco.querySelector('PRECIO').textContent]))
        discoLinea.appendChild(celdaCheckBox)
        campos.forEach((campo) => {
            if (campo === 'PRECIO')
                discoLinea.appendChild(crearElemento('td', [], [], `${disco.querySelector(campo).textContent}€`))
            else
                discoLinea.appendChild(crearElemento('td', [], [], disco.querySelector(campo).textContent))
        })
        tablaFragment.appendChild(discoLinea)
    })
    tabla.appendChild(tablaFragment)
    return tabla;
}

function crearSelect(arrayOpciones) {
    let selectFragment = document.createDocumentFragment();
    arrayOpciones.sort()
    arrayOpciones.forEach(element => {
        selectFragment.appendChild(crearElemento('option', ['value'], [element], element))
    });
    selectFragment.appendChild(crearElemento('option', ['value'], ['todos'], 'Todos los años'))
    anos.appendChild(selectFragment)
}
function crearElemento(tipo, arrayEstilos, arrayParametros, texto) {
    let nodo = document.createElement(tipo);
    if (arrayEstilos != null && arrayParametros != null) {
        arrayEstilos.forEach((estilo, indice) => {
            nodo.setAttribute(estilo, arrayParametros[indice])
        });
    }
    if (texto != null) {
        nodo.innerText = texto;
    }
    return nodo;
}
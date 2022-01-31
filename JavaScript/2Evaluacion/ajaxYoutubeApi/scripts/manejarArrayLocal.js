cargar.addEventListener('click',cargarDatos)
mostrar.addEventListener('click',manejarDatos)
let videos='';
let infoFiltrada=[];
function cargarDatos(){
    videos=JSON.parse(localStorage.getItem('videosSezar'));    
}
function manejarDatos(){
    filtrarDatos();
    //let tablaFragment=document.createDocumentFragment()    
    let contador=0;
    let tablaFragmentClon;
    infoFiltrada.forEach(video => {
        if(contador===0){
            tablaFragmentClon=document.createDocumentFragment()
            tablaFragmentClon.append(crearElemento('tr'),crearElemento('tr'),crearElemento('tr'))               
        }
        contador++;
        let titulo=crearElemento('td',[],[],video[0]);
        let link=crearElemento('td',[],[],video[1]);
        let tablaVideo=crearElemento('td')
        let visorVideo=crearElemento('iframe',['src'],[video[2]])
        let arrayCosas=[titulo,link,tablaVideo]
        tablaVideo.appendChild(visorVideo)
        let filas=Object.values(tablaFragmentClon.children)        
        filas.forEach((fila,indice) =>{
            fila.appendChild(arrayCosas[indice])
        })
        if(contador===4){            
            contador=0
            visor.appendChild(tablaFragmentClon)
        }
    });
}
function crearElemento(tipoNodo, arrayAtributos, arrayValores, texto) {
    let nodo = document.createElement(tipoNodo);
    if (arrayAtributos != undefined || arrayValores != undefined) {
      arrayAtributos.forEach((atributo, indice) => {
        nodo.setAttribute(atributo, arrayValores[indice]);
      });
    }
    if (texto != undefined) {
      nodo.innerText = texto;
    }
    return nodo;
  }
function filtrarDatos(){
    videos.forEach(video => {
        let datosVideo=[];
        datosVideo.push(video.snippet.title,`https://www.youtube.com/watch?v=${video.id.videoId}`,`https://www.youtube.com/embed/${video.id.videoId}`)
        infoFiltrada.push(datosVideo)
    });
}
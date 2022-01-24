let ajax= new XMLHttpRequest();
ajax.addEventListener('readystatechange', ttoDatos)
ajax.open('GET', 'sources/all.xml')
ajax.send();
function ttoDatos(){
    if (ajax.status===200 && ajax.readyState===4){
        let datos=ajax.responseXML;
        titlesPorParrafos(datos)
        console.log(datos)
    }
}
function titlesPorParrafos(datosAjax){
    let titulares=datosAjax.getElementsByTagName('title');
    let todosLosTitularesEnParrafos=document.createDocumentFragment();
    [...titulares].forEach(titular =>{
        let parrafo=document.createElement('p');
        debugger;
        parrafo.innerText=titular.textContent;
        todosLosTitularesEnParrafos.append(parrafo)
    })
    visor.append(todosLosTitularesEnParrafos);
}
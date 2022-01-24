let ajax= new XMLHttpRequest();
ajax.addEventListener('readystatechange', ttoDatos)
ajax.open('GET', 'sources/rusia.json')
ajax.send();
function ttoDatos(){    
    if (ajax.status===200 && ajax.readyState===4){        
        let datos=ajax.responseText;
        titularesPorParrafosJSON(datos)
        console.log(datos)
    }
}
function titularesPorParrafosJSON(datosFromAjax){    
    let datosJSON=JSON.parse(datosFromAjax);
    let todosLosTitularesEnParrafos=document.createDocumentFragment();
    let noticias=datosJSON.channel.item;
    noticias.forEach(noticia => {
        let parrafo=document.createElement('p');
        parrafo.innerText=noticia.title;
        todosLosTitularesEnParrafos.appendChild(parrafo)
        
    });
    visor.appendChild(todosLosTitularesEnParrafos);


}
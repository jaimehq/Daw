let ajax= new XMLHttpRequest();
ajax.addEventListener('readystatechange', ttoDatos)
ajax.open('GET', 'app.php')
ajax.send();
function ttoDatos(){    
    if (ajax.status===200 && ajax.readyState===4){        
        let datos=ajax.responseText;
        
        console.log(datos)
    }
}

/* 
function obtenerBares(datosFromAjax){    
    let datosJSON=JSON.parse(datosFromAjax);
    let todosLosBares=document.createDocumentFragment();
    let bares=datosJSON.records;
    bares.forEach(bar => {
        let parrafo=document.createElement('p');
        parrafo.innerText=bar.fields.nombre;
        todosLosBares.appendChild(parrafo)
        
    });
    visor.appendChild(todosLosBares);


} */
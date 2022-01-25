let ajax= new XMLHttpRequest();
ajax.addEventListener('readystatechange', ttoDatos)
ajax.open('GET', 'https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-turismo-de-castilla-y-leon&q=&rows=2090&facet=establecimiento&facet=provincia&facet=municipio&refine.provincia=Valladolid&refine.municipio=Valladolid&refine.establecimiento=Bares')
ajax.send();
function ttoDatos(){    
    if (ajax.status===200 && ajax.readyState===4){        
        let datos=ajax.responseText;
        obtenerBares(datos)
        console.log(datos)
    }
}


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


}
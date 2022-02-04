let input=document.getElementById('provincia')
let boton=document.getElementById('pedir')
let visor=document.getElementById('visor')

boton.addEventListener('click',function(){
    let httRequ= new XMLHttpRequest();
    let parrafo=document.createElement('p');
    parrafo.innerText=`Monumentos de la provincia de ${input.value}`;
    visor.appendChild(parrafo);
    httRequ.addEventListener('readystatechange', function(){
        if (httRequ.readyState===4 && httRequ.status===200){
            let datos=JSON.parse(httRequ.responseText);
            visualizarMonumentos(datos);
            console.log(datos);
        }
    })
    httRequ.open('GET', `peticion.php?provincia=${input.value}`);
    httRequ.send();
})

function visualizarMonumentos(monumentos){
    let frag=document.createDocumentFragment();
    monumentos.forEach(monumento => {
        let localidad=monumento.poblacion.provincia;
        let nombre=monumento.nombre;
        let parrafo= document.createElement('p');
        parrafo.innerText=`El monumento: ${nombre} esta en la provincia de:${localidad}`
        frag.appendChild(parrafo)
    });
    visor.appendChild(frag);
}
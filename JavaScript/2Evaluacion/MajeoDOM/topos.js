/* Ejercicio:
En un documento crea una etiqueta <img src=”imagen.png”>.
• Clona la imagen entre 5 y 10 veces de forma aleatoria.
• Coloca las imágenes en coordenadas aleatorias del área de representación del navegador.
• Dejar visibles las imágenes durante 3 segundos y luego ocúltalas todas.
• Al pulsar el ratón sobre una imagen mientras está visible, incrementar en uno el número de
aciertos y ocultas la imagen.

• Después de ocultarlas mostrar el porcentaje de aciertos en un alert. */
let vidas=5;
let nivel=1;
let corazones=[];
let corazon;
//creamos las vidas
//debugger
//c=corazon.cloneNode(false);
for(let i=0; i<vidas; i++){
    corazon=vida.firstElementChild.cloneNode()
    corazon.style.visibility='visible';
    vida.appendChild(corazon);
}
document.addEventListener('keypress',empezar)
function empezar(evento){
    if(evento.keyCode===13){
        let numero=5+(Math.random()*5)
        let divPantalla=document.createElement('div');
        //debugger
        for(let i=0; i<numero; i++){
            let topillo=pantalla.firstElementChild.cloneNode()
            topillo.style.visibility='visible';
            topillo.style.width='10%';
            topillo.style.left = `${Math.random() * (window.innerWidth-topillo.clientWidth)}px`;
            topillo.style.top = `${Math.random() * (window.innerHeight-topillo.clientHeight)}px`;
            pantalla.appendChild(topillo);
        }
        
        //debugger
    }
}
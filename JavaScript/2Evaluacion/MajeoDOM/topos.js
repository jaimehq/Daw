/* Ejercicio:
En un documento crea una etiqueta <img src=”imagen.png”>.
• Clona la imagen entre 5 y 10 veces de forma aleatoria.
• Coloca las imágenes en coordenadas aleatorias del área de representación del navegador.
• Dejar visibles las imágenes durante 3 segundos y luego ocúltalas todas.
• Al pulsar el ratón sobre una imagen mientras está visible, incrementar en uno el número de
aciertos y ocultas la imagen.

• Después de ocultarlas mostrar el porcentaje de aciertos en un alert. */
let vidas = 15;
let nivel = 1;
let corazones = [];
let topillos=[];
let corazonPadre=document.createElement('img');
corazonPadre.setAttribute('src','img/corazon.png')
topoPadre.setAttribute('style','position:absolute')
let toposVivos;
let topoPadre=document.createElement('img');
topoPadre.setAttribute('src','img/topo.png')
topoPadre.setAttribute('style','position:absolute')
//creamos las vidas
//debugger
//c=corazon.cloneNode(false);
for (let i = 0; i < vidas; i++) {
    corazon = corazonPadre.cloneNode()
    corazon.style.visibility = 'visible';
    vida.appendChild(corazon);
    corazones.push(corazon)
}
document.addEventListener('keypress', empezar)
function empezar(evento) {
    let texto = document.querySelector('h1');
    pantalla.removeChild(texto);
    if (evento.keyCode === 13) {
        let numero = (4 + nivel) + (Math.floor(Math.random() * (4 + nivel)))
        //debugger
        for (let i = 0; i < numero; i++) {
            let topillo = topoPadre.cloneNode()
            let tamano = 150
            topillo.style.width = `${tamano}px`;
            //debugger
            topillo.style.left = `${Math.random() * (window.innerWidth - tamano)}px`;
            topillo.style.top = `${Math.random() * (window.innerHeight - tamano)}px`;
            //debugger
            pantalla.appendChild(topillo);            
        }
        let seg = 0
        temporizador = setInterval(function () {
            seg++;
            if (seg >= 3) {
                let toposCreados = [...pantalla.children]
                toposVivos = toposCreados.length;
                toposCreados.forEach(topo => {
                    topo.parentElement.removeChild(topo);
                });
                cambioNivel();
                clearInterval(temporizador);
            }
        }, 1000)
    }
}
function cambioNivel() {
    vidas = vidas - toposVivos;
    let h1 = document.createElement("h1");
    if (vidas <= 0){
        h1.innerText = `Estas Muerto pulsa Intro para comenzar`
        nivel=1;
        vidas=5;
    }else{
        nivel++;
        h1.innerText = `Estas en el nivel ${nivel} pulsa intro para continuar`
    }
    pantalla.appendChild(h1);
    corazones.forEach(cor => {
        cor.parentElement.removeChild(cor)
    });

    for (let i = 0; i < vidas; i++) {
        corazon = vida.firstElementChild.cloneNode()
        corazon.style.visibility = 'visible';
        vida.appendChild(corazon);
    }
}

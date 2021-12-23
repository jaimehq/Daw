/* Ejercicio:
En un documento crea una etiqueta <img src=”imagen.png”>.
• Clona la imagen entre 5 y 10 veces de forma aleatoria.
• Coloca las imágenes en coordenadas aleatorias del área de representación del navegador.
• Dejar visibles las imágenes durante 3 segundos y luego ocúltalas todas.
• Al pulsar el ratón sobre una imagen mientras está visible, incrementar en uno el número de
aciertos y ocultas la imagen.

• Después de ocultarlas mostrar el porcentaje de aciertos en un alert. */
let primeraPartida=true;
let vidas = 15;
let nivel = 1;
let juegoPausado = true;
let puntos = 0;
let corazones = [];
let corazonPadre = document.createElement('img');
corazonPadre.setAttribute('src', 'img/corazon.png')
corazonPadre.setAttribute('style', 'position:relative; width:5%;')
let toposVivos;
let topoPadre = document.createElement('img');
topoPadre.setAttribute('src', 'img/topo.png')
topoPadre.setAttribute('style', 'position:absolute;border-radius:100%')
function crearCorazones() {
    for (let i = 0; i < vidas; i++) {
        corazon = corazonPadre.cloneNode()
        corazon.style.visibility = 'visible';
        vida.appendChild(corazon);
        corazones.push(corazon)
    }   
}
crearCorazones();
document.addEventListener('keypress', empezar);
document.addEventListener('mousedown', reventarCosas)
document.addEventListener('mousedown', empezarClick)
function reventarCosas(evento) {
    let paMatar = evento.target
    let reg=/\S+topo.png$/
    if (reg.test(paMatar.src)) {
        paMatar.parentElement.removeChild(paMatar)
        puntos++;
    }

}
function empezarClick() {
    if (juegoPausado === true) {
        let falsoIntro = {
            keyCode: 13
        }
        empezar(falsoIntro)
    }
}
function empezar(evento) {
    juegoPausado = false;
    if(primeraPartida===false && nivel===1 && vidas===15){
        crearCorazones();
    }
    let texto = document.querySelector('h1');
    pantalla.removeChild(texto);
    if (evento.keyCode === 13) {
        let numero =nivel+(Math.floor(Math.random() * nivel))
        let pantalla2 = document.createElement('div')
        for (let i = 0; i < numero; i++) {
            let topillo = topoPadre.cloneNode()
            let tamano = 150 - nivel*3;
            topillo.style.width = `${tamano}px`;
            topillo.style.left = `${Math.random() * (window.innerWidth - tamano)}px`;
            topillo.style.top = `${Math.random() * (window.innerHeight - tamano)}px`;
            pantalla2.appendChild(topillo);

        }
        pantalla.parentElement.replaceChild(pantalla2, pantalla)
        pantalla = pantalla2;
        let seg = 0
        let temporizador = setInterval(function () {
            seg++;
            if (seg >= 3) {
                let toposCreados = [...pantalla.children]
                toposVivos = toposCreados.length;
                toposCreados.forEach(topo => {
                    topo.parentElement.removeChild(topo);
                });
                cambioNivel();
                //debugger
                clearInterval(temporizador);
            }
        }, (1000+(nivel*20)))
    }
}
function cambioNivel() {
    
    vidas = vidas - toposVivos;
    corazones.forEach(cor => {
        //debugger
        cor.parentElement.removeChild(cor)
    });
    corazones = [];
    let h1 = document.createElement("h1");
    h1.setAttribute('style', 'border-radius:30px;background-color:white')    
    crearCorazones();
    if (vidas <= 0) {
        h1.innerText = `Estas Muerto, has matado ${puntos}topillos de la muerte\n Pulsa Intro o clica en la pantalla para comenzar`
        nivel = 1;
        vidas = 15;
        puntos=0;
        primeraPartida=false;
    } else {
        nivel++;
        h1.innerText = `Estas en el nivel ${nivel} pulsa intro o clica la pantalla para continuar`
    }
    pantalla.appendChild(h1);
    let pausa=2;
    let intervaloPausa = setInterval(function () {
        pausa--;
        if (pausa <= 0) {
            juegoPausado=true
            clearInterval(intervaloPausa);
        }
    }, 500)

    }





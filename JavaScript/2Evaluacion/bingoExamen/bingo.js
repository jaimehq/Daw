class Jugador {
    constructor(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = parseInt(saldo);
    }
    anadirSaldo(saldoAnadir) {
        this.saldo = parseInt(this.saldo) + parseInt(saldoAnadir);
    }
    restarSaldo(saldoRestar) {
        this.saldo = parseInt(this.saldo) - parseInt(saldoRestar);
    }
}
let jugador;
let formularioInicial;
let arrayGanadores = [];
let cartonesGanadores=0
nombre.addEventListener('input', comprobarNick)

function comprobarNick() {
    let nick = nombre.value;
    jugador = JSON.parse(localStorage.getItem(nick));
    if (jugador != null) {
        saldo.value = jugador.saldo;
        jugador = new Jugador(jugador.nombre, jugador.saldo)
    } else {
        jugador = new Jugador(nick, 0)
        saldo.value = 0;
    }
    aceptarTerminos.disabled = false
    aceptarTerminos.addEventListener('change', cambioTerminos)
}
function cambioTerminos() {
    if (aceptarTerminos.checked) {
        nombre.setAttribute('disabled', true)
        localStorage.setItem(jugador.nombre, JSON.stringify(jugador))
        saldoAnadir.disabled = false;
        anadirSaldoBtn.disabled = false;
        anadirSaldoBtn.addEventListener('click', anadirSaldoF)
        comprobarSaldo()
    }
    else {
        empezarBtn.disabled = true
        saldoAnadir.disabled = true;
        anadirSaldoBtn.disabled = true;
        nombre.disabled = false
        anadirSaldoBtn.removeEventListener('click', anadirSaldoF)
    }
}
function anadirSaldoF() {
    jugador.anadirSaldo(saldoAnadir.value);
    saldo.value = jugador.saldo;
    comprobarSaldo();
    saldoAnadir.value = 0;
    localStorage.setItem(jugador.nombre, JSON.stringify(jugador))
}
function comprobarSaldo() {
    if (jugador.saldo >= 1) {
        empezarBtn.disabled = false
        empezarBtn.addEventListener('click', seleccionCartones)
    }
    else {
        empezarBtn.disabled = true;
        empezarBtn.removeEventListener('click', seleccionCartones)
    }
}
function seleccionCartones() {

    let fieldsetViejo = document.getElementsByTagName('fieldset')[0]
    let fieldsetNuevo = fieldsetViejo.cloneNode(true);
    fieldsetNuevo.firstElementChild.innerText = 'Elige el numero de cartones que deseas jugar:'
    fieldsetNuevo.firstElementChild.nextElementSibling.remove();
    fieldsetNuevo.lastElementChild.id = 'comprarBtn';
    fieldsetNuevo.lastElementChild.innerText = 'Comprar';
    let select = document.createElement('select');
    select.setAttribute('id', 'numeroCartones')
    for (let i = 0; i <= 5; i++) {
        let opcion = document.createElement('option');
        opcion.setAttribute('value', i + 1);
        opcion.innerText = i + 1;
        select.appendChild(opcion)
    }
    //debugger
    fieldsetNuevo.insertBefore(select, fieldsetNuevo.firstChild)
    fieldsetViejo.parentElement.appendChild(fieldsetNuevo)
    for (let i = 0; i < 2; i++) {
        fieldsetViejo.lastElementChild.remove();
    }
    fieldsetViejo.lastElementChild.lastElementChild.lastElementChild.remove();
    comprarBtn.addEventListener('click', empezarBingo)
}
function empezarBingo() {
    crearPantalla()
    let arrayNumerosPadre = [];
    let divCartones = document.createElement('div')
    divCartones.setAttribute('id', 'cartonesDiv')
    let btnBingo = document.createElement('button')
    btnBingo.setAttribute('type', 'button')
    let btnLinea = btnBingo.cloneNode();
    btnBingo.setAttribute('id', 'bingoBtn');
    btnLinea.setAttribute('id', 'lineaBtn')
    btnBingo.innerText = 'Cantar Bingo';
    btnLinea.innerText = "Cantar Linea";
    let salto = document.createElement('hr')
    divCartones.append(btnBingo, btnLinea, salto);
    for (let i = 0; i < 100; i++) {
        arrayNumerosPadre.push(i)
    }
    jugador.restarSaldo(numeroCartones.value)
    localStorage.setItem(jugador.nombre, JSON.stringify(jugador))
    saldo.value=jugador.saldo;
    for (let i = 0; i < numeroCartones.value; i++) {
        let copiaArray = arrayNumerosPadre.slice()

        let carton = generarCarton(copiaArray);
        carton.setAttribute('id', `carton${i}`)
        divCartones.appendChild(carton)
    }
    document.body.firstElementChild.lastElementChild.remove()
    let formulario=document.forms[0];
    for(elemento of formulario){
        elemento.setAttribute('disabled',true)
    }

    document.body.appendChild(divCartones)
    let intervalo = setInterval(function () {
        if (arrayNumerosPadre.length === 0 || cartonesGanadores>0) {
            clearInterval(intervalo)
        }
        else {
            let numerito = generarNumero(arrayNumerosPadre);
            pintarSacado(numerito);
            arrayGanadores.push(numerito)
            numeroPaMostrar.innerText = numerito
        }
    }, 3000)
    cartonesDiv.addEventListener('click', marcarNumero)
    bingoBtn.addEventListener('click', cantarBingo);
    lineaBtn.addEventListener('click', cantarLinea);
}
function crearPantalla() {
    let contenedor = document.createElement('div')
    let div = document.createElement('div')
    let tabla = document.createElement('table');
    tabla.setAttribute('class', 'tablas')
    for (let i = 0; i < 10; i++) {
        let fila = document.createElement('tr')
        for (let j = 0; j < 10; j++) {
            let columna = document.createElement('td')
            columna.innerText = 10 * i + j
            fila.appendChild(columna)
        }
        tabla.appendChild(fila)
    }
    //creamos un div para mostrar el numero que haya salido y que sea mas
    //sencillo marcar los numeros
    let div2 = document.createElement('div')
    let titulo = document.createElement('h3')
    titulo.innerText = 'El numero sacado es:'
    let numero = document.createElement('h1')
    numero.setAttribute('id', 'numeroPaMostrar')
    div2.append(titulo, numero)
    div.appendChild(tabla)
    contenedor.append(div, div2)
    document.body.appendChild(contenedor)
}
function generarNumero(arrayNumeros) {
    let posicionAleatoria = Math.floor(Math.random() * arrayNumeros.length)

    let numeroSacado = arrayNumeros[posicionAleatoria]
    arrayNumeros.splice(posicionAleatoria, 1)
    return numeroSacado
}
function pintarSacado(numero) {
    let tabla = document.getElementsByClassName('tablas')[0]
    let celdas = tabla.getElementsByTagName('td')
    let arrayCeldas = Object.values(celdas)
    let celdaSeleccionada = arrayCeldas.find((celda) =>
        celda.innerText == numero
    )
    celdaSeleccionada.setAttribute('class', 'sacado')
}
function generarCarton(arrayNumeros) {
    let tabla = document.createElement('table');
    tabla.setAttribute('class', 'cartones')
    let arrayNumerosCarton=[];
    for (let i=0; i <15; i++){
        arrayNumerosCarton.push(generarNumero(arrayNumeros))
    }
    let z=0;
    arrayNumerosCarton.sort(function(a,b){return a-b})
    for (let i = 0; i < 3; i++) {
        let fila = document.createElement('tr')
        for (let j = 0; j < 5; j++) {
            let columna = document.createElement('td')
            columna.innerText = arrayNumerosCarton[z]
            z++
            fila.appendChild(columna)
        }
        tabla.appendChild(fila)
    }

    return tabla;
}
function marcarNumero(evento) {
    //debugger
    if (evento.target.nodeName == 'TD') {
        if(evento.target.className!='marcado')
            evento.target.setAttribute('class', 'marcado')
        else{
            debugger
            evento.target.className="";}
    }
}
function cantarLinea() {
    let correcta = false;
    let cartones = document.getElementsByClassName('cartones')
    let arrayCartones = Object.values(cartones)
    arrayCartones.forEach((carton) => {
        let lineas = carton.children
        arrayLineas = Object.values(lineas)
        for (linea of arrayLineas) {
            let celdas = linea.children
            let valoresFila = []
            for (celda of celdas) {
                valoresFila.push(celda.innerText)
            }


            lineaBool = valoresFila.every((celda) => {
                return arrayGanadores.includes(parseInt(celda))

            })
            if (lineaBool === true) {
                correcta = true
            }
        }

    })
    if (correcta === true) {
        ganarLinea()
    }
}
function ganarLinea() {
    lineaBtn.setAttribute('disabled', true)
    let textoLinea=document.createElement('p')
    textoLinea.innerText='Ya se ha cantado linea'
    numeroPaMostrar.parentElement.appendChild(textoLinea)
    jugador.anadirSaldo(1)
    saldo.value=jugador.saldo;
    localStorage.setItem(jugador.nombre, JSON.stringify(jugador))
}
function cantarBingo() {
    let correcta = false;
    let cartones = document.getElementsByClassName('cartones')
    let arrayCartones = Object.values(cartones)
    arrayCartones.forEach((carton) => {
        let cartonBool=false
        let valoresCarton = []
        let lineas = carton.children
        arrayLineas = Object.values(lineas)
        for (linea of arrayLineas) {
            let celdas = linea.children            
            for (celda of celdas) {
                valoresCarton.push(celda.innerText)
            }
            cartonBool = valoresCarton.every((celda) => {
                return arrayGanadores.includes(parseInt(celda))

            })
            
        }
        if (cartonBool === true) { 
            carton.setAttribute('style','background-color:greenyellow')               
            correcta = true
            cartonesGanadores++
        }

    })
    if(correcta==true){
        ganarBingo()
    }
}
function ganarBingo(){
    let plantillaFormulario=document.getElementById('formularioGanador').content
    document.body.replaceChild(plantillaFormulario,document.forms[0])
    premio.value=cartonesGanadores*2
}
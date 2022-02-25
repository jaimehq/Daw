/**
 * 
 */
class Jugador {
    /**
     * 
     * @param {int} id 
     * @param {string} nombre
     * posicion: tendra la posicion que ocupa la ficha del jugador
     * color: indicara el color que representa al jugador
     * ficha: sera un clon de un div con forma de ficha con la que el jugador jugara
     * turnosSinTirar: nos gestionara las casillas en las que pierdes turnos para saber cuando volver a jugar
     * baresRecorridos sera un array donde se iran introduciendo todos los bares que representen las casillas 
     */
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = 0;
        this.color = '';
        this.ficha = '';
        this.turnosSinTirar = 0;
        this.baresRecorridos = []
    }
    /**
     * 
     * @param {int} numTurnos 
     * 
     * añadira el numero de turnos que el jugador no podra jugar
     */
    añadirTurnosSinTirar(numTurnos) {
        this.turnosSinTirar += numTurnos;
    }
    /**
     * 
     * @param {int} casillas 
     * gestionara el avanze del jugador sumando a su posicion el numero sacado por los dados
     * tambien gestionará la parte visual para que pase tambien por las esquinas
     */
    avanzar(casillas) {
        let nueva = this.posicion + casillas;
        switch (true) {
            case (this.posicion < 9 && nueva > 9):
                this.irA(9)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 19 && nueva > 19):
                this.irA(19)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 28 && nueva > 28):
                this.irA(28)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 37 && nueva > 37):
                this.irA(37)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 44 && nueva > 44):
                this.irA(44)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 52 && nueva > 52):
                this.irA(52)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 58 && nueva > 58):
                this.irA(58)
                this.mover()
                this.irA(nueva)
                break
            case (this.posicion < 62 && nueva > 62):
                this.irA(62)
                this.mover()
                this.irA(nueva)
                break
            default:
                this.posicion = nueva;
                break
        }
    }
    /**
     * 
     * @param {int} casilla 
     * Gestionara el avance del jugador de forma directa, que ira a la casilla introducida por parametro
     * tambien gestionara las esquinas para que el efecto visual sea mejor
     */
    irA(casilla) {
        switch (true) {
            case (this.posicion < 9 && casilla > 9):
                this.irA(9)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 19 && casilla > 19):
                this.irA(19)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 28 && casilla > 28):
                this.irA(28)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 37 && casilla > 37):
                this.irA(37)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 44 && casilla > 44):
                this.irA(44)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 52 && casilla > 52):
                this.irA(52)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 58 && casilla > 58):
                this.irA(58)
                this.mover()
                this.irA(casilla)
                break
            case (this.posicion < 62 && casilla > 62):
                this.irA(62)
                this.mover()
                this.irA(casilla)
                break
            default:
                this.posicion = casilla;
                break
        }
    }
    /**
     * 
     * @param {string} color 
     * introduce el color representativo del jugador
     */
    asignarColor(color) {
        this.color = color
    }
    /**
     * 
     * @param {objetoDOM} nodo 
     * introduce en el jugador para manejarlo mas comodamente
     * la ficha que se ira moviendo durante toda la partida
     */
    meterFicha(nodo) {
        this.ficha = nodo
    }
    /**
     * La guncion mover dirigira por animaciones la ficha del jugador a la casilla en la que deba estar
     */
    mover() {
        if (this.posicion < 63) {
            let posicionDiv = $(`#${this.posicion}`).offset()
            $(this.ficha).delay(500).animate({ "top": posicionDiv.top + 15, "left": posicionDiv.left + 15 + 10 * turno }, 1500)
            $(`#jugador${turno}`).find('#cas').html(`Casilla: ${arrayJugadores[turno].posicion}`)
            $(`#jugador${turno}`).removeClass('turno');
        } else if (this.posicion == 63) {
            $(this.ficha).delay(500).animate({ "top": '50%', "left": '50%' }, 1500)
            $(`#jugador${turno}`).find('#cas').html(`Casilla: ${arrayJugadores[turno].posicion}`)
            $(`#jugador${turno}`).removeClass('turno');
        }
    }
}
//declaramos las variables globales que usaremos
/**
 * baresOrdenaditos sera el array de la informacion obtenida de la junta ordenados por la cercania a la
 * geolocalizacion del navegador
 * turno nos indicara el indice del array de jugadores para tener localizado el jugador al que pertenece el turno
 * arrayJugadores tendra los objetos jugadores desde el que gestionaremos la partida
 * dados tendra un json que hemos creado para tener las rutas de las imagenes ademas del valor de cada imagen, que se obtendra de forma asincrona
 */
let baresOrdenaditos = [];
let turno = 0;
let arrayJugadores = [];
let dados;

/**
 * esta funcion obtendra el numero de jugadores que van a jugar la partida, creara un menu para introducir sus nombres y activara
 * las escuchas de varios eventos
 */
function asignarNumeroJugadores() {
    let numeroJugadores = 0;
    let plantilla
    numeroJugadores = $('#jugadores').val();
    if (numeroJugadores > 0 && numeroJugadores <= 4) {
        $('#formJugadores').remove();
        plantilla = $('<form/>', { 'id': 'formAgregarJugador' })
        for (i = 0; i < numeroJugadores; i++) {
            let input = $('<input/>', { 'type': 'text', 'id': `jugador${i}`, 'class': 'nombreJugador', 'required': 'true' })
            let label = $('<label/>')
            $(label).text('Nombre del jugador: ').append(input)
            $(plantilla).append(label)
        }
        $(plantilla).append($('<br/>')).append($('<button/>', { 'id': `agregar`, text: 'AGREGAR' }))
        $('#controles').append(plantilla) 
        $('.nombreJugador').on('input',glichMarcos)
        $('#agregar').on('click', agregarJugadores);
    }
}
/**
 * a peticion del compañero he tenido que añadir un glich que cuando se escriba su nombre muestre una regla mas en la pantalla donde aparecen las reglas
 */
function glichMarcos(){
    if(this.value==='Marcos' || this.value==='marcos'){
        $('#reglasUl').append($('<li/>',{text : 'Las mujeres jugadoras tendran que hacer lo que diga Marcos que pa eso está, aunque sea informatico'}))
    }
}
/**
 * esta funcion cogerá los nombres introducidos en las input y creara los jugadores introduciendolos en un array
 * ademas si todo es valido creara el tablero y pedira la localizacion del dispositivo que usa el navegador para obtener los datos
 * de la junta en funcion de las coordenadas
 */
function agregarJugadores() {
    let nombre = '';
    let valido = true
    $.each($('.nombreJugador'), function (indice, input) {
        nombre = $(input).val().trim()
        if (nombre != '') {
            arrayJugadores.push(new Jugador(indice, nombre))
        } else {
            valido = false
        }
    });
    if (valido) {
        navigator.geolocation.getCurrentPosition(function (position) {
            obtenetJson(position.coords.latitude, position.coords.longitude);
        });
        comenzarTablero();
    }
}
/**
 * su funcion es introducir en cada casilla que no sea especial los bares que se han obtenido de la junta
 * ademas crea un evento hover para que esas casillas muestren la informacion mas detallada en un visor en la pantalla cuando
 * se pase el puntero por encima y se elimine cuando sale
 */
function introducirBares() {
    let casillasSimples = $('.casilla').filter(':not(.oca)').filter(':not(.pozo)').filter(':not(.posada)').filter(':not(.puente)').filter(':not(.dados)').filter(':not(.muerte)');
    $.each(casillasSimples, function (indice, cas) {
        let divNombreBar = $('<div/>').text(baresOrdenaditos[indice].nombre).addClass('nombreBar')
        $(cas).append(divNombreBar)
    });
    $('div.nombreBar').hover(function () {
        let barSeleccionado = baresOrdenaditos.filter((bar) => {
            return bar.nombre == $(this).filter('.nombreBar').text();
        });
        imprimirInfoBar(barSeleccionado[0])
    }, function () {
        $('.visor').html('<h2>Pon el raton sobre la casilla para mas informacion sobre el bar</h2>')
    }
    );
}
/**
 * 
 * @param {objeto bar} bar 
 * imprime en el visor la informacion obtenida de un bar
 */
function imprimirInfoBar(bar) {
    $('.visor').html(`Nombre:<br>${bar.nombre}<br>Direccion:<br>${bar.direccion}<br>Poblacion:<br>${bar.localidad}<br>Telefono:${bar.telefono_1}<br>Email:<br>${bar.email}`)
}
/**
 * gestiona la transicion cuando agrega los jugadores para eliminar las partes que no necesitamos
 * y crear las nuevas como son el tablero y el menú de jugadores
 */
function comenzarTablero() {
    $('#formAgregarJugador').remove()
    $('#controles').append($(`<img/>`, { 'id': 'dadoImg', 'src': 'recursos/oca.png' })).append($('<button/>', { 'type': 'button', 'id': `lanzar`, text: 'LANZAR' }))
    $('#lanzar').one('click', lanzarDado);
    $('#reglas').fadeOut(2000);
    $('#ramon').remove();
    crearTablero();
    crearMenuJugadores();
}
/**
 * lanza el dado mostrando de manera aleatoria las imagenes de distintos numeros y remplaza los elementos para que podamos parar
 * el dado y lo deja preparado para volver a lanzarlo tambien llama a la funcion moverFichaJugador que gestiona el movimiento del jugador que toque
 */
function lanzarDado() {
    $('#lanzar').replaceWith($('<button/>', { 'type': 'button', 'id': `parar`, text: 'PARAR' }));
    let animacionDado = setInterval(function () {
        let numAleatorio = Math.floor(Math.random() * 10)
        $('#dadoImg').attr('src', dados[numAleatorio].url).attr('alt', numAleatorio + 1)
    }, 100)
    $('#parar').one('click', function () {
        $('#parar').replaceWith($('<button/>', { 'type': 'button', 'id': `lanzar`, text: 'LANZAR' }));
        $('#lanzar').one('click', lanzarDado);
        clearInterval(animacionDado)
        moverFichaJugador()
    });
}
/**
 * crea el tablero del juego, gestiona la posicion de cada div casilla en funcion a una regilla propuesta en grid
 * una vez colocadas las casillas llama a una funcion para colocar las casillas especiales asignandolas las clases correspondientes
 */
function crearTablero() {
    let fragmentoDivs = $(document.createDocumentFragment())
    let visor;
    let numeroCasillas = 63
    let gestorX = 1;
    let gestorXf = 2;
    let gestorY = 20;
    let gestorYf = 21;
    //primero creamos todos los divs que vamos a usar
    for (let i = 0; i < numeroCasillas + 1; i++) {
        fragmentoDivs.append($('<div/>', { 'class': 'casilla', 'id': i, text: i }))
    }
    //luego los colocamos en funcion de el numero de div nos iremos moviendo por la regilla
    $.each(fragmentoDivs.children(), function (indice, casilla) {
        if (indice == 29) gestorX++
        switch (true) {
            case (indice >= 1 && indice < 10):
                gestorX = gestorXf
                gestorXf += 2
                break
            case (indice >= 10 && indice < 19):
                gestorYf = gestorY
                gestorY -= 2
                break
            case (indice == 19):
                gestorYf = gestorY
                gestorY--
                break
            case (indice >= 20 && indice < 29):
                gestorXf = gestorX
                gestorX -= 2
                break
            case (indice == 37):
                gestorY = gestorYf
                gestorYf += 1
                break
            case (indice >= 29 && indice < 37):
                gestorY = gestorYf
                gestorYf += 2
                break
            case (indice == 41):
                gestorX = gestorXf
                gestorXf += 3
                break
            case (indice >= 38 && indice < 45):
                gestorX = gestorXf
                gestorXf += 2
                break
            case (indice == 52):
                gestorYf = gestorY
                gestorY -= 1
                break
            case (indice >= 45 && indice < 52):
                gestorYf = gestorY
                gestorY -= 2
                break
            case (indice >= 53 && indice < 59):
                gestorXf = gestorX
                gestorX -= 2
                break
            case (indice >= 59 && indice < 62):
                gestorY = gestorYf
                gestorYf += 2
                break
            case (indice === 62):
                gestorY = gestorYf
                gestorYf += 2
                gestorXf += 2
                break
        }
        if (indice != 63)
            $(casilla).css('grid-area', `${gestorY}/${gestorX}/${gestorYf}/${gestorXf}`);
            //y si es la ultima casilla la colocamos de fora manual porque tendra otras dimensiones
        else
            $(casilla).css('grid-area', `5/6/17/15`);
    });
    //tambien creamos un visor para mostrar la informacion de los vares
    visor = $('<div/>', { 'class': 'visor', html: '<h4>Pasa el raton por la casilla para mas informacion sobre el bar</h4>' })
    fragmentoDivs.append(visor)
    $('#tablero').append(fragmentoDivs)
    //asignamos con esto las casillas especiales
    generarCasillasEspeciales();
}
/**
 * asigna las clases especificas a las casillas que no son normales
 */
function generarCasillasEspeciales() {
    let ocas = [1, 5, 9, 14, 18, 23, 27, 32, 36, 41, 45, 50, 54, 59, 63]
    //pozo:31
    //posada:19
    //puente:6,12
    //dados:26,53
    //muerte:58
    $.each(ocas, function (indice, valor) {
        $('.casilla').eq(valor).addClass('oca')

    });
    $('.casilla').eq(31).addClass('pozo')
    $('.casilla').eq(19).addClass('posada')
    $('.casilla').eq(6).addClass('puente').end().eq(12).addClass('puente')
    $('.casilla').eq(26).addClass('dados').end().eq(53).addClass('dados')
    $('.casilla').eq(58).addClass('muerte')
}
/**
 * crea el menu de los jugadores y llama a una animacion para que las fichas vayan a la casilla de salida
 */
function crearMenuJugadores() {
    let colores = ['red', 'yellow', 'green', 'blue']
    let fragmento = $(document.createDocumentFragment())
    $.each(arrayJugadores, function (indice, jugador) {
        let div = $('<div/>', { 'id': `jugador${indice}` }).addClass('jug').html(`<p>Nombre: ${jugador.nombre}</p><p id='cas'>Casilla: ${jugador.posicion}</p>`).append($('<div/>', { 'class': 'ficha' }));
        div.find('.ficha').css({ 'background': colores[indice], 'grid-area': '1/2/3/3' })
        jugador.asignarColor(colores[indice])
        jugador.meterFicha(div.find('.ficha').clone()[0])
        if (indice === 0) div.addClass('turno')
        fragmento.append(div)
    });

    $('#jugadoresMenu').append(fragmento);
    llevarA0lasFichas()
}
/**
 * Esta funcion lleva las fichas de cada jugador desde su menú hasta la casilla de salida de forma grafica
 */
function llevarA0lasFichas() {
    let posVieja = []
    let posicionDiv = $(`#0`).offset()
    $.each($('.ficha'), function (i, ficha) {
        posVieja.push($(ficha).offset())
    });
    $.each(arrayJugadores, function (indice, jugador) {
        $(jugador.ficha).css({ 'position': 'absolute' })
        $('#tablero').append(jugador.ficha)
        $(jugador.ficha).css({ "top": posVieja[indice].top, "left": posVieja[indice].left })

        $(jugador.ficha).delay(1000).animate({ "top": posVieja[indice].top + 15, "left": posicionDiv.left + 15 + 10 * indice }, 1500)
            .delay(500).animate({ "top": posicionDiv.top + 15, "left": posicionDiv.left + 15 + 10 * indice }, 2000)
    });


}
/**
 * gestiona los turnos y los movimientos de los jugadores ademas de agregar los bares recorridos y verificar si tienen turnos sin tirar
 */
function moverFichaJugador() {
    let valorDado = $('#dadoImg').attr('alt')
    arrayJugadores[turno].avanzar(Number(valorDado))
    arrayJugadores[turno].mover();

    if (!comprobarCasillasEspeciales(arrayJugadores[turno])) {
        let casilla = arrayJugadores[turno].posicion
        let nombreBarCasilla = $(`#${casilla}`).find('.nombreBar').text();
        arrayJugadores[turno].baresRecorridos.push(nombreBarCasilla)
    }

    if (turno < arrayJugadores.length - 1)
        turno++
    else {
        turno = 0
    }
    if (arrayJugadores[turno].turnosSinTirar > 0) {
        arrayJugadores[turno].turnosSinTirar--
        if (turno < arrayJugadores.length - 1)
            turno++
        else {
            turno = 0
        }
    }
    $(`#jugador${turno}`).addClass('turno');
}
/**
 * 
 * @param {objeto jugador} jugador 
 * @returns bool devolvera true si existe una casilla especial en la posicion que el jugador se encuentre
 * en caso de que el jugador se encuentre en una de esas casillas realizara lo que las reglas nos explican
 */
function comprobarCasillasEspeciales(jugador) {
    //con un switch comprobaremos que si se encuentra en una casilla especial
    //en caso de que sea una casilla especial se devolvera true para que no haga el sistema normal
    ///revisamos ocas
    let ultimo, posicionDeMas;
    let siHay = false;
    let ocas = [63, 59, 54, 50, 45, 41, 36, 32, 27, 23, 18, 14, 9, 5, 1]
    if (ocas.includes(jugador.posicion)) {
        siHay = true;
        $.each(ocas, function (indice, valor) {
            if (jugador.posicion != 63) {
                if (jugador.posicion == valor) {
                    jugador.irA(ocas[indice - 1])
                    jugador.mover()
                    turno--
                }
            }
        });
    }

    switch (true) {
        //revisamos puentes
        case (jugador.posicion == 6):
            siHay = true;
            jugador.irA(12)
            jugador.mover()
            jugador.avanzar(1)
            jugador.mover()
            break
        case (jugador.posicion == 12):
            siHay = true;
            jugador.irA(6)
            jugador.mover()
            jugador.avanzar(1)
            jugador.mover()
            break
        //revisamos dados
        case (jugador.posicion == 26):
            siHay = true;
            jugador.irA(53)
            jugador.mover()
            turno--
            break
        case (jugador.posicion == 53):
            siHay = true;
            jugador.irA(26)
            jugador.mover()
            turno--
            break
        //revisamos la posada
        case (jugador.posicion == 19):
            siHay = true;
            jugador.añadirTurnosSinTirar(2)
            break
        //revisamos el pozo
        case (jugador.posicion == 31):
            siHay = true;
            jugador.añadirTurnosSinTirar(2)
            break
        //revisamos la casilla de la muerte para que vaya a la casilla dodnde se encuentra el ultimo jugador
        case (jugador.posicion === 58):
            siHay = true;
            let posiciones = arrayJugadores.map(function (jugador) {
                return jugador.posicion
            })
            ultimo = Math.min(...posiciones)
            jugador.irA(ultimo);
            jugador.mover();
            break
            //si la posicion es 63 se acabara la partida
        case (jugador.posicion === 63):
            siHay = true;
            finDePartida(jugador);
            break
            //si la posicion es mayor que 63(que es la casilla final) contará hacia atras las que sobren
        case (jugador.posicion > 63):
            siHay = true;
            posicionDeMas = jugador.posicion - 63;
            jugador.irA(63);
            jugador.mover();
            jugador.irA(63 - posicionDeMas)
            jugador.mover();
            if (!comprobarCasillasEspeciales(arrayJugadores[turno])) {
                let casilla = arrayJugadores[turno].posicion
                let nombreBarCasilla = $(`#${casilla}`).find('.nombreBar').text();
                arrayJugadores[turno].baresRecorridos.push(nombreBarCasilla)
            }
            break

    }
    return siHay;
}
/**
 * 
 * @param {objeto jugador} jugador 
 * bloqueara el poder seguir jugando y gestionara las animaciones de transiccion a la vista final del juego
 */
function finDePartida(jugador) {
    let jugadorGanador = jugador.id;
    $('#lanzar').off('click', lanzarDado);
    $(jugador.ficha).animate({ 'width': 4000, 'height': 4000, 'top': -1000, 'left': -1000 }, 3000, function () {
        $('#controles').remove()
        $('#jugadoresMenu').remove()
        $('#tablero').delay(2000).fadeOut(1000, function () {
            crearPantallaDeGanador(jugador)
        })
    })
    arrayJugadores.forEach((jugador, i) => {
        if (i != jugadorGanador) {
            $(jugador.ficha).remove()
        }
    })
}
/**
 * 
 * @param {objeto jugador} jugador 
 * crea la pantalla que nos muestra al final de la partida con la informacion de los bares que se han recorrido durante la partida
 * borrandolos los duplicados antes de mostrarlos
 */
function crearPantallaDeGanador(jugador) {
    let div,ol;
    let baresRecorridosSet= new Set(jugador.baresRecorridos)
    let fragment = $(document.createDocumentFragment())
    $(fragment).append($('<h1/>', { text: 'ENHORABUENA' }))
    $(fragment).append($('<h2/>', { text: `La victoria es de ${jugador.nombre}` }))
    $(fragment).append($('<h3/>', { text: 'Lo siguiente es recorrer los bares que has visitado en el juego y que pagen los que han perdido' }))
    div=$('<div/>').addClass('divBaresRecorridos')
    $(div).append($('<p/>', { text: 'La lista de bares es la siguiente:' })).append($('<br/>'))
    ol=$('<ol/>')
    $.each([...baresRecorridosSet], function (indice, bar) {
        $(ol).append($('<li/>', { text: `${bar}` }))
    });
    $(div).append(ol)
    $(fragment).append(div)
    //$(fragment).append($('<style/>', { text: `.pantallaVictoria{bacground: linear-gradient(to bottom, ${jugador.color}, white);display:flex` }))
    $('#contenedor').append(fragment).addClass('pantallaVictoria').css('background', `linear-gradient(to bottom, ${jugador.color}, white)`)

}
/**
 * 
 * @param {coordenadas del navegador de latitud} latitud 
 * @param {coordenadas del navegador de longitud} longitud 
 * pide mediante una peticion asincrona los datos a la junta
 * observando la documentacion de datos abiertos que proporciona la junta
 * hemos conseguido filtrar los bares, cafeterias y restaurantes en funcion a los mas proximos a las coordenadas dadas
 * obteniendo el numero de registros necesarios para completar nuestro tablero
 * tambien hemos filtrado con un map la informacion que nos interesa para tenerlo en el array con el que trabajaremos
 * y una vez obtenidos se introducen en el tablero que ya estará creado
 */
function obtenetJson(latitud, longitud) {
    $.getJSON(`https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-turismo-de-castilla-y-leon&q=&rows=${42}&sort=-dist&facet=establecimiento&facet=municipio&(refine.establecimiento=BaresORrefine.establecimiento=RestaurantesORrefine.establecimiento=Cafeterias)&refine.provincia=Valladolid&geofilter.distance=${latitud}%2C${longitud}%2C10000`,
        function (respuesta) {
            baresOrdenaditos = respuesta.records.map(function (bar) { return bar.fields })

        }
    ).then(introducirBares);
}

//-------Programa---------------------
/**
 * obtenemos el JSON creado con las usl de las imagened de los dados y su valor
 */
$.getJSON('recursos/dados.json',
    function (respuesta) {
        dados = respuesta
    }
);
// al clicar en comenzar empezara la ejecucion del programa asignando el nuemro de jugadores
$('#comenzar').on('click', asignarNumeroJugadores);
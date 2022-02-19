/**
 * 
 */
class Jugador {
    /**
     * 
     * @param {int} id 
     * @param {*} nombre 
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
    añadirTurnosSinTirar(numTurnos) {
        this.turnosSinTirar += numTurnos;
    }
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
    asignarColor(color) {
        this.color = color
    }
    meterFicha(nodo) {
        this.ficha = nodo
    }
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
let baresOrdenaditos = [];
let turno = 0;
let arrayJugadores = [];
let dados;
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
function glichMarcos(){
    if(this.value==='Marcos' || this.value==='marcos'){
        $('#reglasUl').append($('<li/>',{text : 'Las mujeres jugadoras tendran que hacer lo que diga Marcos que pa eso está, aunque sea informatico'}))
    }
}
/**
 * 
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
function imprimirInfoBar(bar) {
    $('.visor').html(`Nombre:<br>${bar.nombre}<br>Direccion:<br>${bar.direccion}<br>Poblacion:<br>${bar.localidad}<br>Telefono:${bar.telefono_1}<br>Email:<br>${bar.email}`)
}
function comenzarTablero() {
    $('#formAgregarJugador').remove()
    $('#controles').append($(`<img/>`, { 'id': 'dadoImg', 'src': 'recursos/oca.png' })).append($('<button/>', { 'type': 'button', 'id': `lanzar`, text: 'LANZAR' }))
    $('#lanzar').one('click', lanzarDado);
    $('#reglas').fadeOut(2000);
    $('#ramon').remove();
    crearTablero();
    crearMenuJugadores();
}
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
function crearTablero() {
    //crear esto con un fragment si funciona
    let fragmentoDivs = $(document.createDocumentFragment())
    let visor;
    let numeroCasillas = 63
    let gestorX = 1;
    let gestorXf = 2;
    let gestorY = 20;
    let gestorYf = 21;
    for (let i = 0; i < numeroCasillas + 1; i++) {
        fragmentoDivs.append($('<div/>', { 'class': 'casilla', 'id': i, text: i }))
    }
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
        else
            $(casilla).css('grid-area', `5/6/17/15`);
    });
    visor = $('<div/>', { 'class': 'visor', html: '<h4>Pasa el raton por la casilla para mas informacion sobre el bar</h4>' })
    fragmentoDivs.append(visor)
    $('#tablero').append(fragmentoDivs)

    generarCasillasEspeciales();
}
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
    //introducirBares();
}
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
        //revisamos la casilla de la muerte
        case (jugador.posicion === 58):
            siHay = true;
            let posiciones = arrayJugadores.map(function (jugador) {
                return jugador.posicion
            })
            ultimo = Math.min(...posiciones)
            jugador.irA(ultimo);
            jugador.mover();
            break
        case (jugador.posicion === 63):
            siHay = true;
            finDePartida(jugador);
            break
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
function obtenetJson(latitud, longitud) {
    $.getJSON(`https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-turismo-de-castilla-y-leon&q=&rows=${42}&sort=-dist&facet=establecimiento&facet=municipio&(refine.establecimiento=BaresORrefine.establecimiento=RestaurantesORrefine.establecimiento=Cafeterias)&refine.provincia=Valladolid&geofilter.distance=${latitud}%2C${longitud}%2C10000`,
        function (respuesta) {
            console.log(`https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-turismo-de-castilla-y-leon&q=&rows=${42}&sort=-dist&facet=establecimiento&facet=municipio&(refine.establecimiento=BaresORrefine.establecimiento=Restaurantes)&refine.provincia=Valladolid&geofilter.distance=${latitud}%2C${longitud}%2C10000`)
            console.log(respuesta.records);
            baresOrdenaditos = respuesta.records.map(function (bar) { return bar.fields })

        }
    ).then(introducirBares);
}

//-------Programa---------------------
$.getJSON('recursos/dados.json',
    function (respuesta) {
        dados = respuesta
    }
);

$('#comenzar').on('click', asignarNumeroJugadores);
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
    }
    avanzar(casillas) {
        this.posicion += casillas;
    }
    irA(casilla) {
        this.posicion = casilla;
    }
    asignarColor(color) {
        this.color = color
    }
    meterFicha(nodo) {
        this.ficha = nodo
    }
    mover() {
        let posicionDiv = $(`#${this.posicion}`).offset()
        $(this.ficha).delay(500).animate({ "top": posicionDiv.top + 15, "left": posicionDiv.left + 15 + 10 * turno }, 1500)
    }
}
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
        $('#agregar').on('click', agregarJugadores);
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
    if (valido)
        comenzarTablero();
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
    let numeroCasillas = 63
    let gestorX = 1;
    let gestorXf = 2;
    let gestorY = 20;
    let gestorYf = 21;
    for (let i = 0; i < numeroCasillas + 1; i++) {
        $('#tablero').append($('<div/>', { 'class': 'casilla', 'id': i, text: i }))
    }
    $.each($('.casilla'), function (indice, casilla) {
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
    $('.casilla').eq(6).addClass('dados').end().eq(12).addClass('daods')
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
    /* if (!comprobarCasillasEspeciales(arrayJugadores[turno])) {
        //aqui lo que hace de forma normal
    } */
    arrayJugadores[turno].mover();
    $(`#jugador${turno}`).find('#cas').html(`Casilla: ${arrayJugadores[turno].posicion}`)
    $(`#jugador${turno}`).removeClass('turno');
    if (turno < arrayJugadores.length - 1)
        turno++
    else {
        turno = 0
    }
    $(`#jugador${turno}`).addClass('turno');
}
function comprobarCasillasEspeciales(jugador) {
    //con un switch comprobaremos que si se encuentra en una casilla especial
    //en caso de que sea una casilla especial se devolvera true para que no haga el sistema normal
}

//-------Programa---------------------
$.getJSON('recursos/dados.json',
    function (respuesta) {
        dados = respuesta
    }
);

$('#comenzar').on('click', asignarNumeroJugadores);
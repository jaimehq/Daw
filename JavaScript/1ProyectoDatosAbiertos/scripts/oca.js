class Jugador {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = 0;
        this.color = ''
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
    $('#ramon').fadeOut(1000);
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
        moverJugador()
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
                gestorXf+=2
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
        let div = $('<div/>', { 'id': indice }).addClass('jug').html(`Nombre: ${jugador.nombre}<br>Casilla: ${jugador.posicion}`).append($('<div/>', { 'class': 'ficha' }));
        div.find('.ficha').css({ 'background': colores[indice] })
        jugador.asignarColor(colores[indice])
        if (indice === 0) div.addClass('turno')
        fragmento.append(div)
    });

    $('#jugadoresMenu').append(fragmento);
}

function moverJugador() {
    let valorDado = $('#dadoImg').attr('alt')
    arrayJugadores[turno].moverJugador(Number(valorDado))
    if (!comprobarCasillasEspeciales(arrayJugadores[turno])) {
        //aqui lo que hace de forma normal
    }
    debugger
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
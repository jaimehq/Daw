class Jugador {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = 0;
    }
    avanzar(casillas) {
        this.posicion += casillas;
    }
    irA(casilla) {
        this.posicion = casilla;
    }
}
let arrayJugadores = [];
//let numeroJugadores = 0;
let dados;
function asignarNumeroJugadores() {
    let numeroJugadores=0;
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
    $('#controles').append($(`<img/>`, { 'id': 'dadoImg', 'src': 'recursos/oca.png', 'width': '20vw' })).append($('<button/>', { 'type': 'button', 'id': `lanzar`, text: 'LANZAR' }))
    $('#lanzar').one('click', lanzarDado);
    $('#reglas').fadeOut(2000);
    $('#ramon').fadeOut(1000);
    crearTablero();
    crearMenuJugadores();
}
function lanzarDado() {
    $('#lanzar').replaceWith($('<button/>', { 'type': 'button', 'id': `parar`, text: 'PARAR' }));    
    let animacionDado = setInterval(function () {
        $('#dadoImg').attr('src', dadoAleatorio(10))
    }, 100)
    $('#parar').one('click', function (e) {
        $('#parar').replaceWith($('<button/>', { 'type': 'button', 'id': `lanzar`, text: 'LANZAR' }));
        $('#lanzar').one('click', lanzarDado);
        clearInterval(animacionDado)
    });
}
function dadoAleatorio(num) {
    let rutaDado = dados[(Math.floor(Math.random() * num))].url;
    return rutaDado;
}
function crearTablero() {
    //crear esto con un fragment si funciona
    let numeroCasillas = 63
    let gestorX = 0;
    let gestorY = 11;
    for (let i = 0; i < numeroCasillas + 1; i++) {
        $('#tablero').append($('<div/>', { 'class': 'casilla', 'id': i, text: i }))
    }
    $.each($('.casilla'), function (indice, casilla) {
        switch (true) {
            case (indice < 10):
                gestorX++
                break
            case (indice >= 10 && indice < 20):
                gestorY--
                break
            case (indice >= 20 && indice < 29):
                gestorX--
                break
            case (indice >= 29 && indice < 37):
                gestorY++
                break
            case (indice >= 37 && indice < 44):
                gestorX++
                break
            case (indice >= 44 && indice < 50):
                gestorY--
                break
            case (indice >= 50 && indice < 55):
                gestorX--
                break
            case (indice >= 55 && indice < 59):
                gestorY++
                break
            case (indice >= 59 && indice < 62):
                gestorX++
                break
            case (indice === 62):
                gestorY--
                break
        }
        if (indice != 63)
            $(casilla).css('grid-area', `${gestorY}/${gestorX}/${gestorY + 1}/${gestorX + 1}`);
        else
            $(casilla).css('grid-area', `4/4/6/7`);
    });
}
function crearMenuJugadores(){
    let colores=['red','yellow','green','blue']
    let fragmento=$(document.createDocumentFragment())
    $.each(arrayJugadores, function (indice, jugador) { 
         let div=$('<div/>').addClass('jug').text(jugador.nombre).append($('<div/>',{'class':'ficha'}));
         div.find('.ficha').css({'background': colores[indice]})
        fragmento.append(div)
        });
        
    $('#jugadoresMenu').append(fragmento);

}

//-------Programa---------------------
$.getJSON('recursos/dados.json',
    function (respuesta) {
        dados = respuesta
    }
);

$('#comenzar').on('click', asignarNumeroJugadores);
class Jugador{
    constructor(id,nombre){
        this.id=id;
        this.nombre=nombre;
        this.posicion=0;
    }
    avanzar(casillas){
        this.posicion+=casillas;
    }
    irA(casilla){
        this.posicion=casilla;
    }
}
let arrayJugadores=[];
let numeroJugadores=0;
let dados;
function asignarNumeroJugadores(){
    let plantilla
    numeroJugadores=$('#jugadores').val();
    if(numeroJugadores>0&&numeroJugadores<=4){
        $('#formJugadores').remove();
        plantilla=$('<form/>',{'id':'formAgregarJugador'})      
        for(i=0;i<numeroJugadores;i++){
            let input=$('<input/>',{'type' :'text','id':`jugador${i}`,'class':'nombreJugador','required':'true'})
            let label=$('<label/>')
            
            $(label).html('Nombre del jugador: ').append(input)
            $(plantilla).append(label)
        }
        $(plantilla).append($('<br/>')).append($('<button/>',{'id':`agregar`,text:'AGREGAR'}))
        $('#controles').append(plantilla)
        $('#agregar').on('click',agregarJugadores);
    }
}
function agregarJugadores(){
    let nombre='';
    let valido=true
    $.each($('.nombreJugador'), function (indice, input) { 
        nombre=$(input).val().trim()
         if(nombre!=''){
            arrayJugadores.push(new Jugador(indice,nombre))
         }else{
             valido=false
         }
    });
    if(valido)
        comenzarTablero();
}
function comenzarTablero(){
    $('#formAgregarJugador').remove()
    $('#controles').append($(`<img/>`,{'src':'recursos/oca.png', 'width': '20vw'})).append($('<button/>',{'type':'button','id':`lanzar`,text:'LANZAR'}))
    $('#lanzar').on(lanzarDado);
    debugger
    
}
$.getJSON('recursos/dados.json',
    function (respuesta) {  
        debugger      
        dados=respuesta                
    }
);

$('#comenzar').on('click', asignarNumeroJugadores);
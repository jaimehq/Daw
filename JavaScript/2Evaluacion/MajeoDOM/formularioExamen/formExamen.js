class Pregunta {
    constructor(enunciado, A, B, C, D, correcta) {
        this.enunciado = enunciado;
        this.respuestas = {
            "1": A,
            "2": B,
            "3": C,
            "4": D
        }
        this.correcta = correcta;
    }
}
let formulario = {
    enunciadoIn: {
        control: document.forms[0].enunciadoIn,
        valido: false,
        vacio: "Es necesario escribir un enunciado"
    },
    respuestaA: {
        control: document.forms[0].respuestaA,
        valido: false,
        vacio: "Es necesario escribir una respuesta"
    },
    respuestaB: {
        control: document.forms[0].respuestaB,
        valido: false,
        vacio: "Es necesario escribir una respuesta"
    },
    respuestaC: {
        control: document.forms[0].respuestaC,
        valido: false,
        vacio: "Es necesario escribir una respuesta"
    },
    respuestaD: {
        control: document.forms[0].respuestaD,
        valido: false,
        vacio: "Es necesario escribir una respuesta"
    },
    correcta: {
        control: document.forms[0].correcta,
        valido: false,
        vacio: "Porfavor seleccione una respuesta correcta"
    }
}
let arrayPreguntas;
//let formulario=[...this.form.elements]
//debugger
function actualizarTitulo() {
    tituloAnadir.innerText = `Pregunta nº: ${arrayPreguntas.length + 1}`
}
function leerPreguntas() {
    let memoriaArray = JSON.parse(localStorage.getItem("preguntas"));
    if (memoriaArray === null) {
        memoriaArray = [];
    }
    arrayPreguntas = memoriaArray;
}
function validar(evento) {
    switch (evento.target.id) {
        case 'enunciadoIn':
        case 'respuestaA':
        case 'respuestaB':
        case 'respuestaC':
        case 'respuestaD':
            if (evento.target.validity.valueMissing) {
                formulario[evento.target.id].control.placeholder = formulario[evento.target.id].vacio
            } else {
                formulario[evento.target.id].valido = true;
            }
            break        
    }
}
function  comprobarRadio() {
    if(formulario['correcta'].control.value!=""){
        formulario['correcta'].valido=true;
    }
}
function recomprobar() {
    debugger
    comprobarRadio();
    let controles = Object.values(formulario);
    if(controles.every(control =>
        control.valido===true)){
            errores.innerHTML="";
            let pregunta= new Pregunta(
                formulario.enunciadoIn.control.value,
                formulario.respuestaA.control.value,
                formulario.respuestaB.control.value,
                formulario.respuestaC.control.value,
                formulario.respuestaD.control.value,
                formulario.correcta.control.value,
                );
            arrayPreguntas.push(pregunta);
            localStorage.setItem('preguntas',JSON.stringify(arrayPreguntas))
        }
}
//eventos:
document.forms[0].addEventListener('focusout', validar)
agregarBtn.addEventListener('click',recomprobar)
leerPreguntas();
actualizarTitulo();
class Pregunta{
    constructor(enunciado,A,B,C,D,correcta){
        this.enunciado=enunciado;
        this.respuestas={
            "1":A,
            "2":B,
            "3":C,
            "4":D
        }        
        this.correcta=correcta;
    }
}
let arrayPreguntas=[];
let formulario=[...insertarPregunta.form.elements]
debugger
titulo(formulario);
function titulo(form) {
    form.titulo.innerText=`Pregunta nº: ${arrayPreguntas.length()+1}`
}
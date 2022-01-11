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
let arrayPreguntas;
//let formulario=[...this.form.elements]
//debugger
function actualizarTitulo() {
    tituloAnadir.innerText=`Pregunta nº: ${arrayPreguntas.length+1}`
}
function leerPreguntas(){
    let memoriaArray=JSON.parse(localStorage.getItem("preguntas"));
    if(memoriaArray===null){
        memoriaArray=[];
    }
    arrayPreguntas=memoriaArray;
}
leerPreguntas();
actualizarTitulo();
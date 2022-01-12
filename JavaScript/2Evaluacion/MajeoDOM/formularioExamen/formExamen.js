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
let primerFormulario;
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
function comprobarRadio() {
    if (formulario['correcta'].control.value != "") {
        formulario['correcta'].valido = true;
        errores.innerHTML = "";
    } else {
        errores.innerHTML = "<p style=\"color:red\">Marque una respuesta correcta</p>";
    }
}
function recomprobar() {
    comprobarRadio();
    let controles = Object.values(formulario);
    if (controles.every(control =>
        control.valido === true)) {
        errores.innerHTML = "";
        let resCorrecta = formulario[`respuesta${formulario.correcta.control.value}`].control.value
        //debugger
        let pregunta = new Pregunta(
            formulario.enunciadoIn.control.value,
            formulario.respuestaA.control.value,
            formulario.respuestaB.control.value,
            formulario.respuestaC.control.value,
            formulario.respuestaD.control.value,
            resCorrecta,
        );
        arrayPreguntas.push(pregunta);
        localStorage.setItem('preguntas', JSON.stringify(arrayPreguntas))
    }
}
function crear() {
    primerFormulario = document.forms[0];
    let formFieldset = document.createElement('fieldset');
    let formLegend = document.createElement('legend');
    formLegend.innerText = 'Selecciona las preguntas para agregar al examen:';
    formFieldset.appendChild(formLegend);
    let formSelect = document.createElement('select');
    formSelect.setAttribute('id', 'preguntas')
    formSelect.setAttribute('multiple', 'true')
    let formOpcionPadre = document.createElement('option')
    arrayPreguntas.forEach(element => {
        formOpcion = formOpcionPadre.cloneNode();
        formOpcion.setAttribute('value', element.enunciado);
        formOpcion.innerText = element.enunciado;
        formSelect.appendChild(formOpcion);

    });
    formFieldset.appendChild(formSelect);
    let btnEmpezar = document.createElement('button')
    btnEmpezar.setAttribute('id', 'finalizarBtn')
    btnEmpezar.innerText = 'Finalizar examen';
    let btnVolver = document.createElement('button');
    btnVolver.setAttribute('id', 'volver');
    btnVolver.innerText = 'Volver a crear preguntas';
    formFieldset.appendChild(document.createElement('hr'))
    formFieldset.append(btnEmpezar, btnVolver)
    let formularioViejo = document.getElementById('insertarPregunta');
    document.forms[0].replaceChild(formFieldset, formularioViejo)
    finalizarBtn.addEventListener('click',empezarExamen)
    //debugger
    preguntas.addEventListener('change', agregarPregunta)
    volver.addEventListener('click', volverPrimerForm)
}
function volverPrimerForm() {
    document.body.replaceChild(primerFormulario, document.forms[0])

}
function agregarPregunta() {
    //debugger
    let opciones=['1','2','3','4'];
    let formularioNuevo = document.createElement('form')
    let fieldsetPadre = document.createElement('fieldset')
    let legendPadre = document.createElement('legend')
    let radioPadre= document.createElement('input')
    radioPadre.setAttribute('type','radio')    
    let labelPadre=document.createElement('label');
    let selecciones=[...preguntas.selectedOptions]
    let numeroPreg=0;
    selecciones.forEach(seleccion => {
        let fieldset=fieldsetPadre.cloneNode();
        let legend=legendPadre.cloneNode();
        legend.innerText=`Pregunta nº ${numeroPreg+1}`
        fieldset.appendChild(legend);
        let preguntaSeleccionada=arrayPreguntas.find(element => element.enunciado=== seleccion.value);
        let enunciadoParrafo=document.createElement('p');
        enunciadoParrafo.innerText=preguntaSeleccionada['enunciado']
        fieldset.appendChild(enunciadoParrafo)
        opciones.forEach(op=>{  
            let radio=radioPadre.cloneNode();  
            radio.setAttribute('name',`Seleccionada${numeroPreg}`)        
            radio.setAttribute('value',preguntaSeleccionada.respuestas[op])
            let label=labelPadre.cloneNode();
            label.innerText=preguntaSeleccionada.respuestas[op]  
            label.appendChild(radio)
            fieldset.appendChild(label)
        })
        numeroPreg++;
        formularioNuevo.appendChild(fieldset)
    })
    if(document.forms[1]){
        document.forms[1].parentElement.replaceChild(formularioNuevo,document.forms[1])
    }else{
        document.body.appendChild(formularioNuevo)
    }
}
function empezarExamen() {
    if(document.forms[1]){
        document.forms[0].remove();
        let btnCorregir=document.createElement('button')
        btnCorregir.setAttribute('id','corregir')
        btnCorregir.innerText='Corregir el examen';
        document.forms[0].appendChild(document.createElement('hr')) 
        document.forms[0].appendChild(btnCorregir) 
        btnCorregir.addEventListener('click',corregirExamen)       
    }
    
}
function corregirExamen(){
    let puntos=0;
    let fieldsetPreguntas=document.getElementsByTagName('fieldset');
    debugger
    let preg = Object.values(fieldsetPreguntas);
    debugger
    preg.forEach(element => {       
        let respuestaSeleccionada="";
        //busamos la pregunta seleccionada en el array 
        let preguntaSeleccionada=arrayPreguntas.find(dato => 
            dato.enunciado=== element.getElementsByTagName('p')[0].value);   
        let radios=element.getElementsByTagName('input')
        Object.values(radios).forEach(radio=>{
            if(radio.checked===true){
                respuestaSeleccionada=radio.value;
            }
        })
        if(respuestaSeleccionada=''){
            puntos=puntos+0
        }else if(respuestaSeleccionada===preguntaSeleccionada.correcta){
            puntos+=1
        }else{
            puntos-=0.25
        }
        debugger 
    });
    document.forms[0].remove();
    let puntuacion=document.createElement('h1');
    puntuacion.innerText=`La puntuacion obtenida es de: ${puntos} puntos`
    document.body.appendChild(puntuacion)
}
//eventos:
document.forms[0].addEventListener('focusout', validar)
agregarBtn.addEventListener('click', recomprobar)
crearExamen.addEventListener('click', crear)
leerPreguntas();
actualizarTitulo();
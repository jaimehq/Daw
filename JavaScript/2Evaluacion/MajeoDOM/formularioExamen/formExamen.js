//lo primero crearemos la clase pregunta para ir agregando al array de las preguntas y poder manejarlas de forma mas clara
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
/* 
crearemos tambien un objeto formulario para controlar los campos del primer formulario 
asi como la validez de estos y el mensaje de error que queremos mostrar
*/
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
/* 
variables globales:
usaremos 2 variables globales, una para el array de preguntas que vamos a ir usando
y la otra para almacenar el primer formulario por si volvemos al formulario inicial
 */

let arrayPreguntas;
let primerFormulario;
/* esta funcion nos cambiara el legend del primer formulario donde se agregan las preguntas
al array para que nos vaya indicando el numero de pregunta que vamos a introducir */
function actualizarTitulo() {
    tituloAnadir.innerText = `Pregunta nº: ${arrayPreguntas.length + 1}`
}
/* 
Con esta funcion capturaremos el array de preguntas que podemos tener almacenado en
el local storage para asi no tener que andar metiendo las preguntas para hacer pruebas una y otra vez
 */
function leerPreguntas() {
    let memoriaArray = JSON.parse(localStorage.getItem("preguntas"));
    if (memoriaArray === null) {
        memoriaArray = [];
    }
    arrayPreguntas = memoriaArray;
}
//Con la funcion validar validaremos los campos uno a uno para saber si estan creados correctamente
function validar(evento) {
    //filtraremos el tipo de id que tiene
    switch (evento.target.id) {
        case 'enunciadoIn':
        case 'respuestaA':
        case 'respuestaB':
        case 'respuestaC':
        case 'respuestaD':
            //en el caso de que no sea valido mostraremos un placeholder en el campo erroneo
            if (evento.target.validity.valueMissing) {
                formulario[evento.target.id].valido = false;
                formulario[evento.target.id].control.placeholder = formulario[evento.target.id].vacio
            } else {
                //en caso contrario validaremos el control modificando la variable indicada
                formulario[evento.target.id].valido = true;
            }
            break
    }
}
//esta funcion comprobara la validez del boton radio mostrando en caso de que no sea correcto un mensaje en pantalla
function comprobarRadio() {

    if (formulario['correcta'].control.value != "") {
        formulario['correcta'].valido = true;
        errores.innerHTML = "";
    } else {
        errores.innerHTML = "<p style=\"color:red\">Marque una respuesta correcta</p>";
    }
}
//al hacer click en agregar utilizaremos la funcion recomprobar
function recomprobar() {
    //comprobamos el radio
    comprobarRadio();
    //creamos un array del objeto formulario
    let controles = Object.values(formulario);
    //comprobamos que todos los controles sean validos
    if (controles.every(control =>
        control.valido === true)) {
        //en caso de ser validos
        //asignaremos a la resCorrecta el valor del control que tenga la respuesta correcta
        //para luego poder comparar el texto de la respuesta correcta con la respuesta seleccionada       
        let resCorrecta = formulario[`respuesta${formulario.correcta.control.value}`].control.value;
        //creamos la pregnta con sus respectivos valores
        let pregunta = new Pregunta(
            formulario.enunciadoIn.control.value,
            formulario.respuestaA.control.value,
            formulario.respuestaB.control.value,
            formulario.respuestaC.control.value,
            formulario.respuestaD.control.value,
            resCorrecta,
        );
        //y la añadimos al array de preguntas
        arrayPreguntas.push(pregunta);
        //ademas lo almacenaremos en el localStorage para poder usarlas mas adelante
        localStorage.setItem('preguntas', JSON.stringify(arrayPreguntas))
    }
}
//la funcion crear nos pasara a la interface de crear el examen
function crear() {
    //lo primero almacenaremos el primer formulario para vulver a ponerlo en el DOM si queremos agregar mas preguntas
    primerFormulario = document.forms[0];
    //creamos la estructura del formulario que vamos a añadir:
    //creamos el fieldset
    let formFieldset = document.createElement('fieldset');
    //un legend con el titulo y se lo agregamos al fieldset
    let formLegend = document.createElement('legend');
    formLegend.innerText = 'Selecciona las preguntas para agregar al examen:';
    formFieldset.appendChild(formLegend);
    //creamos el select con su id y que sea multiple
    let formSelect = document.createElement('select');
    formSelect.setAttribute('id', 'preguntas')
    formSelect.setAttribute('multiple', 'true')
    //creamos una opcion padre que vamos a ir clonando para cada opcion del select
    let formOpcionPadre = document.createElement('option')
    //y recorremos el array para ir agregando las opciones
    arrayPreguntas.forEach(element => {
        //clonamos la opcion
        formOpcion = formOpcionPadre.cloneNode();
        //añadimos como valor el enunciado
        formOpcion.setAttribute('value', element.enunciado);
        //y lo metemos tambien para que sea visible
        formOpcion.innerText = element.enunciado;
        //y se lo agregamos al select
        formSelect.appendChild(formOpcion);

    });
    //una vez completadas las opciones metemos el select en el fieldset
    formFieldset.appendChild(formSelect);
    //y creamos los botones que vamos a usar para las dos opciones
    let btnEmpezar = document.createElement('button')
    btnEmpezar.setAttribute('id', 'finalizarBtn')
    btnEmpezar.innerText = 'Finalizar examen';
    let btnVolver = document.createElement('button');
    btnVolver.setAttribute('id', 'volver');
    btnVolver.innerText = 'Volver a crear preguntas';
    //agregamos un hr pa dejarlo mas bonito y despues los dos botones creados
    formFieldset.appendChild(document.createElement('hr'))
    formFieldset.append(btnEmpezar, btnVolver)
    //capturamos el fieldset que tenemos actualmente
    let formularioViejo = document.getElementById('insertarPregunta');
    //y lo modificamos por el que hemos creado
    document.forms[0].replaceChild(formFieldset, formularioViejo)
    //ahora creamos los distintos eventos que tenemos que escuchar
    finalizarBtn.addEventListener('click',empezarExamen)
    preguntas.addEventListener('change', agregarPregunta)
    volver.addEventListener('click', volverPrimerForm)
}
//con esta funcion volvemos al primer formulario
function volverPrimerForm() {
    document.body.replaceChild(primerFormulario, document.forms[0])

}
//al seleccionar una opcion del select añadimos de forma dinamica las distintas pregeguntas seleccionadas
function agregarPregunta() {
    //creamos un array para ir seleccionadno las distintas opciones que en el objeto pregunta
    //son los claves del array de respuestas
    let opciones=['1','2','3','4'];
    let formularioNuevo = document.createElement('form')
    //creamos los padres para clonar
    let fieldsetPadre = document.createElement('fieldset')
    let legendPadre = document.createElement('legend')
    let radioPadre= document.createElement('input')
    radioPadre.setAttribute('type','radio')    
    let labelPadre=document.createElement('label');
    //creamos un array de las preguntas seleccionadas
    let selecciones=[...preguntas.selectedOptions]
    // y un contador de las preguntas que hay seleccionadas
    let numeroPreg=0;
    //y recorremos las selecciones
    selecciones.forEach(seleccion => {
        //para cada pregunta vamos a meterla en un fieldset para tenerlas diferenciadas
        let fieldset=fieldsetPadre.cloneNode();
        //agregamos un titulo
        let legend=legendPadre.cloneNode();
        legend.innerText=`Pregunta nº ${numeroPreg+1}`
        fieldset.appendChild(legend);
        //ahora seleccionamos del array de preguntas la que estamos usando
        let preguntaSeleccionada=arrayPreguntas.find(element => element.enunciado=== seleccion.value);
        //creamos el enunciado y lo agregamos
        let enunciadoParrafo=document.createElement('p');
        enunciadoParrafo.innerText=preguntaSeleccionada['enunciado']
        fieldset.appendChild(enunciadoParrafo)
        //vamos a descolocar el arry opciones para que cada vez que creemos la pregunta nos salga en un orden distinto
        opciones=opciones.sort(function(){return Math.random()-0.5})
        //ahora agregamos las distintas opciones
        opciones.forEach(op=>{  
            let radio=radioPadre.cloneNode(); 
            //con esto hacemos que los radios de cada fieldset sean distintos 
            radio.setAttribute('name',`Seleccionada${numeroPreg}`)  
            //y le damos el value con el contenido de la respuesta      
            radio.setAttribute('value',preguntaSeleccionada.respuestas[op])
            let label=labelPadre.cloneNode();
            //y creamos el texto de con las respuesta
            label.innerText=`${preguntaSeleccionada.respuestas[op]} >`  
            label.appendChild(radio)
            fieldset.appendChild(label)
        })
        //aumentamos el contador y metemos el fieldset con la pregunta creada al formulario que tenemos hecho
        numeroPreg++;
        formularioNuevo.appendChild(fieldset)
    })
    //si se habia agregado alguna pregunta se remplaza lo que habia anteriormente por lo creado 
    if(document.forms[1]){
        document.forms[1].parentElement.replaceChild(formularioNuevo,document.forms[1])
    }else{
        //si es la primera pregunta agregamos el formulario
        document.body.appendChild(formularioNuevo)
    }
}
//con esto empezara el examen
function empezarExamen() {
    //comprobamos que haya agregado alguna pregunta
    if(document.forms[1]){
        //borramos el formulario de agregar preguntas al examen
        document.forms[0].remove();
        //añadimos el bon correguir al formulario que nos queda
        let btnCorregir=document.createElement('button')
        btnCorregir.setAttribute('id','corregir')
        btnCorregir.innerText='Corregir el examen';
        document.forms[0].appendChild(document.createElement('hr')) 
        document.forms[0].appendChild(btnCorregir) 
        btnCorregir.addEventListener('click',corregirExamen)       
    }
    
}
//cuando clicamos en corregir examen
function corregirExamen(){
    //iniciamos los puntos
    let puntos=0;
    //cogemos todos los fieldset que equivaldrian a cada pregunta y lo recorremos
    let fieldsetPreguntas=document.getElementsByTagName('fieldset');   
    for (element of fieldsetPreguntas){
        let respuestaSeleccionada="";
        //busamos la pregunta seleccionada en el array comparando los enunciados del array de preguntas con el texto del enunciado       
        let preguntaSeleccionada=arrayPreguntas.find(dato => dato.enunciado=== element.getElementsByTagName('p')[0].innerText); 
        //capturamos los radios que haya en el contexto de el fieldset que nos encontremos        
        let radios=element.getElementsByTagName('input')
        //lo recorremos para saber si hay algo seleccionado
        Object.values(radios).forEach(radio=>{
            if(radio.checked===true){
                respuestaSeleccionada=radio.value;
            }
        })
        // y si no hay nada seleccionado no pasara nada
        if(respuestaSeleccionada===''){
            puntos=puntos+0
        }
        //si coincide la respuesta dada con la respuesta correcta le sumaremos 1
        else if(respuestaSeleccionada===preguntaSeleccionada.correcta){
            puntos+=1
        }
        //si es erronea suma puntos(y si se puede sacar negativo)
        else{
            puntos-=0.25
        }
    };
    //creamos el numero de preguntas que se han hecho para compararlo con la puntuacion
    let numPreguntas=fieldsetPreguntas.length;
    document.forms[0].remove();
    //y creamos un h1 con los puntos y lo mostramos
    let puntuacion=document.createElement('h1');
    puntuacion.innerText=`La puntuacion obtenida es de: ${puntos} puntos sobre ${numPreguntas}`
    document.body.appendChild(puntuacion)
}
//el programa que se ejecutara al iniciar la pagina:
document.forms[0].addEventListener('focusout', validar)
agregarBtn.addEventListener('click', recomprobar)
crearExamen.addEventListener('click', crear)
leerPreguntas();
actualizarTitulo();
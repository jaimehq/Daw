//resolución completa de validación pizza control por control
//Ademas habrá que controlar si hay controles validables sin validar, cuando pulsamos el boton
//La siguiente estructura es un objeto donde se guarda una propiedad por cada control validable.
//La propiedad seleccionado nos servirá en todo momento para verificar si un control validable ha sido seleccionado y validado.
//Las propiedades vacio, patron, noselec sirven para guardar mensajes de error adaptados al control donde se produzca el error.
let formulario = {
    nombre: {
        control: document.forms[0].nombre,
        seleccionado: false,
        vacio: "nombre vacío",
        patron: "nombre en blanco"
    },
    telefono: {
        control: document.forms[0].telefono,
        seleccionado: false,
        vacio: "teléfono vacío",
        patron: "teléfono no  válido"
    },
    direccion: {
        control: document.forms[0].direccion,
        seleccionado: false,
        vacio: "dirección vacía",
        patron: "dirección en blanco"
    },
    tipos: {
        control: document.forms[0].tipos,
        seleccionado: false,
        noselec: "Tipo de pizza no seleccionado"
    },
    pago: {
        control: document.forms[0].pago,
        seleccionado: false,
        noselec: "Modo de pago no seleccionado"
    },
    importe: {
        control: document.forms[0].importe,
        seleccionado: false,
        vacio: "Importe vacío"
    }
}

document.forms[0].addEventListener("focusout", function (evento) {
    switch (evento.target.id) {
        case "nombre":
        case "direccion":
        case "telefono":
            if (evento.target.validity.valueMissing) {
                resumen.innerHTML += formulario[evento.target.id].vacio + "<br>"
            } else if (evento.target.validity.patternMismatch) {
                resumen.innerHTML += formulario[evento.target.id].patron + "<br>"
            } else {
                formulario[evento.target.id].seleccionado = true;
            }
            break;
        case "importe":
            if (evento.target.validity.valueMissing) {
                resumen.innerHTML += formulario[evento.target.id].vacio + "<br>"
            } else {
                formulario[evento.target.id].seleccionado = true;
            }
            break;
        case "tipos":
        case "pago":
            if (evento.target.validity.valueMissing) {
                resumen.innerHTML += formulario[evento.target.id].noselec + "<br>"
            } else {
                formulario[evento.target.id].seleccionado = true;
            }
            break;
    }
})

ok.addEventListener("click", function () {
    let controles = Object.values(formulario) //este  método devuelve un array que contiene cada una de las propiedades(controles validables del formulario)
    if (controles.every(control => //si uno solo de las comparaciones es false, every devuelve false
        control.seleccionado === true
    )) {//tratamiento de los valores de los campos puesto que aquí llegamos porque todos los campos obligatorios ha sido seleccionados correctamente
        resumen.innerHTML = informe( //generamos informe pasando a la función los controles a capturar
            formulario,
            document.forms[0].tamano,
            document.forms[0].instrucciones,
            [...document.querySelectorAll("input[type=checkbox]")]
        );
        document.forms[0].reset(); //reseteo del formulario
        controles.map(control => {    //ponemos a false los controles validables
            control.seleccionado = false;
        })

    } else {
        resumen.innerHTML = "Hay controles obligatorios sin seleccionar<br>"
    }

})

function informe(CtlValidables, tamano, instrucciones, ingredientes) {

    let resumen = "Tipos de pizza: ";
    //captura del tipo de pizza
    [...CtlValidables.tipos.control.selectedOptions].forEach(tipo => {
        resumen += `${tipo.value}, `
    });
    resumen += "<br>Ingredientes adicionales:"
    //captura de los ingredientes
    ingredientes.forEach(ingrediente => {
        resumen += `${ingrediente.value}, `
    })
    //captura del tamaño
    resumen += `<br>Tamaño pizza: ${tamano.value}`
    //captura del nombre
    resumen += `<br>Nombre: ${CtlValidables.nombre.control.value}`
    //captura de la direccion
    resumen += `<br>Dirección: ${CtlValidables.direccion.control.value}`
    //captura del telefono
    resumen += `<br>Teléfono: ${CtlValidables.telefono.control.value}`
    //captura del metodo de pago
    resumen += `<br>Modo de pago: ${CtlValidables.pago.control.value}`
    //captura del importe
    resumen += `<br>Importe: ${CtlValidables.importe.control.value}`
    //captura de las instrucciones adicionales
    resumen += `<br>Instrucciones adicionales:<br>${instrucciones.value}`
    return resumen;
}


/* formulario.nombre.control.addEventListener("blur", function () {
    if (this.validity.valueMissing) {
        resumen.innerHTML += formulario[this.id].vacio + "<br>"
    }
    if (this.validity.patternMismatch) {
        resumen.innerHTML += formulario[this.id].patron + "<br>"
    }

})

formulario.direccion.control.addEventListener("blur", function () {
    if (this.validity.valueMissing) {
        resumen.innerHTML += formulario[this.id].vacio + "<br>"
    }
    if (this.validity.patternMismatch) {
        resumen.innerHTML += formulario[this.id].patron + "<br>"
    }
})

formulario.telefono.control.addEventListener("blur", function () {
    if (this.validity.valueMissing) {
        resumen.innerHTML += formulario[this.id].vacio + "<br>"
    }
    if (this.validity.patternMismatch) {
        resumen.innerHTML += formulario[this.id].patron + "<br>"
    }
})

formulario.tipos.control.addEventListener("blur", function () {
    if (this.validity.valueMissing) {
        resumen.innerHTML += formulario[this.id].noselec + "<br>"
    }
})
formulario.pago.control.addEventListener("blur", function () {
    if (this.validity.valueMissing) {
        resumen.innerHTML += formulario[this.id].noselec + "<br>"
    }
})

formulario.importe.control.addEventListener("blur", function () {
    if (this.validity.valueMissing) {
        resumen.innerHTML += formulario[this.id].vacio + "<br>"
    }

}) */

let formulario = {
    tamano: {
        control: document.forms['pedido'].tamano,
        valido: false,
        msjVacio: 'Tienes que seleccionar un tamaño',
        // msjPattern:''
    },
    tipos: {
        control: document.forms[0].tipos,
        valido: false,
        msjVacio: 'Has de seleccionar un tipo de pizza'
    },
    nombre: {
        control: document.forms[0].nombre,
        valido: false,
        msjVacio: 'El campo nombre no puede estar vacio',
        msjPattern: 'Los caracteres que has introducido son invalidos'
    },
    direccion: {
        control: document.forms[0].direccion,
        valido: false,
        msjVacio: 'Sin la direccion no te lo envio',
        msjPattern: 'Los caracteres que has introducido son invalidos'
    },
    telefono: {
        control: document.forms[0].telefono,
        valido: false,
        msjVacio: 'Si no te encontramos te llamamos a voces si quieres',
        msjPattern: 'Revisa el numero de telefono que me parece que no existe'
    },
    instrucciones: {
        control: document.forms[0].instrucciones,
        valido: false,
       /*  msjVacio:'El campo nombre no puede estar vacio',
        msjPattern:'Los caracteres que has introducido son invalidos'
     */},
    pago: {
        control: document.forms[0].pago,
        valido: false,
        msjVacio: 'Elige un metodo de pago, los besos y abrazos no cuentan',
        //msjPattern:'Los caracteres que has introducido son invalidos'
    }
}
let errores='';
ok.addEventListener('click', validar);
document.forms[0].addEventListener('focusout', comprobar)
function comprobar(evento) {
    if (evento.target.validity.valueMissing) {
        errores = formulario[evento.target.id].msjVacio;
        formulario[evento.target.id].valido = false
    } else if (evento.target.validity.patternMismatch) {
        errores = formulario[evento.target.id].msjPattern;
        formulario[evento.target.id].valido = false
    } else
        formulario[evento.target.id].valido = true;

}
function validar() {
    let parrafo = crearElemento('p',undefined,undefined,'a ver si funciona')
    resumen.appendChild(parrafo);
}
function crearElemento(tipoElemento, nombreAtributos, parametroAtributo,textoNodo) {
    let nodo = document.createElement(tipoElemento)       
    if (nombreAtributos != undefined && parametroAtributo != undefined) {
        for (let i = 0; i < nombreAtributos.length; i++) {
            nodo.setAttribute(nombreAtributos[i], parametroAtributo[i])
        }
    }
    if (textoNodo != undefined) {
        nodo.innerText=textoNodo
    }
    return nodo;

}
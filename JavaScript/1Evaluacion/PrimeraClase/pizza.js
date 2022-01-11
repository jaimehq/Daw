
ok.addEventListener('click', function () {
    let datosFormulario = [...this.form.elements]
    resumen.innerHTML = "";
    resumen.innerHTML += mostrarErrores(datosFormulario);
    if (resumen.innerText === "")
        mostrarResumen(datosFormulario);
})
let errores = {
    'eNombre': false,
    'eDireccion': false,
    'eTelefono':false,
    'ePago':false,
    'eTipos':false
}
document.forms[0].addEventListener("focusout", function (evento) {
    resumen.innerHTML = "";
    if (!evento.target.checkValidity()) {
        switch (evento.target.id) {
            case 'nombre':                
                errores['eNombre']= true
                break;
            case 'direccion':
                errores['eDireccion'] = true
                break;
            case 'telefono':
                errores['eTelefono'] = true
                break
            case 'pago':
                errores['ePago'] = true
                break;
            case 'tipos':
                errores['eTipos'] = true
                break;
        }
    } else {
        switch (evento.target.id) {
            case 'nombre':
                errores.eNombre = false
                break;
            case 'direccion':
                errores.eDireccion = false
                break;
            case 'telefono':
                errores.eTelefono = false
                break
            case 'pago':
                errores.ePago = false
                break;
            case 'tipos':
                errores.eTipos = false
                break;
        }

    }
    resumen.innerHTML=imprimirErrores()
})
function imprimirErrores(){
    let cadenaErrores='';
    let indice=0;
    let listaErrores=['Campo nombre Invalido','Campo Direccion Invalido','Campo telefono Invalido','Debe seleccionar un metodo de pago','Debe seleccionar algun tipo de pizza']
    for( let error in errores){        
        if(errores[error]===true){
            cadenaErrores+=`${listaErrores[indice]}<br>`;
        }
        indice++;
    }
    debugger
    return cadenaErrores;
}

function mostrarErrores(formulario) {
    let errores = "";
    formulario.forEach(element => {
        if (element.localName != 'fieldset' && element.localName != 'button') {
            if (!element.checkValidity()) {
                switch (element.id) {
                    case 'nombre':
                        errores += 'Campo nombre erroneo<br>'
                        break;
                    case 'direccion':
                        errores += 'Campo direccion erroneo<br>'
                        break;
                    case 'telefono':
                        errores += 'Campo telefono erroneo<br>'
                        break
                    case 'pago':
                        errores += 'Debe seleccionar un metodo de pago<br>'
                        break;
                    case 'tipos':
                        errores += 'Debe seleccionar un tipo de Pizza<br>'
                        break;
                }
            } else {
                element.disabled = true;
            }
        }
    });
    return errores;
    //desactivarControles(camposErroneos, formulario)
}
function mostrarResumen(formulario) {
    formulario.forEach(element => {
        element.disabled = false;
    })

    let resumenPedido = `Tamaño:<br>${document.pedido.tamano.value}<hr>`;
    resumenPedido += 'Tipos de Pizza:<br>';
    let tiposSeleccionados = [...tipos.selectedOptions];
    tiposSeleccionados.forEach(element => {
        resumenPedido += `${element.value}`
    })
    resumenPedido += '<hr>';

    let ingredientesExtra = "";
    let checkboxes = [...document.querySelectorAll('input[type=checkbox]')];
    checkboxes.forEach(element => {
        if (element.checked) ingredientesExtra += `${element.value}<br>`;
    })
    if (ingredientesExtra != "") {
        resumenPedido += 'Ingredientes Extras<br>';
        resumenPedido += ingredientesExtra;
    }
    resumenPedido += '<hr>Datos de Entrega<br>';
    formulario.forEach(element => {
        if (element.id === 'nombre' || element.id === 'direccion' || element.id === 'telefono')
            resumenPedido += `${element.value}<br>`;
    })
    resumenPedido += '<hr>Metodo de pago:<br>';
    resumenPedido += `${pago.value} Importe Indeterminado de momento<br>`;
    resumen.innerHTML = resumenPedido;
}
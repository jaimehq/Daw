/*pedido es el name de formulario y se puede acceder a cualquier parte del form
document.pedido;
//debugger;
document.pedido.queso;
document.pedido.elements;*/ //elementos de un formulario

/*
ok.addEventListener('click', function(){

    //Capturar valores de radiobutton // 'name'= tamano
    //En este caso corresponde a pequeña, mediana o grande
    let tamano = document.pedido.tamano.value;
    console.log(`Valor tamaño: ${tamano}`);

    //captura todos los valores de radio individual (tamaño de pizzas)
    let radios=[...document.querySelectorAll('input[type=radio]')];
    let checkVals=[];
    radios.forEach(radio => {
        radio.checked=false; //ponemos todos los radios a false.
        console.log(radio.value)
    })


    //capturar valores de un checkbox (queso, pimiento, cebolla, champis...)
    let checkboxes = [...document.querySelectorAll('input[type=checkbox]')];
    let checkvalor=[];
    checkboxes.forEach(check => {
        if(check.checked){
            checkvalor.push(check.value);
        }
    })
    console.log(`checkboxes: ${checkvalor.toString()}`);

    //capturar los elementos seleccionados de la lista de selección múltiple
    let lista=[...tipos.selectedOptions];
    lista.forEach(elemLista =>{
        console.log(elemLista.value);
        })

}) //end addeventlistener
*/

nombre.addEventListener('change', function(){
    if(!this.checkValidity()){
        console.log('nombre mal validado')
    }
})

direccion.addEventListener('change', function(){
    if(!this.checkValidity()){
        console.log('direccion mal validado')
    }
})

telefono.addEventListener('change', function(){
    if(!this.checkValidity()){
        console.log('teléfono mal validado')
    }
})
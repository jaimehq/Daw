document.addEventListener("keydown", moverSeleccion);
document.addEventListener("keydown", lanzarPelota);
tabla.addEventListener("mousedown", clicarPelota);
//declaramos variables globales que son las que van a utilizar todas las funciones
let y;//sera la variable que controlara la altura de las pelotas
let seleccion = [futbol, basket, tenis, rugby];// este array manejara las selecciones
let pelotas = [pelotaF, pelotaB, pelotaT, pelotaR];//este otro maneja las celdas donde estan las pelotas
let posicion;//con la variable posicion tendremos una correlacion entre las variables seleccion y pelotas teniendo disponible en todo momento el lugar en el que estamos
let intervalo;//con esta variable conseguitemos que el intervalo de movimiento sea continuo una vez creado

//esta funcion hara que al clicar en cualquier luegar de la tabla elija la pelota que tiene que caer si lo tenemos seleccionado
function clicarPelota(evento) {
    //let marcado = false;
    //primero comprobamos que este seleccionado algun menu    
    /* seleccion.forEach(function (deporte) {
        if (deporte.style.background == "red")
            marcado = true;
    });
    //en caso de que haya algo elegido comprobaremos que lo clicado coincida con la celda que tenemos seleccionado
    if (marcado === true && (evento.target == pelotas[posicion] || evento.target == seleccion[posicion] || evento.target.parentElement == pelotas[posicion])) {
        //en caso de coincidir borraremos el borde
        pelotas[posicion].style.borderColor = "white";
        //asignaremos la posicion actual que tiene la pelota
        y = pelotas[posicion].offsetTop;
        //y comenzaremos la funcion que la hara caer
        intervalo = setInterval(caerPelota, 20);
    } */
    //formato resumido:
    if (posicion!=null && (evento.target == pelotas[posicion] || evento.target == seleccion[posicion] || evento.target.parentElement == pelotas[posicion])) {
        pelotas[posicion].style.borderColor = "white";
        y = pelotas[posicion].offsetTop;
        intervalo = setInterval(caerPelota, 20);
    } 
}

//esta funcion hace que caiga la pelota seleccionada con la flecha hacia abajo
function lanzarPelota(evento) {
    //como en la funcion clicar pelota se podira resumir de la misma forma que la anterior
    let marcado = false;
    seleccion.forEach(function (deporte) {
        if (deporte.style.background == "red")
            marcado = true;
    });
    //para resumirlo tendriamos que cambiar (marcado ===true) por (posicion!=null)
    if (marcado === true && evento.keyCode == 40) {
        pelotas[posicion].style.borderColor = "white";
        y = pelotas[posicion].offsetTop;
        intervalo = setInterval(caerPelota, 20);
    }
}
//esta funcion unicamente hace caer la pelota en el eje Y hasta los 500px
function caerPelota() {
    if (y >= 500)
        clearInterval(intervalo);
    else {
        y += 10;
        pelotas[posicion].style.top = `${y}px`;
    }
}

//Esta funcion recorrera el menu de seleccion
function moverSeleccion(evento) {
    //primero comprobamos si hay o no algun menu seleccionado
    let marcado = false;
    seleccion.forEach(deporte => {
        if (deporte.style.background === "red")
            marcado = true;
    });
    //OPCION DE UN ELSE IF PARA REALIZAR EL MOVIMIENTO ENTRE LAS SELECCIONES
    //------------------------------
    /* if (marcado == false) {
        switch (evento.keyCode) {
            case 37:
                posicion = 3;
                break;
            case 39:
                posicion = 0
                break
        }
        seleccion[posicion].style.background = "red";
    } else {
        switch (evento.keyCode) {
            case 37:
                seleccion[posicion].style.background = "white";
                posicion--;
                if (posicion < 0) posicion = 3
                break;
            case 39:
                seleccion[posicion].style.background = "white";
                posicion++
                if (posicion > 3) posicion = 0
                break
        }
        seleccion[posicion].style.background = "red";
    } */
    //---------
    //opcion de un switch
    //-----------------
    //sabiendo si hay ya algo marcado empezamos con las verificaciones de posicion
    switch(true){
        //en caso de que no tengamos ninguna seleccion asignaremos a la variable posicion la ubicacion que 
        //tiene que tener
        case (evento.keyCode===37 && marcado==false):
                posicion = 3;
                break;
        case (evento.keyCode===39 && marcado==false):
                posicion = 0
                break;
        //en el caso de que ya tengamos marcado algo pintaremos el cuadro anterior de blanco
        // y modificaremos la posicion en funcion de la tecla pulsada, teniendo en cuenta
        //mediante un if que no nos salgamos de las opciones disponibles
        case (evento.keyCode===37 && marcado==true):
                seleccion[posicion].style.background = "white";
                posicion--;
                if (posicion < 0) posicion = 3
                break;
        case (evento.keyCode===39 && marcado==true):
                seleccion[posicion].style.background = "white";
                posicion++
                if (posicion > 3) posicion = 0
                break
        }
        //una vez elegida correctamente la posicion, en el caso de que la posicion se haya modificado pintaremos
        //la posicion actual de rojo
        if(posicion!=null)
            seleccion[posicion].style.background = "red";
    }

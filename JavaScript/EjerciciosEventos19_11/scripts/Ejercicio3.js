document.addEventListener("keydown", moverSeleccion);
document.addEventListener("keydown",lanzarPelota);

let y;
let seleccion=[futbol, basket,tenis, rugby];
let pelotas=[pelotaF, pelotaB, pelotaT,pelotaR];
let posicion;
let intervalo=setInterval(caerPelota,20,evento);


function lanzarPelota(evento){
    let marcado=false;
    seleccion.forEach(function(deporte) {
        //debugger
        if(deporte.style.background=="red")
            marcado=true;
            
    });
    if(marcado===true && evento.keyCode==40){
        //debugger        
        pelotas[posicion].style.borderColor="white";        
        y=pelotas[posicion].offsetTop;
        let x=pelotas[posicion].offsetLeft;

        pelotas[posicion].position="absolute";
        pelotas[posicion].style.left=x;
        //debugger
        //intervalo=setInterval(caerPelota,20);
        
    }
} 
 function caerPelota(){
    y+=5;
    pelotas[posicion].style.top=`${y}px`;
    debugger
    
} 
function moverSeleccion(evento){
    let marcado=false;
    seleccion.forEach(deporte => {
        //debugger
        if(deporte.style.background=="red")
            marcado=true;
    });
    if(marcado==false){
        switch(evento.keyCode){
            case 37:
                posicion=3;
                break;
            case 39:
                posicion=0
                break
        }
        seleccion[posicion].style.background="red";
    }else{
        switch(evento.keyCode){
            case 37:
                seleccion[posicion].style.background="white"; 
                posicion--;
                if(posicion<0) posicion=3
                break;
            case 39:
                seleccion[posicion].style.background="white"; 
                posicion++
                if(posicion>3) posicion=0
                break
        }
        seleccion[posicion].style.background="red"; 
    }
}
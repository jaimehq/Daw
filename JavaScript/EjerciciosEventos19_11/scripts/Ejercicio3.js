document.addEventListener("keydown", moverSeleccion);
document.addEventListener("keydown",lanzarPelota);

let y;
let seleccion=[futbol, basket,tenis, rugby];
let pelotas=[pelotaF, pelotaB, pelotaT,pelotaR];
let posicion;
let intervalo;


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
        intervalo=setInterval(caerPelota,20);        
    }
} 
 function caerPelota(){     
    y+=10;
    pelotas[posicion].style.top=`${y}px`;
    if (y>=700)
        clearInterval(intervalo); 
    
} 
function moverSeleccion(evento){
    let marcado=false;
    seleccion.forEach(deporte => {        
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
import {form as formulario} from "script/datosJorge.mjs";
guardar.onclick=almacenar;
mostrar.onclick= asignar;

function almacenar(){    
    let arrayColor=[];
    formulario.forEach(control => {
        arrayColor.push(control.value)        
    });
    localStorage.setItem("arrayColor",arrayColor)
}
function asignar(){
    let arrayColor=JSON.parse(localStorage.getItem("arrayColor"));
    let aAsignados=[col1,col2,col3];
    if(arrayColor.lenght===3){
        aAsignados.forEach(function (element,indice ) {
            element.style.background= arrayColor[indice]
        });
    }
}
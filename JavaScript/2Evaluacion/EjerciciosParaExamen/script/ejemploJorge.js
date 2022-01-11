import {form as formulario} from "./datosJorge.js";
guardar.onclick=almacenar;
mostrar.onclick= asignar;

function almacenar(){   
    debugger 
    let arrayColor=[];
    formulario.forEach(control => {
        arrayColor.push(control.value)        
    });
    debugger
    localStorage.setItem("arrayColor",JSON.stringify(arrayColor))
}
function asignar(){
    //debugger
    let arrayC=[];
    arrayC = JSON.parse(localStorage.getItem("arrayColor"));
    let aAsignados=[col1,col2,col3];

    //debugger
    if(arrayC.length===3){
        //debugger
        arrayC.forEach(function (element,indice ) {            
            aAsignados[indice].style.background= element
            debugger
        });
    }
}
div1.addEventListener("click",accion);
div2.addEventListener("click",accion);
tabla.addEventListener("click",accion);
fila.addEventListener("click",accion);
col1.addEventListener("click",accion);
col2.addEventListener("click",accion);
col3.addEventListener("click",accion);
//con el true cambia el orden de propagacion de bubbling a lo otro
function accion(evento){
    visor.innerHTML+=`${evento.currentTarget.tagName}<br>`
    if(evento.currentTarget.tagName==="TABLE")
        evento.stopPropagation();
}
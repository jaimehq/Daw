let pelota=document.querySelector("img");
document.addEventListener("keydown", muevoBola);
document.addEventListener("keydown", tamano);
let intervalo=setInterval(muevoBola,20,evento);
let intervalo2=setInterval(tamano,20,evento);
/* function ciclo(evento){
    let x=pelota.offsetLeft;
    let y=pelota.offsetTop;
    //debugger;
    //arriba 38 abajo 40 izq 37 der 39
    switch(evento.keyCode){
        //debugger;
        case 38:
            y-=1;
            pelota.style.top=`${y}px`;
            break;
        case 39:
            x+=1;
            pelota.style.left=`${x}px`;
            break;
        case 40:
            y+=1;
            pelota.style.top=`${y}px`;
            break;
        case 37:
            x-=1;
            pelota.style.left=`${x}px`;
            break;
        default:
            //debugger
            break;

    }
} */
function tamano(evento){
    //let codigotecla=evento.keyCode; 
    //189 = -
    //187 = +
    let tamano=pelota.width;
    switch(evento.keyCode){
        case 189:
            pelota.width=tamano-5
            break;
        case 187:
            pelota.width=tamano+5
            break
    }
}
function muevoBola(evento){   

     //let codigotecla=evento.keyCode;
    //let tecla=evento.key;
    let x=pelota.offsetLeft;
    let y=pelota.offsetTop;
    //debugger;
    //arriba 38 abajo 40 izq 37 der 39
    switch(evento.keyCode){
        //debugger;
        case 38:
            y-=5;
            pelota.style.top=`${y}px`;
            break;
        case 39:
            x+=5;
            pelota.style.left=`${x}px`;
            break;
        case 40:
            y+=5;
            pelota.style.top=`${y}px`;
            break;
        case 37:
            x-=5;
            pelota.style.left=`${x}px`;
            break;
        default:
            //debugger
            break;

    } 
}
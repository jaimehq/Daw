let pelota=document.querySelector("img");
document.addEventListener("keydown", muevoBola)

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
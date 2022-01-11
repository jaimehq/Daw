/**
 * 1º crear la clase de objeto de tragapeerras con el id, src, pts
 * La puntuación dependerá si el resultado tiene los 3 logos iguales tanto de forma horizontal como diagonal optiene x 3;
 * si tiene 2 los pts x 2;
 * Para complicarlos más importaremos el array de las imagenes;
 * Se para el aleatorio al clicar el boton
 * si se consigue 2 o 3 iguales, el fondo se ilumina
 * Se puede tirar un máximo de 5 tiaradas y la puntuacion se almacenará en el Almacenmaiento local
 */

//1º paso insertar las imagenes en los td de forma random y de forma de hijo al td
import { Slots } from "./imgTragaperras.js"; //importados
let tabla = document.querySelector("table");
let celdas = document.querySelectorAll("td");
let girar = document.querySelector("#girar");
let parar = document.querySelector("#parar");
let intervalos = []; //array de intervalos
let Intervalo;
let puntosTotales=0;
let Puntuacion=[];
let contador = 0; //Contador boton para el boton girar
let Win=false;
FinJuego.disabled=true;//se mantendrá deshabilitado y se activará solo cuando tenga 50 puntos o más
/**
 * El objetivo de girar es que se muestren de forma aleatoria en cada uno de los td
 * Hay que recorrer el array de los tds y crear un elemento imagen dependiendo del numero que ha tocado
 */

girar.onclick = girarSlots;

function leer() {
  let tBody = tabla.firstElementChild;
  let filas = tBody.childNodes; //Los hijos del body aquí están los tr;
  console.log(filas);
  //En vez de nodeType!=3 se puede hacer un replaceNode
  filas.forEach((F) => {
    if (F.nodeType != 3) {
      if (F.hasChildNodes) {
        let Celdas = F.childNodes;
        console.log(Celdas);
        Celdas.forEach((C) => {
          if (C.nodeType != 3) {
            //distinto a 3 porque 3 es textNode

            let Random = Math.floor(Math.random() * 8);
            console.log(Random); //Nos muestre el nº que ha salido
            let Slot = document.createElement("img"); //se crea la imagen
            //se añaden los atributos
            Slot.setAttribute("src", Slots[Random].src);
            Slot.setAttribute("alt", Slots[Random].alt);
            Slot.setAttribute("value", Slots[Random].pts);

            console.log(Slot);
            console.log(C);
            C.appendChild(Slot);
          }
        });
      }
    } //creo que no hace falta nextELment Sibling
  });

  /**
   * vamos a ir tr por tr cogemos los chilnodes hasta que sea null y si es null pasamos al next Element sibling
   */
}
parar.onclick = function () {
 
  parar.disabled = true;
  girar.disabled = false;
  clearInterval(Intervalo);
  celdas.forEach((C) => {
    C.style.backgroundImage = "none";
    C.style.backgroundColor = "white";
  });

  leer();

  BuscarPremio();
  //Puntaje()
};
function vaciar() {
  celdas.forEach((C) => {
    C.style.backgroundImage = "none";
    C.style.backgroundColor = "white";
  });
  let tBody = tabla.firstElementChild;
  let filas = tBody.childNodes; //Los hijos del body aquí están los tr;
  
  //En vez de nodeType!=3 se puede hacer un replaceNode
  filas.forEach((F) => {
    if (F.nodeType != 3) {
      if (F.hasChildNodes) {
        let Celdas = F.childNodes;
        console.log(Celdas);
        Celdas.forEach((C) => {
          if (C.nodeType != 3) {
            if (C.hasChildNodes) {
              C.removeChild(C.firstChild);
            }
          }
        });
      }
    }
  });
  /**
   * En esta funcion buscamos las imagenes y las borramos. De momento es para el boton de girar
   */
}
function BuscarPremio() {
  /**
   * Recorre tr x tr si los 3 son el mismo alt;
   * Luego mira a ver si existe la combinación en diagonal
   */

  let tBody = tabla.firstElementChild;
  let filas = tBody.childNodes; //Los hijos del body aquí están los tr;
  console.log(filas);
  //En vez de nodeType!=3 se puede hacer un replaceNode
  filas.forEach((F) => {
    if (F.nodeType != 3) {
      if (F.hasChildNodes) {
        /**
         * Hay que buscar el nextElementSibling aquí
         */

        let contadorH = 0;
        let Celdas =F.childNodes;
        console.log(Celdas)
        let ArrayGanador=[]; //Le hemos cambiado el array aquí
        let ArrayIzd=[];
        let ArrayDcha=[];
        Celdas.forEach((C) => {
       
         if (C.nodeType != 3) {
            let X = C.firstChild;
           
            ArrayGanador.push(X.alt); //introducimos el primer elemento
            console.log(ArrayGanador);
            //Hacer el every
            if(ArrayGanador.length===3){ //cambiar Esto
                 Win=ArrayGanador.every(function(X, index, ArrayGanador){ //el elemento, index y arr de array
                 if(index===0){
                   return true;
                 }else{
                  console.log("Entra");   
                  console.log(ArrayGanador[index])   
                    return (X === ArrayGanador[index - 1]);
                 }
                });
                console.log(Win);
              

                if(Win==true){
                  console.log(C.parentNode);
                 let FilaColorear=C.parentNode;
                
                  let colorear=FilaColorear.childNodes;
                  colorear.forEach(color => {
                    console.log(color)
                    if(color.nodeType!=3){
                    color.style.backgroundColor="red";
                    }
                  });
                
                    /**
                     * Para saber los diagonales tenemos que coger el firstChild del firstChild(0) de tbody
                     * firtchlid(1) de fristChild(1) de tbody
                     * firstChild(2) de firstChild(2) de tbody
                     */
                    
                   alert(`Línea de ${X.alt} has conseguido ${X.getAttribute('value')} puntos`)
                   Resultado.innerHTML=`Línea de ${X.alt} has conseguido ${X.getAttribute('value')} puntos`;
                   Puntuacion.push(X.getAttribute('value'));
                      if (X.alt==="heart") {
                        alert(
                          "Hay 3 Corazones seguidos por lo que tienes una tirada extra"
                        );
                        girarSlots();
                      }
                }//fin win true
                
            }//fin del tamaño 3
             
             //   console.log(C.nextElementSibling.firstChild.alt); //Esta bien seguramente se recorra con un dowhile
          
           
            /**  else if(C.every(X.alt===C.nextSibling.firstChild.alt))
                    } */
          }//nodeType!=3
          if(ArrayGanador.length>=3){
            ArrayGanador=[];//se vacía
            
          }
        });//forEach
        if(Win==false){
          diagonalIzd(ArrayIzd);
        diagonalDcha(ArrayDcha);
      }
    }
  }
  });
}

function diagonalIzd (ArrayIzd) {
  let tBody = tabla.firstElementChild;
  let filas = tBody.childNodes;
  console.log(filas.childNodes);
  console.log(filas);
  console.log(filas[2]);
  console.log(filas[0].childNodes[1]);
  let valor1,valor2,valor3;
  valor1=filas[0].childNodes[1].firstChild.alt;
  valor2=filas[2].childNodes[3].firstChild.alt;
  valor3=filas[4].childNodes[5].firstChild.alt;
  console.log(valor1)
  console.log(valor2+" sería "+filas[2].childNodes[3].firstChild.getAttribute(`value`));
  console.log(valor3)
ArrayIzd.push(valor1,valor2,valor3);
if(ArrayIzd.length===3){ //cambiar Esto
  Win=ArrayIzd.every(function(X, index, ArrayIzd){ //el elemento, index y arr de array
  if(index===0){
    return true;
  }else{
   console.log("Entra");   
   console.log(ArrayIzd[index])   
     return (X === ArrayIzd[index - 1]);
  }
 })
}
if(Win==true){
  filas[0].childNodes[1].style.backgroundColor="red";
  filas[2].childNodes[3].style.backgroundColor="red";
  filas[4].childNodes[5].style.backgroundColor="red";
     
  alert(`Línea de ${valor1} has conseguido ${filas[2].childNodes[3].firstChild.getAttribute(`value`)} puntos`)
  Resultado.innerHTML=`Línea de ${valor1} has conseguido ${filas[2].childNodes[3].firstChild.getAttribute(`value`)} puntos`;
  Puntuacion.push(filas[2].childNodes[3].firstChild.getAttribute(`value`));
     if (valor1==="heart") {
       alert(
         "Hay 3 Corazones seguidos por lo que tienes una tirada extra"
       );
       girarSlots();
     }
}
  
  /**
   * Función para comprobar si hay 3 corazones en diagonal o en horizontal
   */
}
function diagonalDcha (ArrayDcha) {
  let tBody = tabla.firstElementChild;
  let filas = tBody.childNodes;
  console.log(filas.childNodes);
  console.log(filas);
  console.log(filas[2]);
  console.log(filas[0].childNodes[1]);
  let valor1,valor2,valor3;
  valor1=filas[4].childNodes[1].firstChild.alt;
  valor2=filas[2].childNodes[3].firstChild.alt;
  valor3=filas[0].childNodes[5].firstChild.alt;
  
  ArrayDcha.push(valor1,valor2,valor3);
if(ArrayDcha.length===3){ //cambiar Esto
  Win=ArrayDcha.every(function(X, index, ArrayDcha){ //el elemento, index y arr de array
  if(index===0){
    return true;
  }else{
   console.log("Entra");   
   console.log(ArrayDcha[index])   
     return (X === ArrayDcha[index - 1]);
  }
 })
}
if(Win==true){
  filas[4].childNodes[1].style.backgroundColor="red";
  filas[2].childNodes[3].style.backgroundColor="red";
 filas[0].childNodes[5].style.backgroundColor="red";
     
  alert(`Línea de ${valor1} has conseguido ${filas[2].childNodes[3].firstChild.getAttribute(`value`)} puntos`)
  Resultado.innerHTML=`Línea de ${valor1} has conseguido ${filas[2].childNodes[3].firstChild.getAttribute(`value`)} puntos`;
  Puntuacion.push(filas[2].childNodes[3].firstChild.getAttribute(`value`));
     if (valor1==="heart") {
       alert(
         "Hay 3 Corazones seguidos por lo que tienes una tirada extra"
       );
       girarSlots();
     }
}
  
  /**
   * Función para comprobar si hay 3 corazones en diagonal o en horizontal
   */
}
function Puntaje() {
  /**
   * Recoge los puntos que se han hecho en la tirada y los va sumando a un array
   * A partir de la 5ª tirada se para el juego se añade nombre se sube puntuación al storage local
   * Expansion: a una Base de datos
   */
    puntosTotales=0;
 Puntuacion.forEach(function(a) {
   puntosTotales+=Number(a);
 });
 if(puntosTotales>=10){
   FinJuego.disabled=false;
 }
  Resultado.innerHTML=`LLEVA ${puntosTotales} PUNTOS  y ${contador} tiradas`;
}
function girarSlots() {
  girar.disabled = true;
  parar.disabled = false;
  FinJuego.disabled=true; //cuando gira se bloquea
  if (contador != 0) {
    //si no es la 1ª vez se vacía de imagenes
    Puntaje();
    vaciar();
 
  }
  Intervalo = setInterval(function () {
    let tBody = tabla.firstElementChild;
    let filas = tBody.childNodes; //Los hijos del body aquí están los tr;

    //En vez de nodeType!=3 se puede hacer un replaceNode
    filas.forEach((F) => {
      if (F.nodeType != 3) {
        if (F.hasChildNodes) {
          let Celdas = F.childNodes;

          Celdas.forEach((C) => {
            if (C.nodeType != 3) {
              let Random = Math.floor(Math.random() * 8);
              C.style.backgroundImage = `url(${Slots[Random].src})`;
              C.style.backgroundSize = `cover`;
            }
          });
        }
      }
    });
  }, 20);
  //Cambiarlo en pagar ya que aqui se mostrará de forma aleatoria las iamgenes
  intervalos.push(Intervalo);
  contador++;
}
FinJuego.onclick=loguear;
function loguear(){
  /**
   * El usuario se intorudce en el almacenamiento local a través de un prompt
   * 
   */
 
  let e=/\s/g;
  let nombre;
  let error=false
  do{  error=false;
     nombre=prompt("Inserte su ID");
    let comprobacion=e.exec(nombre);
    console.log(comprobacion);
  if(nombre.trim==null || comprobacion!==null){
    error==true;
    alert("Error, inserte un ID válido");
  }
}while(error==true);
//Hay que mirar si en el Almacenamiento local esta ese usuario y si no se crea
let ArrayPuntuacionesLS=[];
if(localStorage.getItem(nombre)==null){
  //se crea uno nuevo
  localStorage.setItem(nombre,JSON.stringify(ArrayPuntuacionesLS)); //se le da un array
}
else{
  let nube=localStorage.getItem(nombre);
 ArrayPuntuacionesLS=JSON.parse(nube);
 console.log("Lllega hasta el fin del juegop")
 console.log(puntosTotales);
  ArrayPuntuacionesLS.push(puntosTotales);
localStorage.setItem(nombre,JSON.stringify(ArrayPuntuacionesLS));
}
vaciar();
alert("Gracias por Jugar");
girar.disabled = true;
parar.disabled = true;
FinJuego.disabled=true;
document.close();
}
class Barco{
  constructor(tamanoB,indiceY,indiceX,direccion){
    this.tamanoB=tamanoB;
    this.indiceX=indiceX;
    this.indiceY=indiceY;
    this.direccion=direccion;
  }
}
let barcosColocados=[];
let tamano,tamanoTabla;
let direccion;
//let x,y;
function crearElemento(tipo, arrayAtributo, arrayTipo, texto) {
  let nodo = document.createElement(tipo);
  if (arrayAtributo != null && arrayTipo != null) {
    arrayAtributo.forEach((atributo, indice) => {
      nodo.setAttribute(atributo, arrayTipo[indice]);
    });
  }
  if (texto != null) {
    nodo.innerText = texto;
  }
  return nodo;
}

function crearTabla(numCeldas) {
  let tablaFragment = document.createDocumentFragment();
  let fila = crearElemento("tr");
  let celdaTitulo;
  let celda;
  if (numCeldas < 4) {
    numCeldas = 4;
  } else if (numCeldas > 10) {
    numCeldas = 10;
  }
  tamanoTabla=numCeldas;
  for (let i = 0; i < numCeldas + 1; i++) {
    if (i === 0) {
      celdaTitulo = crearElemento("td", ['class'], ['titulo']);
    } else {
      celdaTitulo = crearElemento("td", ['class'], ['titulo'], i - 1);
    }
    fila.appendChild(celdaTitulo);
  }
  tablaFragment.appendChild(fila);
  for (let i = 0; i < numCeldas; i++) {
    fila = crearElemento("tr");
    for (let j = 0; j < numCeldas + 1; j++) {
      if (j === 0) {
        celda = crearElemento("td", ['class'], ['titulo'], i);
      } else {
        celda = crearElemento("td", ["class"], [`${i}${j - 1}`]);
      }
      fila.appendChild(celda);
    }
    tablaFragment.appendChild(fila);
  }
  return tablaFragment;
}

aceptar.addEventListener("click", empezar);
function empezar() {
  tamanoTabla = Number(inputTamano.value);
  $('#seleccionTamaño').remove();
  tablita.appendChild(crearTabla(tamanoTabla));
  document.body.appendChild(document.getElementById('plantilla').content)
  $('#colocar').on('click', predecirBarcoGestion)
}
function predecirBarcoGestion() {
  tamano = tamanoBarco.value;
  direccion = '';
  if (tamano > 4) tamano = '4'
  else if (tamano < 1) tamano = '1';
  let direcciones = document.getElementsByName('direccionBarco')
  direcciones.forEach(dir => {
    if (dir.checked) direccion = dir.value
  })
  $('td').on('mouseover', imprimirBarcoFantasma)
  $('td').on('mouseleave', limpiarBarcosFantasma)
  $('td').on('click', colocarBarcoGestion)
}
function colocarBarcoGestion(){
  
  if($(this).attr('class')!='titulo'){
    let x=$(this).index();
    let y=$(this).parent().index();
    colocarBarco(tamano,y,x,direccion);
  }
}
function limpiarBarcosFantasma() {
  //debugger
  $('td').filter('.fantasma').attr('class', '')
}
function imprimirBarcoFantasma() {  
  if ($(this).attr('class') != 'titulo') {
    let indice = $(this).index()
    if (direccion == 'derecha') {
      switch (tamano) {
        case '4':
          $(this).next().next().next().filter(':not(.colocado)').attr('class', 'fantasma')
        case '3':
          $(this).next().next().filter(':not(.colocado)').attr('class', 'fantasma')
        case '2':
          $(this).next().filter(':not(.colocado)').attr('class', 'fantasma')
        case '1':
          $(this).filter(':not(.colocado)').attr('class', 'fantasma')
          break
      }

    }
    if (direccion == 'abajo') {
      switch (tamano) {
        case '4':
          $(this).parent().next().next().next().children().eq(indice).filter(':not(.colocado)').attr('class', 'fantasma')
        case '3':
          $(this).parent().next().next().children().eq(indice).filter(':not(.colocado)').attr('class', 'fantasma')
        case '2':
          $(this).parent().next().children().eq(indice).filter(':not(.colocado)').attr('class', 'fantasma')
        case '1':
          $(this).filter(':not(.colocado)').attr('class', 'fantasma')
          break
      }

    }
  }
}
function colocarBarco(tamanoBarco, fila, columna, direccion) {  
  tamanoBarco=Number(tamanoBarco)
  if(comprobarValidez(tamanoBarco, fila, columna, direccion)){
    barcosColocados.push(new Barco(tamanoBarco, fila, columna, direccion))
    $('td').filter('.fantasma').attr('class','colocado')
  }else{
    //hacer algo que avise
  }
}
function comprobarValidez(tamanoBarco, fila, columna, direccion){
  //debugger
  let valido=false;
  if(direccion==='derecha'){
    if((tamanoTabla+1)>=(tamanoBarco+columna))
      valido=true
  }
  else if(direccion==='abajo'){
    if((tamanoTabla+1)>=(tamanoBarco+fila))
      valido=true
  }
  return valido
}
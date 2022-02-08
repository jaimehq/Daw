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
  for (let i = 0; i < numCeldas + 1; i++) {
    if (i === 0) {
      celdaTitulo = crearElemento("td");
    } else {
      celdaTitulo = crearElemento("td", [], [], i - 1);
    }
    fila.appendChild(celdaTitulo);
  }
  tablaFragment.appendChild(fila);
  for (let i = 0; i < numCeldas; i++) {
    fila = crearElemento("tr");
    for (let j = 0; j < numCeldas + 1; j++) {
      if (j === 0) {
        celda = crearElemento("td", [], [], i);
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
  let tamano = Number(inputTamano.value);
  $('#seleccionTamaño').remove();
  debugger;
  tablita.appendChild(crearTabla(tamano));
  document.body.appendChild(document.getElementById('plantilla').content)
  $('#colocar').on('click',colocarBarcoG)
}
function colocarBarcoG(){
    let tamano= tamanoBarco.value;
    if(tamano>4) tamano=4
    else if(tamano<1) tamano=1;
    let direccion=getElementsByName('direccionBarco')
    debugger
}
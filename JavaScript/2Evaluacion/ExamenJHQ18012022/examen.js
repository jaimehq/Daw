
//la funcion buscar nos creara las tablas de los libros del texto buscado
function buscar() {
    //primero declaramos el array de libros byscados y lo validamos mostrando en caso
    //de error el mensaje solicitado
  let arrayBuscados = [];
  titulo.value = titulo.value.trim();
  if (titulo.validity.valueMissing) {
    caja.innerText =
      "Se requiere algun caracter de busqueda que no esté en blanco";
  } else {//si es valido recorremos los libros buscando los que tengan el parametro y lo metemos al array
    Object.values(libros).forEach((libro) => {
      if (libro.titulo.includes(titulo.value)) arrayBuscados.push(libro);
    });
    if (arrayBuscados.length != 0) crearTablaLibros(arrayBuscados);//si se han encontrado alguno se crea la tabla
    else caja.innerText = "Titulo no encontrado";//en caso contrario mostramos el mensaje
  }
}
//la funcion pintar cambiara la clase de la fila para que se pinte de rojo
function pintar(evento) {
  if (evento.target.nodeName == "TD") {
    evento.target.parentElement.setAttribute("class", "sobreElla");
  }
}
//la funcion limpiar hara lo mismo que la anterior pero eliminando la clase para dejarla como estaba
function limpiar(evento) {
  if (evento.target.nodeName == "TD") {
    evento.target.parentElement.setAttribute("class", "");
  }
}
//esta funcion crea elementos indicandole su tipo atributos y texto, y se puede usar o con solo el tipo o con el tipo y los atributos y te devuelve un nodo completo
function crearElemento(tipoNodo, arrayAtributos, arrayValores, texto) {
  let nodo = document.createElement(tipoNodo);
  if (arrayAtributos != undefined || arrayValores != undefined) {
    arrayAtributos.forEach((atributo, indice) => {
      nodo.setAttribute(atributo, arrayValores[indice]);
    });
  }
  if (texto != undefined) {
    nodo.innerText = texto;
  }
  return nodo;
}
//con filtrar temas filtraremos los temas para que no se repitan y llamaremos a la funcion que crea el select
function filtrarTemas() {
    let temas = [];
  let arrayLibros = Object.values(libros);
  arrayLibros.forEach((libro) => {
    if (!temas.includes(libro.tema)) {
      temas.push(libro.tema);
    }
  });
  crearSelect(temas);
}
//crear select nos crea el select con los distintos temas pasandoselo por parametro
function crearSelect(temas) {
    //he creado un document fragment 
  let selectFragment = document.createDocumentFragment();
  let opcion;
  //recorremos todas los temas creando sus diferentes opciones
  temas.forEach((tema) => {
    opcion = crearElemento("option", ["value"], [tema], tema);
    selectFragment.appendChild(opcion);
  });
  opcion = crearElemento("option", ["value"], ["todos"], "Todos los libros");
  selectFragment.appendChild(opcion);
  losTemas.appendChild(selectFragment);
  //una vez agregado el fragment al DOM creeamos el Listener para que cuando cambie de valor nos muestre los libros
  losTemas.addEventListener("change", mostrarLibrosTemas);
}
//esta funcion muestra los libros dependiendo del tema seleccionado
function mostrarLibrosTemas() {
  let valor = losTemas.value;
  let librosPaMostrar;
        //si hay alguna tabla o mensaje lo borramos
  if (caja.firstElementChild != null) {
    caja.firstElementChild.remove();
  }
        //si no hemos seleccionado la primera opcion que es la de seleccionar o la ultima que es todos filtraremos los libros que queremos mostrar y crearemos la tabla
  if (valor != "" && valor != "todos") {
    librosPaMostrar = Object.values(libros).filter((libro) => {
      return libro.tema == valor;
    });
    crearTablaLibros(librosPaMostrar);
  } else if (valor === "todos") {//si elegimos todos pasamos a la funcion un array con todos los libros para que nos lo cree
    crearTablaLibros(Object.values(libros));
  }
}
//esta funcion crea la tabla con todos los libros ademas de dar estilo propios
function crearTablaLibros(libros) {
  let tabla = crearElemento("tabla", ["id"], ["tablaResultados"]);
  //he creado un fragment en vez de un shadow porque no he sabido como borrar ese shadow para cambiarlo por otro
  let fragment = document.createDocumentFragment();
  //con este array lo usaremos para recorrerlo y crear las celdas
  let atributosLibros = ["titulo", "tema", "autor", "editorial", "precio"];
  let estilos = crearElemento(
    "style",
    [],
    [],
    ".sobreElla{background-Color:red} #caja td{width: 200px;} "
  );
  let celdaTitulo = crearElemento("tr");  
  let libroTabla;
  let libroLinea;
  celdaTitulo.append(
    crearElemento('th', [], [], "TITULO"),
    crearElemento('th', [], [], "TEMA"),
    crearElemento('th', [], [], "AUTOR"),
    crearElemento('th', [], [], "EDITORIAL"),
    crearElemento('th', [], [], "PVP")
  );
  tabla.append(estilos,celdaTitulo)
  //borramos la caja por si tiene algun mensaje de la barra de busqueda
  caja.innerText = "";
  //vamos recorriendo el array que le hemos pasado creando las distintas filas
  libros.forEach((libro) => {
    libroLinea = crearElemento("tr");
    atributosLibros.forEach((atributo) => {
      libroTabla = crearElemento("td", [], [], libro[atributo]);
      libroLinea.appendChild(libroTabla);
    });
    tabla.appendChild(libroLinea);
  });
  //agregamos la tabla al fragment y despues al dom en el lugar que le corresponde
  fragment.appendChild(tabla);
  caja.appendChild(fragment);
}
// Aqui emieza el programa, empezamos creando los eventos y creando el select
caja.addEventListener("mousemove", pintar);
caja.addEventListener("mouseout", limpiar);
buscatitulo.addEventListener("click", buscar);
//con esta funcion filtraremos los temas y crearemos el select
filtrarTemas();

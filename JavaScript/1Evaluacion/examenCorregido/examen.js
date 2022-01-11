// Solución del examen del 29/10/2021

function agregar() {
  //Se crea un array para manejar más fácilmente los datos
  let datos = [
    formulario.nombreEvento.value,
    formulario.fechaEvento.value,
    formulario.horaInicioEvento.value,
    formulario.horaFinEvento.value,
  ];
  if (validar(...datos)) {
    //Si la validación es correcta
    let evento = new Evento(...datos); //se instancia un evento desde la clase
    agenda.push(evento); //se agrega un evento al array agenda

    //Se vacían los campos del formulario tras agregar un evento a la agenda

    for (campo in formulario) {
      formulario[campo].value = "";
    }
  } else {
    //Si la validación no es correcta
    let cadena = "";
    errores.forEach((error) => {
      cadena += `${error}\n`;
    });
    alert(cadena);
    errores.length = 0;
  }
}

function validar(nombre, fecha, horaInicio, horaFin) {
  let valido = true;
  let nombreRegExr = /\S+/;
  let fechaRegExr = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
  let [diaEv, mesEv, annoEv] = fecha.split("/");
  let hoy = new Date();
  let annoActual = hoy.getFullYear();

  //Estructura de decisión

  if (nombreRegExr.test(nombre) === false) {
    valido = false;
    errores.push("Nombre está vacío");
  }

  if (fechaRegExr.test(fecha) === false) {
    valido = false;
    errores.push("Fecha no tiene el formato correcto");
  }

  if (Number(diaEv) <= 0 || Number(diaEv) > 31) {
    valido = false;
    errores.push("El día de la fecha está fuera de rango");
  }

  if (Number(mesEv) < 0 || Number(mesEv) > 12) {
    valido = false;
    errores.push("El mes de la fecha está fuera  de rango");
  }

  if (Number(annoEv) < Number(annoActual)) {
    valido = false;
    errores.push("El año es inferior al actual");
  }

  if (
    Number(horaInicio) > Number(horaFin) ||
    Number(horaInicio) < 0 ||
    Number(horaInicio) > 24
  ) {
    valido = false;
    errores.push("Las horas del evento están mal puestas");
  }

  return valido;
}

function mostrar() {
  let capturaFecha = formulario.fechaEvento.value;
  let arrayRecorrer;
  let cadena = "<table><tr><td>Evento</td><td>Fecha</td><td>Duracion</td></tr>";

  //Selección del array que se va a recorrer para obtener el listado

  if (capturaFecha.trim() === "") {
    //Si el campo de la fecha está vacío el array a recorrer es la agenda completa
    arrayRecorrer = agenda;
  } else {
    //si el campo de la fecha no está vacío el array a recorrer se filtra con el valor del campo fecha
    arrayRecorrer = agenda.filter((evento) => {
      return evento.fecha === capturaFecha;
    });
  }

  //Recorrido del array para obtener el listado
  arrayRecorrer.forEach((evento) => {
    cadena += `<tr><td>${evento.nombre}</td><td>${evento.fecha}</td><td>${
      evento.horaFin - evento.horaInicio
    }h</td></tr>`;
  });
  cadena += "</table>";

  //Se muestra el listado
  document.getElementById("presentacion").innerHTML = cadena;
}

//Clase ES6 Evento
class Evento {
  constructor(nombre, fecha, horaInicio, horaFin, comentarios) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.comentarios = comentarios;
  }
}

//Espacio de nombres para los controles del formulario para manejar los datos de forma más fácil y estructurada
let formulario = {
  nombreEvento: document.getElementById("evento"),
  fechaEvento: document.getElementById("fecha"),
  horaInicioEvento: document.getElementById("horainicio"),
  horaFinEvento: document.getElementById("horafin"),
  comentariosEvento: document.getElementById("coment"),
};

let agenda = [];
let errores = [];

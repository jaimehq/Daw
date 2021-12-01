let comunidades = [
  "Castilla y León",
  "Andalucía",
  "Castilla-La Mancha",
  "Aragón",
  "Extremadura",
  "Cataluña",
  "Galicia",
  "Comunidad Valenciana",
  "Región de Murcia",
  "Principado de Asturias",
  "Comunidad Foral de Navarra",
  "Madrid",
  "Canarias",
  "País Vasco",
  "Cantabria",
  "La Rioja",
  "Islas Baleares",
  "Ceuta",
  "Melilla",
];
let listaProvincias = [
  [
    "Ávila",
    "Burgos",
    "León",
    "Palencia",
    "Salamanca",
    "Segovia",
    "Soria",
    "Valladolid",
    "Zamora",
  ],
  [
    "Almería",
    "Cádiz",
    "Córdoba",
    "Granada",
    "Huelva",
    "Jaén",
    "Málaga",
    "Sevilla",
  ],
  ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"],
  ["Huesca", "Teruel", "Zaragoza"],
  ["Badajoz", "Cáceres"],
  ["Barcelona", "Girona / Gerona", "Lleida / Lérida", "Tarragona"],
  ["A Coruña / La Coruña", "Lugo", "Ourense / Orense", "Pontevedra"],
  ["Alacant / Alicante", "Castelló / Castellón", "València / Valencia"],
  ["Región de Murcia"],
  ["Principado de Asturias"],
  ["Comunidad Foral de Navarra"],
  ["Madrid"],
  ["Las Palmas", "Santa Cruz de Tenerife"],
  ["Araba / Álava", "Gipuzkoa / Guipúzcoa", "Bizkaia / Vizcaya"],
  ["Cantabria"],
  ["La Rioja"],
  ["Islas Baleares"],
  ["Ceuta"],
  ["Melilla"],
];
let comunidadesS = document.getElementById("comunidadesS");
comunidades.forEach(function (comunidad) {
  comunidadesS.innerHTML += `<option value="${comunidad}">${comunidad}</option>`;
});
comunidadesS.addEventListener("change", mostrarProvincias);
function mostrarProvincias() {
  comunidadesS = document.getElementById("comunidadesS");
  let seleccionada = comunidadesS.selectedIndex
  provincias.innerHTML=`<option value="">Seleccione una provincia</option>`;
  listaProvincias[seleccionada-1].forEach(element => {
    provincias.innerHTML += `<option value="${element}">${element}</option>`;
  });
}

colores.addEventListener("change",cambioColor)

function cambioColor(){
  redM.innerText=` Red: ${red.value}`;
  greenM.innerText=` Green: ${green.value}`;
  blueM.innerText=` Blue: ${blue.value}`;
 color.style.background=`rgb(${parseInt(red.value)},${parseInt(green.value)},${parseInt(blue.value)})`;
 
}
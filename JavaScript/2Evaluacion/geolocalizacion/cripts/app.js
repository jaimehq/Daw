function peticionDeDatos(fuenteDeDatos, funcionTto) {
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", function() {
        funcionTto(ajax);
    });
    ajax.open("GET", fuenteDeDatos)
    ajax.send();
}
//de donde viene el parametro? es lo que devuelve el php??
function funcionTtoEventos(xhr) {
    let fragment=document.createDocumentFragment();
    let eventos = JSON.parse(xhr.responseText);
    let eventosArray =  eventos.records;
    eventosArray.forEach(evento => {
        let latitud = evento.fields.latitud;
        let longitud = evento.fields.longitud;
        let iframe=document.createElement("iframe");
        iframe.setAttribute("src",`https://www.openstreetmap.org/export/embed.html?bbox=${longitud}%2C${latitud}&amp;layer=mapnik`)
        iframe.setAttribute("width", 450);
        iframe.setAttribute("height", 350);
         fragment.append(iframe);
    });
    document.getElementById("visor").append(fragment)
    console.log(eventos);
}
peticionDeDatos("app.php", funcionTtoEventos);

let key = 'AIzaSyAsYjE7aJ6iWeK0ow4vjvQlCEFgNAQxu_0';
let channelID = 'UCcLmgghh3T7dcv5Qx6e9mGQ';
let nResultados = 50;
let nombre = 'videosSezar'
descargar.addEventListener('click', guardar);
function guardar() {
    let ajax = new XMLHttpRequest();
    let url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${nResultados}`
    ajax.addEventListener('readystatechange', ttoDatos)
    ajax.open('GET', url)
    ajax.send();

    function ttoDatos() {
        if (ajax.status === 200 && ajax.readyState === 4) {
            let datos = ajax.responseText;
            obtenerDatosVideso(datos);

        }
    }
    function obtenerDatosVideso(datosAjax) {
        let datosJson = JSON.parse(datosAjax);   
        let videos = datosJson.items;
        almacenarEnLocal(nombre,videos)
    }
    function almacenarEnLocal(nombre, arrayDatos) {
        localStorage.setItem(nombre, JSON.stringify(arrayDatos));
    }
}
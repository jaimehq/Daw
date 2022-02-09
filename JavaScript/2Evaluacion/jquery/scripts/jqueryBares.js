$.getJSON("https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-turismo-de-castilla-y-leon&q=&rows=2090&facet=establecimiento&facet=provincia&facet=municipio&refine.provincia=Valladolid&refine.municipio=Valladolid&refine.establecimiento=Bares",
    function (respuesta) {
        $.each(respuesta.records, function (indice, bar) { 
             let parrafo=$('<p/>').text(`${bar.fields.nombre} esta en la direccion: ${bar.fields.direccion}`);
             $('#visor').append(parrafo);
        });
    }
);
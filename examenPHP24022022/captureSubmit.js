//Jaime Hernansanz

$('#enviar').on('click',capturarDatos);
function capturarDatos(){
    console.log($('#numerito').val())
    let valorNumerico=$('#numerito').val();
    $.post("service.php",{numero : valorNumerico},
        function (data) {
           data
           $('#salida').val(data)
        },
    );
    
}
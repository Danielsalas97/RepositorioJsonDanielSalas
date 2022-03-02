$(document).ready(function () {
    cargarTabla();

}//fin del function

);
$(document).on('click', '#btn-Editar', function () {
    var boton = document.getElementById('btnenviar');
    boton.innerHTML = 'Actualizar';

    var fila = $(this).closest("tr");
    var ida = fila.find("td:eq(0)").text();
    var dorsal = fila.find("td:eq(2)").text();
    var edad = fila.find("td:eq(3)").text();
    var nombre = fila.find("td:eq(4)").text();
    $('#txtNombre').val(nombre);
    $('#txtDorsal').val(dorsal);
    $('#txtEdad').val(edad);
    $('#txtId').val(ida);
});//fin del document click btn-editar

//inicio del document click btn-eliminar
$(document).on('click', '#btn-Eliminar', function () {

    var repuesta = confirm("¿Realmente desea eliminar?");
    if (repuesta) {
        var fila = $(this).closest("tr");
        var idv = fila.find("td:eq(0)").text();
        enviar_Post(idv, "", "eliminar");
        cargarTabla();
    } else {
        alert("No elimino Jugador");
    }
    cargarTabla();
});


//function eliminar
function Eliminar() {
    $.post('NewServlet2?menu=players', {accion: 'Eliminar', id: ""},
            function (response) {
                cargarTabla();
                alert(response);
            });

}//fin de eliminar


function cargarTabla() {

    $.post('NewServlet2?menu=players',
            {accion: "listar",
                id: 0},
            function (response) {

                var tabla = "";
                // console.log(Object.values(response).map(({ value}) => value));
                //console.log(response);
                var i = 1;
                response.forEach(function (p) {
                    tabla += '<tr>';
                    tabla += '<td hidden="true">' + p.id + '</td>';
                    tabla += '<td>' + i + '</td>';
                    tabla += '<td>' + p.dorsal + '</td>';
                    tabla += '<td>' + p.edad + '</td>';
                    tabla += '<td>' + p.Nombre + '</td>';
                    tabla += '<td>' + '<a class="btn btn-danger"  id="btn-Eliminar">Eliminar</a>' + '</td>';
                    tabla += '<td>' + '<a class="btn btn-warning"  id="btn-Editar">Editar</a>' + '</td>';
                    tabla += '</tr>';
                    i = i + 1;
                });
                $('#tb-players').html(tabla);
            });
}//fin de cargar tabla

function clear_txt() {
    $('#txtNombre').val("");
    $('#txtDorsal').val("");
    $('#txtEdad').val("");
    $('#txtId').val("");
}//fin del cargar  tabla


//inicio de la function clear_txt
function clear_txt() {
    $('#txtNombre').val("");
    $('#txtDorsal').val("");
    $('#txtEdad').val("");
    $('#txtId').val("");
}//fin de la function clear txt

//inicio de la function enviar_post
function enviar_Post(id, jsonString, accion) {
    $.post('NewServlet2?menu=players',
            {json2: jsonString,
                accion: accion,
                id: id},
            function (response) {
                alert(response);
            });
}//fin de la function enviar_post



function enviar() {
    //alert("Hola me estoy enviando a la vista");

    var equipo = {}; //declarando un objeto
    var boton = document.getElementById('btnenviar');
    var jugadores = [];
    equipo.jugadores = jugadores;
    //console.log(nuncamis +" es la camisera");

    //console.log('hola estoy enviando a la consola'); para ver desde el controlador

    var dorsal = document.getElementById("txtDorsal").value;
    //console.log(nuncamis +" es la camisera");
    var nombre = document.getElementById("txtNombre").value;
    var edad = document.getElementById("txtEdad").value;
    //document.getElementById("txtDorsal").value = "5";
    //document.getElementById("txtNombre").value = "Iniesta";
    //document.getElementById("txtEdad").value="30";
    var jugador = {
        "dorsal": dorsal,
        "nombre": nombre,
        "edad": edad
    };
    equipo.jugadores.push(jugador);
    // var tecnico= "Reinaldo";
    //equipo.jugadores[0].tecnico=tecnico;
//console.log(jugador);



    var jsonString = JSON.stringify(equipo);
    cargarTabla();
    cargarTabla();
    //console.log(jsonString);
    //   $.post('NewServlet2?menu=players',
    //   {json2: jsonString,
    //  accion: "guardar"},
    //  function (response) {
    //console.log(response);
    //  alert(response);

    /* document.getElementById("txtNombre").value =response;
     document.getElementById("txtDorsal").value ="";
     document.getElementById("txtEdad").value ="";*/
    //  });




    //console.log(jsonString);
//alert(jsonString);

    // cargarTabla();
    //cargarTabla();

    if (boton.innerHTML === 'Guardar') {
        enviar_Post(0, jsonString, "guardar");

        clear_txt();
        cargarTabla();

        cargarTabla();
    } else {
        var boton = document.getElementById('btnenviar');
        boton.innerHTML = 'Guardar';
        var id = document.getElementById("txtId").value;
        enviar_Post(id, jsonString, "editar");
        cargarTabla();
        clear_txt();
        cargarTabla();
    }
    cargarTabla();

}//fin de la function enviar



<?php
// Necesario para conectar con la base de datos
function conn(){
    $hostname = "localhost";
    $usuariodb = "root";
    $passworddb = "";
    $dbname = "cartónboxd";
// genera conexion al servidor
    $conectar = mysqli_connect($hostname, $usuariodb, $passworddb, $dbname);

//verificar conexion
    if(!$conectar){
        die("Error de conexión: " . mysqli_connect_error());
    }

    return $conectar;
    }
?>

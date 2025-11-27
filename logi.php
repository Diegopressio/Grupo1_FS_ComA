<?php

include_once('bd.php');
$conectar= conect();
//$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar 

if(isset($_POST['ingresar'])) {

    if(empty($_POST['username']) and empty($_POST['password'])) {
       die("Todos los campos son obligatorios.");

    } else {
        $username = $_POST['username'];
        $password = $_POST['password'];

        
    $sql=$conectar->query("SELECT * FROM datos WHERE Usuario='$username' and contraseña='$password'") ;
    
    
if ($datos=$sql->fetch_object()) {
        header("Location: /PRUEBA/HTML/index.html");
         echo '<li> <style> .item { display:flex; } </style> </li>';
        exit();
    } else {
        header("Location: /PRUEBA/HTML/login.html");
        exit();
        
    }
/* 
    if($datos=$sql->fetch_object()) {
        header("Location: /PRUEBA/HTML/index.html");
        exit();
    } else {
        echo '<div class="alert alert-danger">ACCESO DENEGADO!</div>';
        //exit(); */
    }
}


?>
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

    $isAjax = false;
    if (isset($_POST['ajax']) && $_POST['ajax'] == '1') $isAjax = true;
    if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) $isAjax = true;

    if ($datos=$sql->fetch_object()) {
        if ($isAjax) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => true, 'user' => $username]);
            exit();
        } else {
            // Redirect to index (non-AJAX fallback)
            $safeUser = urlencode($username);
            header("Location: /PRUEBA/HTML/index.html?user=$safeUser");
            exit();
        }
    } else {
        if ($isAjax) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
            exit();
        } else {
            header("Location: /PRUEBA/HTML/login.html");
            exit();
        }
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
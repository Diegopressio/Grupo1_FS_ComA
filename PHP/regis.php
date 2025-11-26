<?php
include_once('db.php');
$conectar=conn(); //ejecuto funcion de db.php para conectar BD

//Recibo los datos
$username = mysqli_real_escape_string($conectar, $_POST['username']);
$email = mysqli_real_escape_string($conectar, $_POST['email']);
$clave = mysqli_real_escape_string($conectar, $_POST['clave']);
$clave = password_hash($_POST['clave'], PASSWORD_DEFAULT);

if(empty($username) || empty($email) || empty($clave)) {
    die("Todos los campos son obligatorios.");
}

//echo "los datos son los siguientes"
//echo "$nombres, $correo, $contraseña"
$sql = "INSERT INTO usuario3(username, email, clave)
VALUES ('$username', '$email', '$clave')";
$resul = mysqli_query($conectar, $sql) or trigger_error
("Query Failed SQL - Error: ".mysqli_error($conectar), E_USER_NOTICE);

echo "$sql";

if($result){
    header(Location: exito.html);
    exit();
}
else {
    header(Location: error.html);
    exit();
}
?>

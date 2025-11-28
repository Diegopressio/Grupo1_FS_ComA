

<?php


function conect() {
$servidor = "localhost"; // O la IP/dominio del servidor
$usuario = "root";
$contraseña = "";
$basededatos = "bdl";

// Crear conexión
$conectar = new mysqli($servidor, $usuario, $contraseña, $basededatos);
$conectar->set_charset("utf8");
// Verificar la conexión
if ($conectar->connect_error) {
    die("La conexión falló: " . $conectar->connect_error);
}

//echo "¡Conexión exitosa!";

// Aquí puedes ejecutar tus consultas (ej. SELECT, INSERT, etc.)

// Cerrar la conexión al terminar
return $conectar;
} 
?>


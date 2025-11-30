 <?php

include_once('bd.php');
$gg= conect();

$mensaje = '';
$tipo = '';

if(isset($_POST['envia'])) {

//$conectar= conn();

$nombres = $_POST['user_name']; 
$msg = $_POST['user_message'];


if(empty($nombres) || empty($msg)) {
    $mensaje = "Todos los campos son obligatorios.";
    $tipo = "error";
} else {
    // Consulta preparada
    $sql ="INSERT INTO contacto VALUES ('$nombres','$msg','')"; 
    
    $resul = mysqli_query($gg, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($gg), E_USER_NOTICE);
    
    if ($resul) {
        $mensaje = "¡Mensaje enviado exitosamente! Gracias por contactarnos.";
        $tipo = "exito";
    } else {
        $mensaje = "Error al enviar el mensaje. Por favor, intenta nuevamente.";
        $tipo = "error";
    }
}
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - Cartonboxd</title>
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comforter+Brush&family=Delius&family=Delius+Unicase:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="alerta <?php echo $tipo; ?>">
        <div class="icon">
            <?php echo ($tipo === 'exito') ? '✅' : '⚠️'; ?>
        </div>
        <h2><?php echo ($tipo === 'exito') ? '¡Éxito!' : '¡Error!'; ?></h2>
        <p><?php echo htmlspecialchars($mensaje); ?></p>
        <a href="HTML/index.html">Volver</a>
    </div>
</body>
</html>

     
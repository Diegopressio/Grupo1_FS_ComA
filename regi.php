
 <?php

include_once('bd.php');
$gg= conect();

if(isset($_POST['regist'])) {

//$conectar= conn();

$nombres = $_POST['username']; 
$correo = $_POST['email'];
$password= $_POST['password'];
//$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar 

if(empty($nombres) || empty($correo) || empty($password)) {
    die("Todos los campos son obligatorios.");
}

// Consulta preparada
$sql ="INSERT INTO datos VALUES ('$nombres','$correo','$password','')"; 
}



$resul = mysqli_query($gg, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($gg), E_USER_NOTICE);
    
echo "$sql";

if ($resul) {
    header("Location: /PRUEBA/HTML/exito.html");
    exit();
    //echo "Registro guardado correctamente.";
} else {
    header("Location: /PRUEBA/HTML/error.html");
    exit();
    //echo "Error: " . mysqli_error($conectar);
}
 
?>
   
<!--    $nombres =mysqli_real_escape_string($conectar, $_POST['Usuario']); 
    $correo = mysqli_real_escape_string($conectar, $_POST['Correo']);
    $password=mysqli_real_escape_string($conectar, $_POST['contraseña']);
    $password = password_hash($_POST['contraseña'], PASSWORD_DEFAULT); // Encriptar 

    if(empty($nombres) || empty($correo) || empty($password)) {
        die("Todos los campos son obligatorios.");
    }

    // Consulta preparada
    $sql ="INSERT INTO datos (Usuario, Correo, contraseña, ) VALUES ('$nombres','$correo','$password')"; 

    $resul = mysqli_query($conectar, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($conectar), E_USER_NOTICE);
        
    echo "$sql";

    if ($resul) {
        //header("Location: exito.html");
        //exit();
        echo "Registro guardado correctamente.";
    } else {
        //header("Location: error.html");
        //exit();
        echo "Error: " . mysqli_error($conectar);
    }

    ?> -->
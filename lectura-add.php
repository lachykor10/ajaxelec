<?php
//es el archivo encargado de escuchar cuando el usuario quiere insertar un nuevo dato desde el '#formulario-lectura'


include('database.php');//se incluye el archivo que se conecta a la bd

if(isset($_POST['lectura'])){      //lectura es el atributto que viene del front desde la peticion POST.
    $lectura = $_POST['lectura'];  //captura lo que llega desde el POST
    $query = "INSERT into lecturas(lectura) VALUES ('$lectura')";//pido la consulta a la base de datos y lo almaceno en la BD usando INSERT
    $result=mysqli_query($conexion, $query);//resultado de lo que paso con la consulta
    
    //valida si entro o no a la BD lo lo imprimo.
    if(!$result){
        die('La consulta ha fallado');
    }
    echo 'Lectura agregada satisfactoriamente';
}


?>
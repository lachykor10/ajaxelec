<?php
//es el archivo encargado de eliminar las lecturas que estan guardadas en la bd dado el ID que llega por el metodo POSt


include('database.php');//se incluye el archivo que se conecta a la bd

if(isset($_POST['id'])){  //valida si se recive un metodo POST
   
    $id=$_POST['id'];  //se guarda lo recivido mediante el metodo POST en la variable para luego trabajar
    
    $query = "DELETE FROM lecturas WHERE id= $id";  //consulta a la BD
    $result=mysqli_query($conexion, $query); //resultado de la consulta
    
    //validacion de lo que paso
    if(!$result){
        die('La consulta ha fallado');
    }
    echo 'Lectura eliminada satisfactoriamente';  

}




?>
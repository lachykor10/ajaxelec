<?php
include('database.php');//se incluye el archivo que se conecta a la bd

$id=$_POST['id'];  //se guarda lo recivido mediante el metodo POST en la variable para luego trabajar

$query = "SELECT * FROM lecturas WHERE id= $id";  //consulta a la BD
$result=mysqli_query($conexion, $query); //resultado de la consulta

if(!$result){
    die('La consulta ha fallado');
}
$json = array();//se crea una variable llamada $json de tipo arreglo
        //mysqli_fetch_array este convierte lo que tiene $result dentro a arreglo
        while($filas=mysqli_fetch_array($result)){
            //se va llenando el arreglo json antes creado con los datos de cada fila.
            $json[] = array(
                'lectura'=> $filas['lectura'],
                'fecha'=> $filas['fecha'],
                'id'=> $filas['id']

            );
        }
        $jsonstring=json_encode($json[0]); //json_encode convierte un json a string.
        echo $jsonstring; //lo que devuelve al final el archivo busca-lectura


?>
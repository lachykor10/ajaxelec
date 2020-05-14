<?php
//es el archivo encargado de listar todas las lecturas que estan guardadas en la bd


include('database.php');//se incluye el archivo que se conecta a la bd

$query = "SELECT * from lecturas";
$result=mysqli_query($conexion, $query);

if(!$result){
    die('La consulta ha fallado'. mysqli_error($conexion));
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
        $jsonstring=json_encode($json); //json_encode convierte un json a string.
        echo $jsonstring; //lo que devuelve al final el archivo busca-lectura



?>
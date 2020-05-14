<?php 
    include('database.php');//se incluye el archivo que se conecta a la bd

    $search= $_POST['search'];//lo que llega por el metodo post se mete en la variable $search para trabajar con ella

    //validando si el metodo POST no llega vacio
    if(!empty($search)){
        $query = "SELECT * FROM lecturas WHERE lectura LIKE '$search%'"; //consulta de lo que quiero pedir a la BD,el signo de % significa que no determina lo que este atras
        $result=mysqli_query($conexion, $query); //lo que llega a travez de lo consultado a la BD se mete en $result
        if(!$result){
            die("Error de Consulta".mysqli_error($conexion));//valida si hay o no entrega de datos por la BD
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
    }


?>
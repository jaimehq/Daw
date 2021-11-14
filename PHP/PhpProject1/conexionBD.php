<html>
    <head>
        <title>Clase Conexion BD</title>
    </head>
    <body>
        <?php
        //conectar con la base de datos
        $dwes = new mysqli();
        //Le pasamos los datos de conexion a traves del metodo connect
        //80 no es necesario, es el puerto pero si no se modifica se cogeria por defecto
        $dwes->connect("localhost:3310",'root','','dwes');
        //si la conexion ha ido bien, mostramos la info del servidor        
        $error = $dwes->connect_errno;
        if ($error != null){
            echo "<p> Error $error conectado a la base de datos: $dews";
        }else{
            $sql='SELECT nombre_corto FROM producto';
            $resultado= $dwes->query($sql);
            
            if ($resultado!=null){
                //primera forma:
                /**
                $row = $resultado->fetch_row();
                while ($row!=null){
                    echo $row[0].'<br>';
                    $row=$resultado->fetch_row();
                }    
                 * **/
                for ($i=0; $i < $resultado->num_rows ; $i++){
                    $row = $resultado->fetch_assoc();
                    echo $row['nombre_corto']."<br>";
                }         
                echo "<p> Se han capturado $dwes->affected_rows registros.</p>";
                $resultado->free();
            }else{
                echo "La query ejecutada no ha funcionado";
            }
            $dwes->close();
        }
        ?>
    </body>
</html>

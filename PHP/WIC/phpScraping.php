<html>
    <head>
        <title>PHP Scraping</title>
    </head>
    <body>
        <?php
            // Variables
            $url = "";
            $content = file_get_contents($url);
            
            // Para ver qué ha capturado
            print("<textarea>".$content."</textarea>");
            
            while (strpos($content, 'class="simple-megamenu__container"'))
            {
                $posible_url = substr($content, strpos($content, "http"));
                
                $pos_final = strpos($posible_url, '"');
                $pos2_final = strpos($posible_url, "'");
                
                if($pos2_final > 0 && $pos2_final < $pos_final)
                {
                    $pos_final = $pos2_final;
                }
                
                $posible_url = substr($posible_url, 0, $pos_final);
                
                print("<br/>Url found: ".$posible_url);
                
                $content = substr($content, strpos($content, "http")+1);
            }
        ?>
    </body>
</html>


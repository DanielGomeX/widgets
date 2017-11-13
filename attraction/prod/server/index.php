<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');


    $url = "https://kudago.com/public-api/v1.3/places/?";

    $params = array(
        'fields' => 'id,title,slug,short_title,address,images,description,interesting-places',
        'location' => 'msk',
        'expand' => 'images,tags',
        'categories' => 'attractions,-online-shopping,-bazy-otdyha,-inn,-houses,-hotels,-hostels',
        'text_format' => 'text',
    );
    //echo http_build_query($params)
    //
    $url .=  http_build_query($params);

    $arr = json_decode(file_get_contents($url), true);


    $resultsArr = $arr['results'];
    shuffle($arr['results']);

    /*echo '<pre>';
    var_dump($resultsArr);
    echo '</pre>';*/

    echo json_encode($arr);

?>

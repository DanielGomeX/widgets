<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');


    $url = "https://kudago.com/public-api/v1.3/places/?";

    $params = array(
        'fields' => 'short_title,address,images,description,categories,-online-shopping',
        'location' => 'msk',
        'expand' => 'images',
        'categories' => 'attractions',
        'text_format' => 'text'
    );
    //echo http_build_query($params)
    //
    $url .=  http_build_query($params);

    echo file_get_contents($url);

?>

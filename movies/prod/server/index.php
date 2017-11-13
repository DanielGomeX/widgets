<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');


    $url = "https://kudago.com/public-api/v1.2/movie-showings/?";

    $params = array(
        //'fields' => 'imax',
        'expand' => 'movie,place',
        'location' => 'msk'
    );
    //echo http_build_query($params)
    //
    $url .=  http_build_query($params);
   //echo $url;
    $arr = json_decode(file_get_contents($url), true);

    $resArr = [];
    //$resultsArr = $arr['results'];
    //shuffle($arr['results']);

    /*echo '<pre>';
    var_dump($resultsArr);
    echo '</pre>';*/

    foreach ($arr['results'] as $key => $value) {
        $resArr[$value['id']][] = $value;
    }

    echo json_encode($resArr);

?>

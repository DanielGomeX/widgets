<?php
    //include('../../auth.php');

    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );


    $response_arr = new stdClass();
    $date = new DateTime();



    //$url = "https://kudago.com/public-api/v1.2/events?".$queryString;
    $url = "http://api.openweathermap.org/data/2.5/forecast/daily?".$queryString;
    

    $result = @file_get_contents($url) or 
        $result = FALSE;

    if ($result != '') {
        $response_arr->status = 'success';
        $response_arr->result = json_decode($result, true);
    } else if ($result == FALSE) {
       $response_arr->status = 'error';
    }

    
    echo json_encode($response_arr);

?>
<?php
    //include('../../auth.php');

    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );

    //echo phpinfo();
    date_default_timezone_set('Europe/Moscow');
    $response = array();
    $date = date('Y-m-d');
    $nowDate = date('Y-m-d H:i:s');
    $page = 1;
    $pageCount= 0;

    function setUrl ($page = 1) {
        global $date;

        $url = "https://api.rasp.yandex.net/v1.0/schedule/?";
        $query = array(
            'apikey' => 'de81013f-6678-44d3-84e6-dcf819a7182d',
            'format' => 'json',
            'station' => 'svo',
            'lang' => 'ru',
            'date' => $date,
            'transport_types' => 'plane',
            'event' => 'arrival',
            'system' => 'iata',
            'page' => $page
        );

         return $url .= http_build_query($query);
    }

    $result = file_get_contents(setUrl());
    $resArr = json_decode($result);
    $arr = array();
    $count = 0;

    foreach ($resArr->schedule as $key => $value) {

        $timeArrival = date($value->arrival);
        $already = TRUE;

        if ($nowDate < $timeArrival) {

            $flightTime = new DateTime($value->arrival);

            $response[$value->terminal][] = array(
                'nowTime' => $nowDate,
                'time' => $flightTime->format('H:i'),
                'departure' => $value->departure,
                'flightNumber' => $value->thread->number,
                'flighttitle' => $value->thread->title,
                'carrierTitle' => $value->thread->carrier->title
            );
        }

    }

    $pageCount = $resArr->pagination->page_count;

    $ch = curl_init();
    for ($i = 2; $i <= $pageCount; $i += 1) {

        curl_setopt_array($ch, array(
            CURLOPT_URL => setUrl($i),
            CURLOPT_VERBOSE => True,
            CURLOPT_RETURNTRANSFER => True,
        ));
        $resp = json_decode(curl_exec($ch));

        foreach ($resp->schedule as $key => $value) {

            $timeArrival = date($value->arrival);
            $already = TRUE;

            if ($nowDate < $timeArrival) {

                $flightTime = new DateTime($value->arrival);
                $response[$value->terminal]['teminalTitle'] = $value->terminal;

                $response[$value->terminal][] = array(
                    'nowTime' => $nowDate,
                    'time' => $flightTime->format('H:i'),
                    'departure' => $value->departure,
                    'flightNumber' => $value->thread->number,
                    'flighttitle' => $value->thread->title,
                    'carrierTitle' => $value->thread->carrier->title
                );
            }
        }
    }


    foreach ($response as $key => $value) {
       $arr[] = $value;
    }
    curl_close($ch);

    echo json_encode($arr);
?>
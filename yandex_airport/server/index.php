<?php
    //include('../../auth.php');

    /*$domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );*/


    $response = array();
    $date = date('Y-m-d');
    $nowDate = date('Y-m-d H:i:s');
    $page = 1;
    $pageCount= 0;

    //$url = "apikey=de81013f-6678-44d3-84e6-dcf819a7182d&format=json&station=SVO&lang=ru&date=2017-03-17&transport_types=plane&event=arrival&system=iata";
    $url = "https://api.rasp.yandex.net/v1.0/schedule/?";

    $url .= "apikey=" . "de81013f-6678-44d3-84e6-dcf819a7182d";
    $url .= "&format=" . "json";
    $url .= "&station=" . "SVO";
    $url .= "&lang=" . "ru";
    $url .= "&date=" . $date;
    $url .= "&transport_types=" . "plane";
    $url .= "&system=" . "iata";
    $url .= "&event=" . "arrival";
    $url .= "&page=" . $page;



    $result = file_get_contents($url);

    $resArr = json_decode($result);

    $count = 0;

    foreach ($resArr->schedule as $key => $value) {
        $response[] = $value;
    }

    $response['count'] = $count + count($resArr->schedule);

    $pageCount = $resArr->pagination->page_count;


    $ch = curl_init();
    for ($i = 0; $i < $pageCount; $i += 1) {
        $page = $i + 2;

        curl_setopt_array($ch, array(
            CURLOPT_URL => $url,
            CURLOPT_VERBOSE => True,
            CURLOPT_RETURNTRANSFER => True,
        ));
        $resp = json_decode(curl_exec($ch));

        foreach ($resp->schedule as $key => $value) {
            $response[] = $value;
        }

        $response['count'] += count($resp->schedule);

    }
    curl_close($ch);

   /*for ($i = 0; 2 > i; ++$i) {
        $page = $i + 2;

        $result = file_get_contents($url);

        $resArr2 = json_decode($result);

        $response[$i + 2] = $resArr2;

        foreach ($resArr2->schedule as $key => $value) {
            $response[$value->terminal][] = array(
                'time' => $value->arrival,
                'flightNumber' => $value->thread->number,
                'flighttitle' => $value->thread->title,
                'alreadyArrival' => $already
            );
        }
    }*/


    /*foreach ($resArr->schedule as $key => $value) {

        $timeArrival = date($value->arrival);
        $already = TRUE;

        if ($nowDate > $timeArrival) {
            $already = FALSE;
        }

        $response[$value->terminal][] = array(
            'time' => $value->arrival,
            'flightNumber' => $value->thread->number,
            'flighttitle' => $value->thread->title,
            'alreadyArrival' => $already
        );

    }*/

    /*$response['nowTime'] = $nowDate;
    $response['full'] = json_decode($result);*/
    echo json_encode($response);
?>
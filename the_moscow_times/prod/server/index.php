<?php
    //echo phpinfo();
    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );

    date_default_timezone_set('Europe/Moscow');

    $response = array();
    $currentDate = date('d/m/Y');


    $news = simplexml_load_file('https://themoscowtimes.com/feeds/world.xml', null, LIBXML_NOCDATA);

    foreach ($news->channel->item as $key => $value) {

        $date = new DateTime($value->pubDate);

        if ($value->description == "" && array_key_exists('enclosure', $value) == "") {
            continue;
        } else {

            $response[] = array(
                'title' => (string) $value->title,
                'description' => (string) $value->description,
                'pubDate' => (string) $date->format('d M H:i'),
            );
        }

    }

    echo json_encode($response);

?>
<?php
    //echo phpinfo();
    /*$domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );*/

    date_default_timezone_set('Europe/Moscow');

    $response = array();

    $news = simplexml_load_file('http://www.forbes.ru/newrss.xml', null, LIBXML_NOCDATA);

    foreach ($news->channel->item as $key => $value) {
        $date = new DateTime($value->pubDate);

        $response[] = array(
            'title' => (string) $value->title,
            'description' => (string) strip_tags($value->description),
            'pubDate' => (string) $date->format('d M H:i'),
            'image' => (string) $value->enclosure['url']
        );

    }


    echo json_encode($response);

?>
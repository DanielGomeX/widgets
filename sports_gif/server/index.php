<?php

    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );

    date_default_timezone_set('Europe/Moscow');

    $response = array();


    $result = file_get_contents('http://static.feed.rbc.ru/rbc/logical/footer/news.rss');

    $resArr = json_decode($result);


    $news = simplexml_load_file('http://static.feed.rbc.ru/rbc/logical/footer/news.rss', null, LIBXML_NOCDATA);

    foreach ($news->channel->item as $key => $value) {

        $date = new DateTime($value->pubDate);

        $response['news'][] = array(
            'title' => (string) $value->title,
            'description' => (string) $value->description,
            'author' => (string) $value->author,
            'pubDate' => (string) $date->format('d M H:i')
        );

    }

    $rate = file_get_contents('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');

    $rate = json_decode($rate);

    foreach ($rate->query->results->rate as $key => $value) {
        $response['rate'][str_replace("/RUB", "", $value->Name)] = round($value->Rate, 2);
    }

    //$response['rate'] = json_decode($rate);

    echo json_encode($response);

?>
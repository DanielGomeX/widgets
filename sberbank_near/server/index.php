<?php
    //echo phpinfo();
    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );

    date_default_timezone_set('Europe/Moscow');

    $response = array();
    $currentDate = date('d/m/Y');

    $news = simplexml_load_file('http://static.feed.rbc.ru/rbc/logical/footer/sport_newsline.rss', null, LIBXML_NOCDATA);


    /*echo '<pre>';
    var_dump($news);
    echo '</pre>';*/


    foreach ($news->channel->item as $key => $value) {

        $date = new DateTime($value->pubDate);

        $response['news'][] = array(
            'title' => (string) $value->title,
            'pubDate' => (string) $date->format('d M H:i'),
            'image' => (string) str_replace('http://', 'https://' , $value->enclosure['url']),
        );

    }


    echo json_encode($response);

?>
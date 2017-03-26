<?php
    //echo phpinfo();
    /*$domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );*/

    date_default_timezone_set('Europe/Moscow');

    $response = array();


    $result = file_get_contents('https://meduza.io/rss/all');

    $response = json_decode($result);


    $news = simplexml_load_file('https://meduza.io/rss/all', null, LIBXML_NOCDATA);

    /*echo '<pre>';
    var_dump($news->channel);
    echo "</pre>";*/


    foreach ($news->channel->item as $key => $value) {

        $response[] = array(
            'title' => (string) $value->title,
            'description' => (string) $value->description,
            'pubDate' => (string) $value->pubDate,
            'image' => (string) $value->enclosure['url'] 
        );

    }

    

    echo json_encode($response);

?>
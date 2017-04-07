<?php
    //echo phpinfo();
    /*$domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );*/
    header('Content-Type: text/html; charset=utf-8');

    $response = array();
    $valueArr = array();

    $url = 'http://www.oann.com/category/top-news/feed/';

    $data = file_get_contents($url);

    $news = simplexml_load_string($data, null, LIBXML_NOCDATA);


    foreach ($news->channel->item as $key => $value) {
        $date = new DateTime($value->pubDate);

        foreach ($value as $name => $val) {

            $valueArr[$name] = (string) strip_tags ($val);

        }

        array_push($response , $valueArr);
    }


    echo json_encode($response);

?>
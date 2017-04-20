<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    $resultArr = array();
    $feed = simplexml_load_file('http://feeds.feedburner.com/Ablogtowatch');

    foreach($feed->channel->item as $item) {
        $date = new DateTime($item->pubDate);

        $pregImg = "#<img[^>]+src=\"(.+?)\"[^>]*>#is";
        $pregP = '#<p>(.+?)</p>#is';
        $arrImg = array();
        $arrP = array();

        preg_match_all($pregImg, $item->description, $arrImg, PREG_SET_ORDER);
        preg_match_all($pregP, $item->description, $arrP);

        $resultArr[] = array(
            'title' => (string) $item->title,
            'description' => (string) strip_tags($arrP[0][0]),
            'image' => str_replace('http://', 'https://' , $arrImg[0][1]),
            'pubDate' => (string) $date->format('d M H:i')
        );
    }

    echo json_encode($resultArr);
?>

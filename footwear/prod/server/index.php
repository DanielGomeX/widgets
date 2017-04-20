<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    $resultArr = array();
    $news = simplexml_load_file('http://footwearnews.com/custom-feed/fn-rss/');

    foreach ($news->channel->item as $key => $value) {

        $date = new DateTime($value->pubDate);

        $resultArr[] = array(
            'title' => (string) $value->title,
            'description' => (string) strip_tags($value->description),
            'author' => (string) $value->author->name,
            'pubDate' => (string) $date->format('d M H:i'),
            'image' => (string) str_replace('http://', 'https://' , $value->image),
            'is_img' => array_key_exists('image', $value)
        );

    }

    echo json_encode($resultArr);
?>

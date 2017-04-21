<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    $resultArr = array();
    $news = simplexml_load_file('https://www.iphones.ru/feed');
   /* echo '<pre>';
    var_dump($news);
    echo '</pre>';*/

    foreach ($news->channel->item as $key => $value) {

        $date = new DateTime($value->pubDate);

       /* echo '<pre>';
        var_dump($value->category);
        echo '</pre>';*/
        $categoryArr = array();

        foreach ($value->category as $key => $val) {
            $categoryArr[] = (string) $val;
        }

        if ($value->category == 'Новости') {
            $resultArr[] = array(
                'title' => (string) $value->title,
                'description' => (string) strip_tags($value->description),
                'category' => $categoryArr,
                'pubDate' => (string) $date->format('d M H:i'),
            );
        }

    }

    echo json_encode($resultArr);
?>

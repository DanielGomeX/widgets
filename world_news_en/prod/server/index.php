<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    include('simple_html_dom.php');

    $url = 'https://www.reuters.com/news/archive/worldNews';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();



    $response = array();

    $content = $html->find('section.module-content', 0);

    foreach ($content->find('article.story') as $key => $value) {

        //echo $value;

        $title = $value->find('.story-title', 0)->plaintext;
        $description = $value->find('p', 0)->plaintext;

        $response[] = array(
            'title' => trim($title),
            'description' => trim($description)
        );
    }

    echo json_encode($response);
?>

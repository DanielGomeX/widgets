<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'https://www.natgeokids.com/nz/discover/geography/countries/30-cool-facts-about-china/';

    $resultArr= [];

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('юarticle-sheet', 0);

    foreach ($table->find('p') as $key => $item) {
        echo $item;
    }

    //file_put_contents('facts.json', trim(json_encode($resultArr)));
    echo json_encode($resultArr);
?>

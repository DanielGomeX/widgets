<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'https://fedresurs.ru/search/entity?code=6164241937';

    $codes = [
        ''
    ];

    $home =  file_get_contents($url);
    echo $home;

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('table.search-result');
    //echo $table;

    $resultArr = array();
    echo 123;
    foreach ($table as $key => $value) {
        echo $value;
        foreach ($value->find('tr') as $key => $tr) {
            echo $tr . '<br>';
        }
    }


    echo json_encode($resultArr);
?>

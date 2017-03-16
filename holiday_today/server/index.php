<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");

    include('simple_html_dom.php');

    $url = 'http://kakoysegodnyaprazdnik.ru/';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();
    
    $main = $html->find('div.main');
    $event = $html->find('div.event');
    
    $response = new stdClass;

    foreach ($main as $key => $value) {

        foreach ($value->find('span[itemprop=text]') as $val) {
            $response->today[$key]['text'] = str_replace('&bull; ', '', $val->plaintext);
        }
      
        foreach ($value->find('span.super') as $val) {
            $response->today[$key]['year'] = $val->plaintext;
        }
        
    }

    foreach ($event as $key => $value) {

        foreach ($value->find('span.super') as $val) {
            $response->history[$key]['year'] = $val->plaintext;
            $val->clear();
        }

        $response->history[$key]['text'] = str_replace('&bull; ', '', $value->plaintext);
    }

    echo json_encode($response);
?>

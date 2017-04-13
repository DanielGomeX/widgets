<?php
    ini_set('display_errors','on');
    mb_internal_encoding("UTF-8");
    header("Access-Control-Allow-Origin:" . "*");

    include('simple_html_dom.php');

    $url = 'http://www.forbes.ru/rating/200-bogateishikh-biznesmenov-rossii-2016/2016#all_rating';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    //echo $html;
    $tr = $html->find('table.common_rating_list tbody tr');
    echo '<pre>';
    echo $html;
    echo '</pre>';
    $response = new stdClass;

    foreach ($tr[0] as $key => $value) {

        //var_dump($value);
        echo $value;
    }

    /*foreach ($main as $key => $value) {

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
    }*/

    echo json_encode($response);
?>

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

    $table = $html->find('.article-sheet', 0);
    $num = 1;

    foreach ($table->find('p') as $key => $item) {
        if ($key > 0 && $key <= 35) {

            $num = explode(")", $item->plaintext)[0];
            if ($item->find('strong', 0) != '') {
                $item->find('strong', 0)->outertext = '';
            }
            if ($item->find('img', 0) != '') {
                $resultArr[$key - 1]['img'] = $item->find('img', 0)->src;
            } else {
                $resultArr[$num]['fact'] = $item->innertext;
            }
        }

    }

    file_put_contents('facts.json', trim(json_encode($resultArr)));
    echo json_encode($resultArr);
?>

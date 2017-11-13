<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'https://coinranking.com/';

    $resultArr= [];
    $cryptoInfo = [];

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $current_date = date('d-m-Y H:i:s');

    $linksTable = $html->find('.coin-list__body', 0);

    foreach ($linksTable->find('a.coin-list__body__row') as $key => $value) {
        $icon = $value->find('img.coin-list__body__row__cryptocurrency__prepend__icon__img', 0)->src;
        $name = $value->find('.coin-name', 0)->plaintext;
        $price = $value->find('.coin-list__body__row__price__value', 0)->plaintext;
        $market_cap = $value->find('.coin-list__body__row__market-cap__value', 0)->plaintext;
        $change_24h = $value->find('.coin-list__body__row__change', 0)->plaintext;


        $cryptoInfo[] = array(
            'icon' => $icon,
            'name' => trim($name),
            'price' => trim($price),
            'market_cap' => trim($market_cap),
            '24h_change' => trim($change_24h),
            'date' => $current_date
        );
    }

    $resultArr[date('d-m-Y')][] = $cryptoInfo



    echo json_encode($cryptoInfo);
    /*file_put_contents('poems.json', json_encode($linksArr));
    file_put_contents('poems-all.json', json_encode($resultArr));
    echo json_encode($resultArr);*/
?>

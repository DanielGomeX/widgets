<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'http://www.kursvaliut.ru/%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%8F-%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2-%D0%B2%D0%B0%D0%BB%D1%8E%D1%82-%D0%A6%D0%91';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('#tabs-0 .table');
    unset($html);

    $linksArr = array();
    $arr = array();

    $resultArr = array();

    foreach ($table as $key => $value) {
        foreach($value->find('.month h3') as $h){
            $str = str_replace('Aрхив курсов ','' ,$h->plaintext);
            $str = explode(' 2017', $str)[0];

            $linksArr[] = mb_strtolower($str);
        }

        $resultArr = $linksArr;

        foreach($value->find('a') as $a){
            foreach ($linksArr as $val) {
                if (stristr($a->href, $val) != FALSE) {
                    $arr[$val][] = 'http://' . str_replace('//','' , $a->href);
                }
            }
        }

        $linksArr = $arr;
        unset($arr);

    }
    unset($table);

    $arr = array();

    foreach ($linksArr as $key => $value) {
        $mounth = $key;
        foreach ($value as $key => $val) {
            $url = $val;
            $day = explode('-', $val)[2];
            //echo $day . '<br>';
            $html = new simple_html_dom();
            $html->load_file($url);
            $html->save();

            $table = $html->find('#currency-table-container .table');

            foreach ($table as $key => $value) {
                foreach ($value->find('tr') as $key => $value) {

                    $currency =  strip_tags($value->find('td', 1));
                    $currncyVal =  strip_tags($value->find('td', 4));

                    if ($currency != '') {
                        $arr[$mounth][$day][$currency] = $currncyVal;
                    }

                }
            }
        }
    }
    file_put_contents('rate.json', trim(json_encode($arr)));
    echo json_encode($arr);
?>

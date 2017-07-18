<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'http://dic.academic.ru/dic.nsf/ruwiki/685276';


    $resultArr = array();

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('#mw-content-text table.standard');

    foreach ($table as $tableKey => $value) {
        //echo '<div class="bla">' . $value . '</div>';

        $flag = $value->find('img', 0)->src;
        $state = $value->find('img', 0)->src;

        foreach ($value->find('tr') as $keyTr => $valueTr) {
            if ($keyTr != '0') {
                $flag = $valueTr->find('img', 0)->src;
                $state = $valueTr->find('td', 0)->plaintext;
                $head = $valueTr->find('td', 1)->plaintext;
                $name = $valueTr->find('td', 2)->plaintext;
                $start = $valueTr->find('td', 3)->plaintext;

                $resultArr[] = array(
                    'flag' => 'http://dic.academic.ru/' . $flag,
                    'state' => trim($state),
                    'head' => trim($head),
                    'name' => trim($name),
                    'start' => trim($start)
                );
            }
        }
    }


    echo json_encode($resultArr);
?>

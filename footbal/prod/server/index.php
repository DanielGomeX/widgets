<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'http://goal24.ru/football/russia/';

    $time = time();
    $date = date('d-m-Y', $time);
    $dateArr = array($date);
    $resultArr = array();


    for ($i = 1; 5 >= $i; ++$i) {
        $dateArr[] = date('d-m-Y', strtotime(-24 * $i . ' hours'));
    }

    $out;

    foreach ($dateArr as $key => $dateVal) {
        $out .= '<div class="list_table" date="' . $dateVal . '">' . file_get_contents($url . $dateVal) . '</div>';
    }

    $html = new simple_html_dom();
    $html->load($out);
    $html->save();

    $table = $html->find('.list_table');

    foreach ($table as $key => $value) {
        $dd = $value->attr['date'];

        foreach ($value->find('table.tb-matches tr') as $key => $tr) {

            $elem =  $tr->find('td', 0);

            if ($elem->attr['colspan'] != '7') {
                //echo $tr->find('td', 0)->plaintext;
                $resultArr[$dd][] = array(
                    'time' => $tr->find('td', 0)->plaintext,
                    'home_team' => $tr->find('td.home-team', 0)->plaintext,
                    'away_team' => $tr->find('td.away_team', 0)->plaintext,
                    'status' => trim($tr->find('td.status', 0)->plaintext),
                    'score' => $tr->find('td.score', 0)->plaintext,
                    'href' => 'http://goal24.ru' . $tr->find('td.option a', 0)->href,
                );
            }
        }
    }



    //file_put_contents('list_full_new.json', trim(json_encode($resultArr)));
    echo json_encode($resultArr);
?>

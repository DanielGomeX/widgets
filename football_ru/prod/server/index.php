<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'http://goal24.ru/football/russia/';

    $time = time();
    $date = date('d-m-Y', $time);
    $dateArr = array($date);
    $descrLinksArr = [];
    $resultArr = array();


    for ($i = 1; 3 >= $i; ++$i) {
        $dateArr[] = date('d-m-Y', strtotime(-24 * $i . ' hours'));
    }

    $out; // контент результатов матчей (первые страницы)
    $outDescr; // контент описания матчей (вторые страницы)

    foreach ($dateArr as $key => $dateVal) {
        $out .= '<div class="list_table" date="' . $dateVal . '">' . file_get_contents($url . $dateVal) . '</div>';
    }

    $html = new simple_html_dom();
    $html->load($out);
    $html->save();

    $table = $html->find('.list_table');

    foreach ($table as $tableKey => $value) {
        $dd = $value->attr['date'];
        $i = 0;

        foreach ($value->find('table.tb-matches tr') as $trKey => $tr) {
            $elem =  $tr->find('td', 0);

            if ($elem->attr['colspan'] != '7') {
                $link = 'http://goal24.ru' . $tr->find('td.option a', 0)->href;
                $id = 'id_' . $tableKey . '_' . $i;
                $resultArr[$dd][$id] = array(
                    'date' => $dd,
                    'time' => $tr->find('td', 0)->plaintext,
                    'home_team' => $tr->find('td.home-team', 0)->plaintext,
                    'away_team' => $tr->find('td.away_team', 0)->plaintext,
                    'status' => trim($tr->find('td.status', 0)->plaintext),
                    'score' => str_replace('-', ':', $tr->find('td.score', 0)->plaintext),
                    'href' => $link,
                );
                ++$i;
                $outDescr .= '<div class="descr_table" date="' . $dd . '" id="' . $id . '">' . file_get_contents($link) . '</div>';
            }
        }
    }

    $htmlDescr = new simple_html_dom();
    $htmlDescr->load($outDescr);
    $htmlDescr->save();

    $tableDescr = $htmlDescr->find('.descr_table');

    foreach ($tableDescr as $tableDescrKey => $tableDescrValue) {
        $id =  $tableDescrValue->attr['id'];
        $dateDescr = $tableDescrValue->attr['date'];

        foreach ($tableDescrValue->find('table.events tbody tr') as $trDescrKey => $trDescr) {
            if ($trDescrKey != 0) {
                foreach ($trDescr->find('td') as $key => $value) {
                    if ($value->find('img',0) != '') {
                        $img = $value->find('img',0);
                        $src = $value->find('img', 0)->src;

                        $value->find('img', 0)->src = '';
                    }
                }

                $tdHome = str_replace('(pen.)', '', $trDescr->find('td.t1', 0)->innertext);
                $tdTime = $trDescr->find('td.c', 0)->plaintext;
                $tdAvay = str_replace('(pen.)', '', $trDescr->find('td.t2', 0)->innertext);



                $resultArr[$dateDescr][$id]['descr'][] = (string) '<tr><td>' . $tdHome . '</td><td>' . $tdTime . '</td><td>' . $tdAvay . '</td></tr>';
            }
        }
    }

    $res = [];

    foreach ($resultArr as $key => $value) {
        foreach ($value as $key => $val) {
            $res[] = $val;
        }
    }

    file_put_contents('score.json', trim(json_encode($res)));
    echo json_encode($res);
?>

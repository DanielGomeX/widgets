<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $urlRU = 'https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D0%A1%D0%A8%D0%90';
    $html = new simple_html_dom();
    $html->load_file($urlRU);
    $html->save();

    $table = $html->find('table.wikitable');
    //echo $table;

    $resultArr = array();

    foreach ($table as $key => $value) {
        $trCount = count($value->find('tr'));
        foreach ($value->find('tr') as $key => $tr) {

            if ($key != 0 && $key != $trCount - 1 ) {

                $date = '';

                foreach ($tr->find('td', 4)->find('a') as $key => $value) {
                    $date .= $value->plaintext . ' ';
                }

                $resultArr['ru'][] = array(
                    'name' => (string) $tr->find('td', 1)->plaintext,
                    'postal_code' => (string) $tr->find('td', 3)->plaintext,
                    'statehood' => (string) trim($date),
                    'population' => (string) $tr->find('td', 5)->find('text', 1),
                    'territory' => (string) $tr->find('td', 6)->find('text', 1),
                    /*'territory' => array(
                        'total' => '',
                        'land' =>'',
                        'water' => $tr->find('td', 6)->find('text', 1),*/
                    'capital' => (string) $tr->find('td', 8)->plaintext,
                    'largest_city' => (string) $tr->find('td', 9)->plaintext,
                    'flag' => (string) str_replace('45px','660px' , $tr->find('img', 0)->src)
                );
            }
        }
    }

    unset($html);
    unset($table);

    $urlEN = 'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States';
    $html = new simple_html_dom();
    $html->load_file($urlEN);
    $html->save();

    $table = $html->find('table.wikitable');

    foreach ($table as $key => $value) {
        $trCount = count($value->find('tr'));
        foreach ($value->find('tr') as $key => $tr) {

            if ($key > 1) {

                $date = '';

                $tdCount =  count($tr->find('td')) . '<br>';

                if ($tdCount == 9) {
                    $capital = $tr->find('td', 1)->plaintext;
                    $largest = $tr->find('td', 2)->plaintext;
                    $statehood = $tr->find('td', 3)->plaintext;
                    $population = $tr->find('td', 4)->plaintext;

                    $terTotal = explode('♠', $tr->find('td', 5)->plaintext)[1];
                    $terLand = explode('♠', $tr->find('td', 6)->plaintext)[1];
                    $terWater = explode('♠', $tr->find('td', 7)->plaintext)[1];

                    $terTotalMi = trim(explode('(', $terTotal)[0]);
                    $terLandMi = trim(explode('(', $terLand)[0]);
                    $terWaterMi = trim(explode('(', $terWater)[0]);

                    $terTotalKm = str_replace(')','', trim(explode('(', $terTotal)[1]));
                    $terLandKm = str_replace(')','', trim(explode('(', $terLand)[1]));
                    $terWaterKm = str_replace(')','', trim(explode('(', $terWater)[1]));


                    $territory = array(
                        'total' => array('mi' => $terTotalMi, 'km' => $terTotalKm),
                        'land' => array('mi' => $terLandMi, 'km' => $terLandKm),
                        'water' => array('mi' => $terWaterMi, 'km' => $terWaterKm),
                    );
                } else {
                    $capital = $tr->find('td', 1)->plaintext;
                    $largest = $tr->find('td', 1)->plaintext;
                    $statehood = $tr->find('td', 2)->plaintext;
                    $population = $tr->find('td', 3)->plaintext;

                    $terTotal = explode('♠', $tr->find('td', 4)->plaintext)[1];
                    $terLand = explode('♠', $tr->find('td', 5)->plaintext)[1];
                    $terWater = explode('♠', $tr->find('td', 6)->plaintext)[1];

                    $terTotalMi = trim(explode('(', $terTotal)[0]);
                    $terLandMi = trim(explode('(', $terLand)[0]);
                    $terWaterMi = trim(explode('(', $terWater)[0]);

                    $terTotalKm = str_replace(')','', trim(explode('(', $terTotal)[1]));
                    $terLandKm = str_replace(')','', trim(explode('(', $terLand)[1]));
                    $terWaterKm = str_replace(')','', trim(explode('(', $terWater)[1]));

                    $territory = array(
                        'total' => array('mi' => $terTotalMi, 'km' => $terTotalKm),
                        'land' => array('mi' => $terLandMi, 'km' => $terLandKm),
                        'water' => array('mi' => $terWaterMi, 'km' => $terWaterKm),
                    );
                }

                $resultArr['en'][] = array(
                    'name' => (string) trim($tr->find('th', 0)->plaintext),
                    'postal_code' => (string) $tr->find('td', 0)->plaintext,
                    'statehood' => (string) $statehood,
                    'population' => (string) $population,
                    'territory' => $territory , //. ' км&#178;'
                    'capital' => (string) $capital,
                    'largest_city' => (string) $largest,
                    'flag' => (string) str_replace('45px','660px' , $tr->find('img', 0)->src)
                );
            }
        }
    }

    file_put_contents('list_full.json', trim(json_encode($resultArr)));
    echo json_encode($resultArr);
?>

<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    include('simple_html_dom.php');

    $url = 'country.html';
    $urlCurrency = 'currency.html';
    $urlLocals = 'locals.html';
    $urlInfoJSON = 'info.json';

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $htmlCurrency = new simple_html_dom();
    $htmlCurrency->load_file($urlCurrency);
    $htmlCurrency->save();

    $codeArr = array();
    $currencyArr = array();
    $resultArr = array();
    $localsArr = array();

    $locals = file_get_contents($urlLocals);
    $myArr = json_decode(file_get_contents($urlInfoJSON), true);
    $localsArr = explode('<br>', $locals);



    foreach ($html->find('tr') as $key => $value) {

        $name =  explode(" ", trim($value->find('td', 1)->plaintext));

        $codeArr[] = array(
            'ruName' => (string) $name[0],
            'enName' => (string) $value->find('td', 2)->plaintext,
            'capital' => (string) $value->find('td', 3)->plaintext,
            'twoCode' => (string) $value->find('td', 4)->plaintext,
            'threeCode' => (string) $value->find('td', 5)->plaintext,
            'isoCode' => (string) $value->find('td', 6)->plaintext,
            'phoneCode' => (string) $value->find('td', 7)->plaintext
         );
    }

    foreach ($htmlCurrency->find('tr') as $key => $value1) {

        $name = trim($value1->find('td', 0)->plaintext);

        $currencyArr[] = array(
            'name' => (string) $name,
            'currency' => (string) $value1->find('td', 1)->plaintext,
            'currency_code' => (string) $value1->find('td', 2)->plaintext
         );
    }

    foreach ($currencyArr as $value) {

        foreach ($myArr as $key => $val) {
            if ($value['name'] == $key) {

                $myArr[$key]['currency'] = trim($value['currency']);
                $myArr[$key]['currency_code'] = trim($value['currency_code']);

            }
        }

    }


    foreach ($codeArr as $value) {
        //echo $value['ruName'] . '<br>';
        foreach ($myArr as $key => $val) {
            if ($value['ruName'] == $key) {
                //echo $val->$key . '<br>';
                $myArr[$key]['en_name'] = trim($value['enName']);
                $myArr[$key]['capital'] = trim($value['capital']);
                $myArr[$key]['two_symbol_code'] = trim($value['twoCode']);
                $myArr[$key]['three_symbol_code'] = trim($value['threeCode']);
                $myArr[$key]['ISO_kode'] = trim($value['isoCode']);
                $myArr[$key]['phone_code'] = trim($value['phoneCode']);
            }
        }
    }
    $arr = array();

    foreach ($localsArr as $key => $value) {
        $country = explode(' – ', $value);
        $country1 = explode('(', $country[1]);
        /*echo '<pre>';
        var_dump($country1);
        echo '</pre>';*/
        $arr[trim($country[0])] = trim($country1[0]);
    }
    $localsArr = $arr;

    foreach ($myArr as $key => $value) {
        if (array_key_exists(trim($key), $localsArr)) {
            $myArr[$key]['locals'] = (string) trim($localsArr[$key]);
        } else {
            $myArr[$key]['locals'] = null;
        }
    }

    foreach ($myArr as $key => $value) {
        $myArr[$key]['ru_name'] = (string) $key;
    }


    echo json_encode($myArr);
    //file_put_contents('info_new.json', iconv('cp1251', 'utf-8', trim(json_encode($myArr))));

?>

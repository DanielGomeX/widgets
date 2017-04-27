<?php
    ini_set('display_errors','on');

    $json = file_get_contents('list_full.json');
    $arr = json_decode($json, true);

    $arrEn = $arr['en'];
    $arrRu = $arr['ru'];

    //var_dump($arrRu);

    foreach ($arrEn as $key => $value) {
        foreach ($arrRu as $key => $val) {
            if ($value['postal_code'] == $val['postal_code']) {
                $arrRu[$key]['territory'] = $value['territory'];
            }
        }
    }

    $arr['ru'] = $arrRu;

    file_put_contents('list_full.json', trim(json_encode($arr)));
    echo json_encode($arr);
?>

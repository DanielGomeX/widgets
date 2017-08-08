<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $linksUrl = 'https://www.inpearls.ru/authors/index';

    $resultArr= [];
    $linksArr = [];

    $html = new simple_html_dom();
    $html->load_file($linksUrl);
    $html->save();

    $linksTable = $html->find('#authors table', 0);

    foreach ($linksTable->find('tr') as $key => $value) {
        //echo $value . '<br>';
        $name = $value->find('td', 1)->find('a', 0)->plaintext;
        //echo $name . '<br>';
        $str = preg_replace("/^[^a-zA-ZА-Яа-я\s]*$/", '', $name);

        $linksArr[$key] = array(
            'name' => $name,
            'link' => 'https://www.inpearls.ru' . $value->find('a', 0)->href
        );
    }




    function getPoems($page, $id) {
        global $linksArr, $resultArr;
        $arr = [];

        $html1 = new simple_html_dom();
        $html1->load_file($page);

        foreach ($html1->find('.pearl .main .text') as $key => $value) {
            //echo $value;
            //
            $search = array(
                '&nbsp;',
                '&laquo;',
                '&raquo;',
                '&mdash;',
                '&hellip;',
                '↵'
            );

            $replace = array(
                ' ',
                '«',
                '»',
                '—',
                '...',
                ''
            );
            $text = str_replace($search, $replace, $value->plaintext);

            $linksArr[$id]['poems'][] = $text;

            $resultArr[] = array(
                'text' => $text,
                'author' => $linksArr[$id]['name']
            );
        }

    }

    foreach ($linksArr as $key => $value) {
        getPoems($linksArr[$key]['link'], $key);
    }




    file_put_contents('poems.json', json_encode($linksArr));
    file_put_contents('poems-all.json', json_encode($resultArr));
    echo json_encode($resultArr);
?>

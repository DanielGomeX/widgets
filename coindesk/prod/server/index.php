<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'https://www.coindesk.com/';

    $resultArr= [];

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $linksTable = $html->find('#content', 0);

    foreach ($linksTable->find('div.article') as $key => $value) {




        $title = $value->find('h3', 0)->plaintext;
        $date = $value->find('time', 0)->plaintext;
        $author = $value->find('cite a', 0)->plaintext;
        $img = $value->find('img', 0);
        $text = $value->find('p', 1)->plaintext;
        $smallImage = false;

        if ($attr = $img->getAttribute('srcset') != '') {
            $img = explode(',', $img->getAttribute('srcset'));
            $src = explode(' ', trim($img[count($img) - 1]))[0];
        } else {
            $src = $img->getAttribute('data-cfsrc');
            $smallImage = true;
        }

        //echo $value . '<br>';
        /*echo $title . '<br>';
        echo $date . '<br>';
        echo $author . '<br>';
        echo $src . '<br>';*/
        /*$name = $value->find('td', 1)->find('a', 0)->plaintext;
        //echo $name . '<br>';
        $str = preg_replace("/^[^a-zA-ZА-Яа-я\s]*$/", '', $name);

        $linksArr[$key] = array(
            'name' => $name,
            'link' => 'https://www.inpearls.ru' . $value->find('a', 0)->href
        );*/

        $resultArr[] = array(
            'title' => $title,
            'text' => $text,
            'date' => $date,
            'author' => $author,
            'src' => $src,
            'smallImage' => $smallImage
        );
    }

    /*foreach ($linksArr as $key => $value) {
        getPoems($linksArr[$key]['link'], $key);
    }*/



    echo json_encode($resultArr);
    /*file_put_contents('poems.json', json_encode($linksArr));
    file_put_contents('poems-all.json', json_encode($resultArr));
    echo json_encode($resultArr);*/
?>

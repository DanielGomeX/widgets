<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    include('simple_html_dom.php');

    $url = 'table.html';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $response = array();

    foreach ($html->find('tr') as $key => $value) {

        //echo $value;
        if ($key != 0) {
            foreach ($value->find('div.foto img') as $img) {
                $src = str_replace('100_100', '460_' , $img->src);
            }

            foreach ($value->find('a.profile_title') as $text) {
                $name = $text->plaintext;
            }

            foreach ($value->find('p.descr') as $text) {
                $career = $text->plaintext;
            }

            $response[] = array(
                'place' => (string) $value->find('td', 0)->plaintext,
                'change_place' => (string) $value->find('td', 1)->plaintext,
                'image' => (string) (string) str_replace('http://', 'https://' , $src),
                'name' => (string) $name,
                'career' => (string) $career,
                'money' => (string) $value->find('td', 3)->plaintext,
                'change_money' => (string) $value->find('td', 4)->plaintext,
                'age' => (string) $value->find('td', 5)->plaintext,
                'children' => (string) $value->find('td', 6)->plaintext,
             );
        }
    }
    echo json_encode($response);
?>

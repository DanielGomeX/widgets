<?php
    ini_set('display_errors','off');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'http://www.hostelbookers.com/blog/travel/eating-and-drinking/best-local-drinks/';

    $resultArr= [];

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('.entry-content', 0);
    //echo $table;

    $imageArr = [];
    $textArr = [];

    foreach ($table->find('p') as $key => $item) {

        if ($key > 3 && $key < count($table->find('p')) - 4) {

            if ($item->find('img', 0) == ""){
                $title = trim(explode('.', $item->find('strong', 0)->plaintext)[1]);
                $item->find('strong', 0)->outertext = "";

                $textArr[] = array (
                    'title' => $title,
                    'description' => trim(substr(strip_tags($item->innertext), 1))
                );
            } else {
                $image = $item->find('img', 0)->src;
                $imageArr[] = $image;
            }

            /*
            if ($item->find('strong', 0) != '') {
                $item->find('strong', 0)->outertext = "";
                $description = substr(strip_tags($item->innertext), 2);
            } else {
                $image = $item->find('img', 0)->src . '<br>';
                $imageArr[] = $image;
            }

            $textArr[] = array(
                'title' => $title,
                'description' => $description
            );*/
        }
    }
    /*echo '<pre>';
    var_dump($imageArr);
    echo '</pre>';*/
    foreach ($textArr as $key => $value) {
        $textArr[$key]['image'] = $imageArr[$key];
    }



    //file_put_contents('facts.json', trim(json_encode($resultArr)));
    echo json_encode($textArr);
?>

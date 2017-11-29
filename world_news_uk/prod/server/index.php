<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");

    include('simple_html_dom.php');

    $url = 'https://uk.reuters.com/';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();



    $response = array();

    $content = $html->find('section.module-content', 0);

    //echo $content;

    foreach ($html->find('.story') as $key => $value) {

        $storyContent = $value->find('.story-content', 0);

        $title = $storyContent->find('.story-title', 0)->plaintext;
        $description = trim($value->find('p', 0)->plaintext);

        $hasDescription = false;
        //echo '----------------------' . $description !== '';
        if ($description !== '') {

            $hasDescription = true;
            //echo $value;
        }

        $response[] = array(
            'title' => trim($title),
            'description' => trim($description),
            'hasDescr' => $hasDescription
        );


    }

    echo json_encode($response);
?>

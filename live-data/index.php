<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');

    include('simple_html_dom.php');
    require 'vendor/autoload.php';
    use JonnyW\PhantomJs\Client;

    $resultBeforeArr = [];
    $resultAfterArr = [];

    $content;



    $client = Client::getInstance();
    $client->getEngine()->setPath(dirname(__FILE__).'/bin/phantomjs.exe');

    /**
     * @see JonnyW\PhantomJs\Http\Request
     **/
    $request = $client->getMessageFactory()->createRequest('http://www.worldometers.info/', 'GET');

    /**
     * @see JonnyW\PhantomJs\Http\Response
     **/
    $response = $client->getMessageFactory()->createResponse();

    // Send the request
    $client->send($request, $response);

    if ($response->getStatus() === 200) {

        // Dump the requested page content
        //file_put_contents('before.html', $response->getContent());
        $content = '<div class="aa-count-item>' . $response->getContent() . '</div>';
        sleep(10);
        $client->send($request, $response);
         if ($response->getStatus() === 200) {
            //file_put_contents('after.html', $response->getContent());
            $content .= '<div class="aa-count-item>' . $response->getContent() . '</div>';

            $html = new simple_html_dom();
            $html->load($content);
            $html->save();

            //echo $html;

            $linksTable = $html->find('.aa-count-item', 0);
            echo $linksTable->find('.counterdiv', 0);
            foreach ($linksTable as $key => $item) {
                echo $item->find('.counterdiv', 0) . '---<br>';

                foreach ($item->find('.counter-heading') as $key1 => $div) {
                    //echo $div->find('.rts-counter', 0)->plaintext;
                    //echo $div;

                    $resultBeforeArr[$key][] = array(
                        'name' => $div->find('.counter-item', 0)->plaintext,
                        'number' => str_replace([',', ' '], '', $div->find('.rts-counter', 0)->plaintext)
                    );
                }
            }
         }
    } else {
        echo 123;
    }






    /*$html = new simple_html_dom();
    $html->load($content);
    $html->save();

    echo $html;

    $linksTable = $html->find('.aa-count-item', 0);
    //echo $linksTable;
    foreach ($linksTable as $key => $item) {
        echo $item;

        foreach ($item->find('.counter-heading') as $key1 => $div) {
            //echo $div->find('.rts-counter', 0)->plaintext;
            //echo $div;

            $resultBeforeArr[$key][] = array(
                'name' => $div->find('.counter-item', 0)->plaintext,
                'number' => str_replace([',', ' '], '', $div->find('.rts-counter', 0)->plaintext)
            );
        }
    }*/


    /*$html = new simple_html_dom();
    $html->load($urlBefore);
    $html->save();

    $linksTable = $html->find('.counterdiv', 0);

    //echo $linksTable;
    foreach ($linksTable->find('.counter-heading') as $key => $div) {
        //echo $div->find('.rts-counter', 0)->plaintext;
        //echo $div;

        $resultBeforeArr['before'][] = array(
            'name' => $div->find('.counter-item', 0)->plaintext,
            'number' => str_replace([',', ' '], '', $div->find('.rts-counter', 0)->plaintext)
        );
    }*/

    /*$html1 = new simple_html_dom();
    $html1->load_file($urlAfter);
    $html1->save();

    $linksTable = $html1->find('.counterdiv', 0);

    //echo $linksTable;
    foreach ($linksTable->find('.counter-heading') as $key => $div) {
        //echo $div->find('.rts-counter', 0)->plaintext;
        //echo $div;

        $resultBeforeArr['after'][] = array(
            'name' => $div->find('.counter-item', 0),
            'number' => str_replace([',', ' '], '', $div->find('.rts-counter', 0))
        );
    }*/


    //file_put_contents('info.json', json_encode($resultBeforeArr));
    echo json_encode($resultBeforeArr);

?>
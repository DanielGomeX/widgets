<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');

    require 'vendor/autoload.php';
    use JonnyW\PhantomJs\Client;

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
        file_put_contents('before.html', $response->getContent());
    } else {
        echo 123;
    }



    include('simple_html_dom.php');

    $url = 'before.html';

    $resultArr= [];
    $linksArr = [];

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $linksTable = $html->find('.counterdiv', 0);

    //echo $linksTable;
    foreach ($linksTable->find('.counter-group') as $key => $div) {
        echo $div;
    }

?>
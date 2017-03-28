<?php
    //echo phpinfo();
    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );

    date_default_timezone_set('Europe/Moscow');

    $response = array();
    $currentDate = date('d/m/Y');

    $result = file_get_contents('http://static.feed.rbc.ru/rbc/logical/footer/news.rss');

    $resArr = json_decode($result);


    $news = simplexml_load_file('http://static.feed.rbc.ru/rbc/logical/footer/news.rss', null, LIBXML_NOCDATA);

    foreach ($news->channel->item as $key => $value) {

        $date = new DateTime($value->pubDate);
        //echo array_key_exists('enclosure', $value);

        if ($value->description == "" && array_key_exists('enclosure', $value) == "") {

            continue;
        } else {

            $response['news'][] = array(
                'title' => (string) $value->title,
                'description' => (string) $value->description,
                'author' => (string) $value->author,
                'pubDate' => (string) $date->format('d M H:i'),
                'image' => (string) str_replace('http://', 'https://' , $value->enclosure['url']),
                'is_img' => array_key_exists('enclosure', $value)
            );
        }

    }

    $rate = simplexml_load_file('http://www.cbr.ru/scripts/XML_daily.asp?date_req=' . $currentDate, null, LIBXML_NOCDATA);

    foreach ($rate->Valute as $key => $value) {
        if ($value->CharCode == 'EUR') {
            $response['rate']['EUR'] = (string) substr($value->Value, 0, 5);
        }

        if ($value->CharCode == 'USD') {
            $response['rate']['USD'] = (string) substr($value->Value, 0, 5);
        }
    }
    /*$rate = file_get_contents('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');

    $rate = json_decode($rate);

    foreach ($rate->query->results->rate as $key => $value) {
        $response['rate'][str_replace("/RUB", "", $value->Name)] = round($value->Rate, 2);
    }

    $response['original'] = json_decode(json_encode($news));*/

    echo json_encode($response);

?>
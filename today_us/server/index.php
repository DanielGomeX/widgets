<?php 
    require_once 'unirest-php/src/Unirest.php';
    //echo 'hello world';

    $domain = $_SERVER['HTTP_ORIGIN'];
    $queryString = $_SERVER['QUERY_STRING'];

    header("Access-Control-Allow-Origin:" . $domain );

    $response_arr = new stdClass();

    $date = new DateTime();

    $arr = [];
    for($i = 0; $i < 10; ++$i) {
        $response = Unirest\Request::get("https://numbersapi.p.mashape.com/" . date(m) . "/" . date(d) . "/date?fragment=true&json=true",
          array(
            "X-Mashape-Key" => "pPowah8HFKmshq0ty09Uyz6lUPm2p1o0NB7jsnr5UPvWUbL6ia",
            "Accept" => "text/plain"
          )
        );

        $body = $response->body;

        if ($body->year > 0 ){

            if (strlen($body->year) < 4) {
                $body->year = '0' . $body->year;
            }

            $arr[] = [
                'text' => $body->text,
                'year' => $body->year
            ];
        }
    }

    echo json_encode($arr);
?>
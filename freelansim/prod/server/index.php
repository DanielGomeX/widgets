<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');

    include('bdconnect.php');

    $news = simplexml_load_file('https://freelansim.ru/user_rss_tasks/15JPijxydPYdVde7UKLv9Q==', null, LIBXML_NOCDATA);

    $lastDateQuery = "SELECT pabDate FROM `orders` ORDER BY pabDate DESC LIMIT 1";

    $lastDate = '';

    if ($result = $mysqli->query($lastDateQuery)) {
        while ($row = $result->fetch_assoc()) {
            $lastDate = new DateTime($row["pabDate"]);
        }
        $result->free();
    }

    $countRow = 0;

    foreach ($news->channel->item as $key => $value) {
        $pubDate = new DateTime($value->pubDate);

        if ($pubDate > $lastDate) {
            $response['orders'][] = array(
                'title' => (string) $value->title,
                'description' => (string) $value->description,
                'pubDate' => (string) $pubDate->format('Y-m-d H:i:s'),
                'link' => (string) $value->link
            );

            $pubDate = $pubDate->format('Y-m-d H:i:s');
            $date = date('Y-m-d H:i:s', strtotime($pubDate));

            $query = "INSERT INTO `orders`(`id`, `title`, `link`, `pabDate`, `description`) VALUES ('','".$value->title."','".$value->link."', '" . $date . "','".$value->description."')";

            if ($mysqli->query($query) === TRUE) {
               //echo "Строка " . $key . " успешно записана в БД" . "<br>";
            } else {
                echo 'no';
            }

            ++$countRow;
        }
    }

    $response['status']['lastDate'] = $lastDate->format('d M Y, H:i:s');
    $response['status']['status'] = 'success';
    $response['status']['newLine'] = $countRow;


    //echo 'Время последней публикации ' . $lastDate->format('d M Y, H:i:s') . '<br>';
    //echo 'Добавлено <b>' . $countRow . '</b> строк' . '<br>';

    echo json_encode($response);
?>

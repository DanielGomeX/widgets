<?php
    ini_set('display_errors','off');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'http://www.billboard.com/charts/radio-songs';

    $resultArr= [];

    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('.chart-data div.container', 0);

    foreach ($table->find('article.chart-row') as $key => $item) {

        $place = $item->find('.chart-row__current-week', 0)->plaintext;
        if ($item->find('.chart-row__image', 0)->attr['style'] != '') {
            $image = $item->find('.chart-row__image', 0)->attr['style'];
            $image = substr(explode("(", $image)[1], 0, -1);
        } else if ($item->find('.chart-row__image', 0)->attr['style'] == '' && $item->find('.chart-row__image', 0)->attr['data-imagesrc'] == '') {
            $image = 'http://www.billboard.com/static/frontend/2017_05_23_1734/assets/images/chart-row-placeholder.jpg';
        } else {
            $image = $item->find('.chart-row__image', 0)->attr['data-imagesrc'];
        }

        $lastWeek = $item->find('.chart-row__last-week .chart-row__value', 0)->plaintext;
        $wksOnChart = $item->find('.chart-row__weeks-on-chart .chart-row__value', 0)->plaintext;
        $peakPosition = $item->find('.chart-row__top-spot .chart-row__value', 0)->plaintext;
        $song = $item->find('.chart-row__song', 0)->plaintext;
        $artist = $item->find('.chart-row__artist', 0)->plaintext;

        $resultArr[] = array(
            'place' => trim($place),
            'image' => trim($image),
            'lastWeek' => trim($lastWeek),
            'wksOnChart' => trim($wksOnChart),
            'peakPosition' => trim($peakPosition),
            'song' => trim($song),
            'artist' => trim($artist)
        );

    }

    echo json_encode($resultArr);
?>

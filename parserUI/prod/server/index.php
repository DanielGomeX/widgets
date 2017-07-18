<?php
    ini_set('display_errors','on');
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin:" . "*");
    ini_set('max_execution_time', 900);

    include('simple_html_dom.php');


    $response = array();
    $subPageArr = array();
    $filesArr= array();

    $log = 'result.txt';
    $dir = 'files/';

    $template = array(
        "pageCount" => 0,
        "linkCount" => 0,
        "filesSave" => 0
    );

    $progress = 'result.json';

    file_put_contents($progress, json_encode($template));


    $currenProgress = json_decode(file_get_contents($progress), true);

    //REMOVE
    $currenProgress['pageCount'] = getCountPage();
    file_put_contents($progress, json_encode($currenProgress));
    //

    function getCountPage() {
        global $currenProgress;

        $url = 'https://izsoles.ta.gov.lv';
        $html = new simple_html_dom();
        $html->load_file($url);
        $html->save();

        $arr= array();

        foreach ($html->find('.pagination li') as $key => $value) {
            $arr[] = (int) $value->plaintext;
        }


        return $arr[count($arr) - 2];
    }


    function getLinks() {
        global $currenProgress, $progress;

        $url = 'https://izsoles.ta.gov.lv';
        $html = new simple_html_dom();

        for ($i=1; $i <= 1 ; $i++) {
            $html->load_file($url . '/' . $i);
            $html->save();

            foreach ($html->find('tr') as $key => $value) {
                if ($key != 0) {
                    $subPageArr[$i][] =  $value->find('.auction-list-address a', 0)->href;
                    $currenProgress['linkCount'] = $currenProgress['linkCount'] + 1;
                    file_put_contents($progress, json_encode($currenProgress));
                }
            }
        }

        return $subPageArr;
    }

    function getArticles($page) {
        global $log;

        $files = array();
        $html1 = new simple_html_dom();
        $html1->load_file($page);

        $name = '';
        $link = '';

        if ($html1->find('.object-data', 0) != NULL) {
            $name = $html1->find('.object-data', 0)->plaintext;
        }

        if ( $html1->find('.valuation-file a', 0) != NULL) {
            $link = $html1->find('.valuation-file a', 0)->href;
        }

        $files = array(
            'name' => $name,
            'link' => $link
        );

        /*$current = file_get_contents($log);
        $current .= $files['name'] .'---'. $files['link'] . "\n";
        file_put_contents($log, $current);*/

        return $files;
    }

    foreach(getLinks() as $page => $val) {
        foreach ($val as $key => $url) {
            $filesArr[$page][$key] = getArticles($url);
        }

    }

    function checkFile($name) {
        global $dir;

        if (file_exists($dir . $name . '.pdf')) {
            return true;
        } else {
            return false;
        }
    }


    function getFile($item) {
        global $dir, $currenProgress, $progress;

        $name = $item['name'];
        $name = str_replace('/', '-', $name);

        $link = $item['link'];

            if (!checkFile($name) && $link != '') {
                $file = file_get_contents($link);
                if (!file_put_contents($dir . $name . '.pdf', $file)) {
                    return 'no';
                } else {
                    $currenProgress['filesSave'] = $currenProgress['filesSave'] + 1;
                    file_put_contents($progress, json_encode($currenProgress));
                    return $name;
                }
            } else {
                return 'file exist or link empty';
            }
    }

    foreach ($filesArr as $page => $value) {
        foreach ($value as $key => $item) {
            $response[$page][] = getFile($item);
        }
    }

    $response['json'] = $currenProgress;
    echo json_encode($response);
?>

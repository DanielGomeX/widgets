<?php
    ini_set('display_errors','off');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $url = 'https://en.wikipedia.org/wiki/List_of_motor_yachts_by_length';
    $html = new simple_html_dom();
    $html->load_file($url);
    $html->save();

    $table = $html->find('table', 0);

    $linksArr = array();
    $imagesArr = array();
    $resultArr = array();

    $out = '';

    foreach ($table->find('tr') as $key => $value) {
        if ($key !== 0) {
            $name = $value->find('td', 0)->plaintext;
            $link = $value->find('td', 0)->find('a', 0);

            $linkClass = $link->attr['class'];


            if ($link->href != '' && $linkClass != 'new') {
                $linksArr[$name] = 'https://en.wikipedia.org' . $link->href;
            }

            $size = str_replace(')', '', explode('(', $value->find('td', 1)->plaintext)[1]);
            $built = $value->find('td', 2)->plaintext;
            $owner = $value->find('td', 3)->plaintext;
            $ownerLink = $value->find('td', 3)->find('a', 0)->href;
            $ownerArr = array(
                'name' => $owner
            );
            if ($ownerLink != '') {
                $ownerArr['image'] = getOwnerInfo('https://en.wikipedia.org' . $ownerLink);
            }

            $builder = $value->find('td', 4)->plaintext;
            $country = $value->find('td', 5)->plaintext;
            $image = $value->find('td', 6)->find('a', 0)->href;

            if ($image != '') {
                $imageUrl = 'https://en.wikipedia.org' . $image;
                $imagesArr[$name] = $imageUrl;
                $image = getImageSrc($imageUrl);

                $resultArr[] = array(
                    'title' => $name,
                    'link' => $link->href,
                    'size' => $size,
                    'built' => $built,
                    'builder' => $builder,
                    'owner' => $ownerArr,
                    'image' => $image
                );
            }
        }
    }

    function getImageSrc($url) {

        $html1 = str_get_html(file_get_contents($url));
        $link = $html1->find('.fullMedia', 0)->find('a', 0)->href;
        return $link;
    }

    function getOwnerInfo($url) {
        //echo $url . '<br><br>';
        $html1 = str_get_html(file_get_contents($url));
        if ($html1 == null) {
            return null;
        } else {
            if ($html1->find('.vcard', 0) != null) {
                return $html1->find('.vcard', 0)->find('img', 0)->src;
            } else {
                return null;
            }
        }
    }


    file_put_contents('table.json', trim(json_encode($resultArr)));
    //echo json_encode($resultArr);
?>

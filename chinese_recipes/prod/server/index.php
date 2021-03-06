<?php
    ini_set('display_errors','on');

    header("Access-Control-Allow-Origin:" . "*");
    header('Content-Type: text/html; charset=utf-8');
    include('simple_html_dom.php');

    $linksUrl = 'https://www.bbcgoodfood.com/recipes/collection/chinese';

    $resultArr= [];
    $linksArr = [];

    $html = new simple_html_dom();
    $html->load_file($linksUrl);
    $html->save();

    $linksTable = $html->find('.view-content', 0);

    //echo $linksTable;
    foreach ($linksTable->find('span[itemprop="itemListElement"]') as $key => $value) {
        $linksArr[] = 'https://www.bbcgoodfood.com' . $value->find('a', 0)->href;
    }

    //echo json_encode($linksArr);

    $out = '';

    /*foreach ($linksArr as $key => $link) {
        $out .= '<div class="item">' . file_get_contents($link) . '</div>';
    }*/

    for ($i=0; $i < 10; $i++) {
        $out .= '<div class="item">' . file_get_contents($linksArr[$i]) . '</div>';
    }

    //echo $out;

    $htmlDescr = new simple_html_dom();
    $htmlDescr->load($out);
    $htmlDescr->save();

    $tableDescr = $htmlDescr->find('.item');

    foreach ($tableDescr as $tableDescrKey => $tableDescrValue) {
        //echo $tableDescrKey;

        $name = $tableDescrValue->find('.recipe-header__title', 0)->plaintext;
        $img = $tableDescrValue->find('.img-container  img', 0)->src . '<br>';
        $nutrition = [];
        $ingridients = [];

        foreach ($tableDescrValue->find('.ingredients-list__content li') as $key => $value) {
            if ($a = $value->find('.ingredients-list__glossary-element', 0)){
                $a->outertext = '';
            }
            $ingridients[] = strip_tags($value);
        }

        foreach ($tableDescrValue->find('.recipe-details') as $key => $value) {
            $prep = $value->find('.recipe-details__cooking-time-prep .mins', 0)->plaintext;
            $cook = $value->find('.recipe-details__cooking-time-cook .mins', 0)->plaintext;
            $skill = $value->find('.recipe-details__item--skill-level .recipe-details__text', 0)->plaintext;
            $serves = $value->find('.recipe-details__item--servings .recipe-details__text', 0)->plaintext;
        }

        foreach ($tableDescrValue->find('.nutrition li') as $key => $value) {
            $nutrition[trim($value->find('.nutrition__label', 0)->plaintext)] = trim($value->find('.nutrition__value', 0)->plaintext);
        }

        $resultArr[] = array(
            'name' => trim($name),
            'image' => (string) trim($img),
            'ingridiets' => $ingridients,
            'details' => array(
                'prep' => trim($prep),
                'cook' => trim($cook),
                'skill' => trim($skill),
                'serves' => trim($serves),
            ),
            'nutrition' => $nutrition

        );

    }

    file_put_contents('recipes.json', trim(json_encode($resultArr)));
    echo json_encode($resultArr);
?>

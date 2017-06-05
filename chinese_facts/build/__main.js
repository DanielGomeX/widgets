$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var blockType = [
        'star',
        'black',
        'red'
    ];

    var blockPos = [
        'left',
        'right',
        'top',
        'bottom'
    ];

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createStructure(obj) {

        var _class = '';
        var bg = '';
        var $elem;

        if (!obj.img) {
            _class = blockType[getRandomInRange(0, blockType.length - 1)];
            $elem = '<div class="content__block js-block '+ _class +'"><div class="content__block__title">'+ obj.fact +'</div><div class="fake"></div></div>';
        } else {
            _class = 'bg';
            bg = obj.img;
            $elem = '<div class="content__block js-block '+ _class +'" style="background-image: url('+ bg +')"><div class="content__block__title">'+ obj.fact +'</div><div class="fake"></div></div>';
        }
        //var $elem = '<div class="content__block js-block '+ _class +'" style="background-image: url('+ bg +')"><div class="content__block__title">'+ obj.fact +'</div><div class="fake"></div></div>';
        $('.js-content').append($elem);
    }

    function generateArrayRandomNumber (min, max) {
        var totalNumbers        = max - min + 1,
            arrayTotalNumbers   = [],
            arrayRandomNumbers  = [],
            tempRandomNumber;

        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }

        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }

        return arrayRandomNumbers;
    }


    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'https://js.dooh.xyz/chinese_facts/server/index.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('chinese_facts data - ', JSON.parse(d));
                    //console.log('football data - ', d);

                    d = JSON.parse(d);

                    createStructure(d[1]);

                    for (var item in d) {
                        if (item != 1) {
                            createStructure(d[item]);
                        }
                    }

                    var $block = $('.js-block');
                    var randArr = generateArrayRandomNumber(0, $block.length - 1);

                    for (var i = 0; $block.length > i;i++) {
                        $block.eq(randArr[i]).addClass(blockPos[getRandomInRange(0, blockPos.length - 1)]);
                    }

                    $block.eq(0).addClass('show');

                    var it = 1;
                    setInterval(function(){
                        if (it < $block.length){

                            $block.eq(it).addClass('show');
                            it++;

                        } else {
                            it = 0;
                            $block.removeClass('show');
                            $block.eq(it).addClass('show');
                        }
                    }, 8000)
                } catch (e) {
                    console.log(e);
                    console.log('ошибка внутри ajax');
                    $('.preloader').addClass('error');
                }

            },
            complete: function() {},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                $('.preloader').addClass('error')
            }
        })
    } catch (e) {
        console.log(e);
        console.log('ошибка ajax');
        $('.preloader').addClass('error')
    }
})
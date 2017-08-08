$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var time
      , startTime
      ;

    var maxTextLength = 120;

    function random (min, max) {
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

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        if (data) {
            elem.find('.js-text').html(data.text);
            elem.find('.js-author').html(data.author);

            elem.appendTo('.content')
        } else {
            return;
        }
    }


    $.ajax({
        url: '@@src/redirect.php',
        beforeSend: function(){
            time = new Date();
            startTime = time.getTime();
        },
        success: function(d) {
            time = new Date();
            console.log((time.getTime() - startTime) / 1000);

            try {
                console.log('aphorizm - ', JSON.parse(d));
                //console.log('football data - ', d);
                d = JSON.parse(d);

                var randomArr = random(0, d.length);

                if (d[randomArr[0]].text.length < maxTextLength) {
                    createStructure(d[randomArr[0]], 'new');
                }

                for (var i = 1; randomArr.length > i; i++) {
                    if (d[randomArr[i]] && d[randomArr[i]].text.length < maxTextLength ) {
                        createStructure(d[randomArr[i]], 'create');
                    }
                }

                $('.js-block').eq(0).addClass('active');

                var it = 1;

                var timerId = setTimeout(function tick() {
                    if (it != randomArr.length) {
                        $('.js-block.active').removeClass('active');
                        $('.js-block').eq(it).addClass('active');
                        it++;
                    } else {
                        it = 0;

                    }
                    timerId = setTimeout(tick, 10000);
                }, 10000);

                $('.preloader').hide();
                $('.content').show();

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
})
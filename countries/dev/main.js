$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var randomArr = randomInteger(0, 87);
    var it = 0;

    $.ajax({
        url: '@@src/index.php',
        success: function(d) {
            console.log('country_data', JSON.parse(d));
            d = JSON.parse(d);
            createStructure(d['Австралия'], 'new');
            d.length = 0;
            for (var item in d) {
                var itObj = d[item];
                d.length++;
                if (item != 'Австралия') {
                    createStructure(itObj, 'create');
                }
            }


            setTimeout(function() {
                $('.preloader').hide();
                $('.content').show();
                animate(randomArr[it]);
            }, 2000)


        },
        complete: function() {}
    })

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        elem.find('.js-flag').css('background-image', 'url(' + data.flag + ')');
        elem.find('.js-title').html(data.ru_name);
        elem.find('.js-title').closest('.block').attr('title', data.ru_name);
        elem.find('.js-gerb').css('background-image', 'url(' + data.gerb + ')');
        elem.find('.js-capital').html(data.capital);

        if (data.locals != undefined) {
            elem.find('.js-locals').html(data.locals);
        } else {
            elem.find('.js-locals').closest('.block__row').css('display', 'none');
        }

        if (data.currency != undefined) {
            elem.find('.js-currency').html(data.currency);
        } else {
            elem.find('.js-currency').closest('.block__row').css('display', 'none');
        }

        if (data.phone_code != undefined) {
            elem.find('.js-phone-code').html(data.phone_code);
        } else {
            elem.find('.js-phone-code').closest('.block__row').css('display', 'none');
        }

        elem.appendTo('.content')
    }

    function animate(i) {
        var item = $('.js-block').eq(i);

        item.addClass('active');
        item.find('.js-flag').css({'opacity': 1}).delay(1500).animate({
            'width': '70px',
            'height': '70px',
            'top': '6px',
            'left': getTitlePosition(item.find('.js-title'), 'left') - 80 + 'px',
            'margin': 0
        }, 800)

        setTimeout(function() {
            item.find('.js-gerb').css({'opacity': 1}).delay(1500).animate({
                'width': '70px',
                'height': '70px',
                'top': '6px',
                'left': getTitlePosition(item.find('.js-title'), 'right') + 10 + 'px',
                'margin': 0
            }, 800)
        }, 2000)

        setTimeout(function() {
            item.find('.block__content').addClass('active');
        }, 5000)

        setTimeout(function() {
            item.removeClass('active');
            if (it < randomArr.length) {
                animate(randomArr[it + 1]);
            } else {
                it = 0;
                animate(randomArr[it]);
            }
            it++;
        }, 8000)

    }

    function getTitlePosition($title, pos) {

        if (pos === 'left') {
            return $title.offset().left;
        } else {
            return $title.offset().left + parseInt($title.width());
        }
    }

    function randomInteger (min, max) {
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

})
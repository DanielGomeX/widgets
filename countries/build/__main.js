$(document).ready(function() {
    /* eslint no-console:0 */
    $.ajax({
        url: 'http://widgets/countries/prod/server/info_new.json',
        success: function(d) {
            console.log('country_data', d);

            createStructure(d['Австралия'], 'new');
            d.length = 0;
            for (var item in d) {
                var itObj = d[item];
                d.length++;
                if (item != 'Австралия') {
                    createStructure(itObj, 'create');
                }
            }

            var it = 0;
            setTimeout(function() {
                animate(randomInteger(0, 88)[it]);
            }, 2000)


        },
        complete: function() {}
    })

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone(true).attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        elem.find('.js-flag').attr('src', data.flag);
        elem.find('.js-title').html(data.ru_name);
        elem.find('.js-title').closest('.block').attr('title', data.ru_name);
        elem.find('.js-gerb').attr('src', data.gerb);
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
        item.find('.js-flag').animate({
            'opacity': 1
        }, 500)

        setTimeout(function() {
            item.find('.js-flag').addClass('min');

        }, 1500)

        setTimeout(function() {
            item.find('.js-gerb').animate({
                'opacity': 1
            }, 500)
        }, 1800)

        setTimeout(function() {
            item.find('.js-gerb').addClass('min');
            item.find('.block__content').addClass('active');
        }, 3600)

        /*item.find('.js-flag').addClass('min');
        item.find('.js-gerb').addClass('min');*/

        /*setTimeout(function() {
            item.find('.block__content').addClass('active');
        }, 1300)*/

        setTimeout(function() {
            item.removeClass('active');
            animate(randomInteger(0, 88)[i + 1]);
        }, 8000)

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
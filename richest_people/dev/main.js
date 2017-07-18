$(document).ready(function() {

    $.ajax({
        url: '@@src/index.php',
        success: function(d) {
            console.log('richest_people data', JSON.parse(d));

            var data = JSON.parse(d);
            createStructure(data[0], 'new');

            for (var i=1; data.length > i;i++) {
                createStructure(data[i], 'create');
            }

            var it = 0;
            var timerId = setTimeout(function tick() {
                if (it < data.length) {
                    setTimeout(function() {
                        $('.widget-block.active').find('.widget-block__image').animate({
                            'right': '-1165px'
                        }, 1000, "linear")
                        setTimeout(function() {
                            $('.widget-block.active').find('.widget-block__wrapper').animate({
                                'width': '0px'
                            }, 850)
                            it++;
                        }, 200)

                        setTimeout(function() {
                            $('.widget-block.active').removeClass('active');
                            setTimeout(function() {
                                $('.widget-block').eq(it - 1).find('.widget-block__image').delay(1500).attr('style', '');
                                $('.widget-block').eq(it - 1).find('.widget-block__wrapper').delay(1500).attr('style', '');
                            }, 1500)
                            $('.widget-block').eq(it).fadeIn(1000, function() {
                                $(this).addClass('active');
                            });
                        }, 1200)
                    }, 1000, "linear")
                } else {
                    it = 0;
                }

                timerId = setTimeout(tick, 8000);
            }, 8000);



            $('.widget-block').eq(0).addClass('active');
        }
    })

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.widget-block[data-clone=true]').clone(true).attr('data-clone', 'false') : $('.widget-block[data-clone=true]');

        if (data.change_place.indexOf('+') == 0) {
            elem.find('.widget-block__change-place__text').addClass('plus');
        } else if (data.change_place.indexOf('-') == 0) {
            elem.find('.widget-block__change-place__text').addClass('minus');
        } else if (data.change_place.indexOf('=') == 0) {
            data.change_place = 'не изменилась';
        }

        if (data.change_money.indexOf('+') == 0) {
            elem.find('.widget-block__change-money__text').addClass('plus');
        } else if (data.change_money.indexOf('-') == 0) {
            elem.find('.widget-block__change-money__text').addClass('minus');
        } else if (data.change_money.indexOf('=') == 0) {
            data.change_place = 'не изменилась';
        }

        elem.find('.widget-block__place span').html(data.place);
        elem.find('.widget-block__name').html(data.name);
        elem.find('.widget-block__image__image').attr('src',data.image);
        elem.find('.widget-block__change-place__text').html(data.change_place);
        elem.find('.widget-block__career__text').html(data.career);
        elem.find('.widget-block__money__text').html(data.money);
        elem.find('.widget-block__change-money__text').html(data.change_money);
        elem.find('.widget-block__age span').html(data.age);
        elem.find('.widget-block__childrens span').html(data.children);

        elem.appendTo('.content')
    }
})
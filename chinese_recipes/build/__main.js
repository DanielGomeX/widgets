$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    function createStructure(obj, side) {
        //console.log('createStructure',side);
        var elem = side === 'front' ? $('.js-block-front[data-clone=true]') : $('.js-block-back[data-clone=true]');

        //clean
        elem.find('.js-ingridiets').html('');
        elem.find('.js-details').removeClass('show').removeClass('hide');
        elem.find('.js-nutrition').removeClass('show').removeClass('hide');

        elem.find('.js-title').html(obj.name);

        elem.find('.js-cook').html(obj.details.cook);
        elem.find('.js-prep').html(obj.details.prep);
        elem.find('.js-skill').html(obj.details.skill);
        elem.find('.js-serves').html(obj.details.serves);

        elem.find('.js-kcal').html(obj.nutrition.kcal);
        elem.find('.js-salt').html(obj.nutrition.salt);
        elem.find('.js-sugars').html(obj.nutrition.sugars);
        elem.find('.js-protein').html(obj.nutrition.protein);

        var subArr = [];
        var it = 0;
        subArr[it] = [];

        for (var i = 0; obj.ingridiets.length > i; i++) {
            if (i % 5 == 0) {
                it++;
                subArr[it] = [];
                subArr[it].push(obj.ingridiets[i]);
            } else {
                subArr[it].push(obj.ingridiets[i]);
            }
        }

        subArr.splice(0, 1)
        //console.log(subArr);

        for (var i = 0; subArr.length> i;i++) {
            var ul = '<ul class="ul_'+ i +' animated"></ul>';
            elem.find('.js-ingridiets').append(ul);

            for (var it = 0; subArr[i].length> it;it++) {
                elem.find('.ul_' + i).append('<li>' + subArr[i][it] + '</li>');
            }
        }

    }


    function animate(side) {
        time = new Date();
        startTime = time.getTime();
        var block = $('.js-block-' + side);
        console.log(block);
        setTimeout(function() {
            block.find('.js-details').addClass('show');
        }, 500)

        setTimeout(function() {
            block.find('.js-details').addClass('hide');
        }, 5500)

        setTimeout(function() {
            block.find('.js-nutrition').addClass('show');
        }, 5550)

        setTimeout(function() {
            block.find('.js-nutrition').addClass('hide');
        }, 10550)

        var i = 0;
        var delay = block.find('.js-ingridiets ul').length * 3000;

        var timerId = setTimeout(function tick() {

            if (i < block.find('.js-ingridiets ul').length) {

                block.find('.js-ingridiets ul').eq(i).addClass('active')                    

                setTimeout(function() {
                    block.find('.js-ingridiets ul.active').addClass('shake').removeClass('active');
                    console.log(123);
                    i++;
                }, 3000)
            } else {
                i =0;
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);
            }
            console.log('i',i)
            timerId = setTimeout(tick, 3000);
        }, 11000);

        setTimeout(function() {
            clearTimeout(timerId);
            $('.placeholder').trigger('animateFinished', [side]);
        }, 11000 + delay)
    }

    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'https://js.dooh.xyz/chinese_recipes/server/redirect.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('football data - ', JSON.parse(d));
                    //console.log('football data - ', d);

                    d = JSON.parse(d);
                    createStructure(d[0], 'front');
                    createStructure(d[1], 'back');

                    $('.content').show();
                    $('.preloader').hide();
                    var deg = 0;

                    setTimeout(function(){
                        animate('front');
                    }, 1000)
                    var itm = 2;

                    $('.placeholder').on('animateFinished', function(e, side) {
                        console.log(side);

                        var sideNew = side === 'front' ? 'back' : 'front';

                        deg = deg + 180;
                        $('.flipper').css('transform', 'rotateY('+ deg +'deg)');
                        createStructure(d[itm], side);
                        animate(sideNew);
                        itm++;
                    });

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
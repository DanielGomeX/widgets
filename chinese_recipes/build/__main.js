$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    function createStructure(obj, side) {
        console.log('createStructure',side);
        var elem = side === 'front' ? $('.js-block-front[data-clone=true]') : $('.js-block-back[data-clone=true]');

        //clean
        elem.find('.js-ingridiets').html('');
        elem.find('.js-details').removeClass('show').removeClass('hide');
        elem.find('.js-nutrition').removeClass('show').removeClass('hide');

        elem.find('.js-title').html(obj.name);

        elem.find('.js-cook').html(elem.find('.js-cook').html() + ' ' + obj.details.cook);
        elem.find('.js-prep').html(elem.find('.js-prep').html() + ' ' + obj.details.prep);
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
        //console.log('animate', side);
        var block = $('.js-block-' + side);
        console.log(block);
        setTimeout(function() {
            block.find('.js-details').addClass('show');
            console.log('js-details add show')
        }, 500)

        setTimeout(function() {
            block.find('.js-details').addClass('hide');
            console.log('js-details add hide')
        }, 5500)

        setTimeout(function() {
            block.find('.js-nutrition').addClass('show');
            console.log('js-nutrition add hide')
        }, 5550)

        setTimeout(function() {
            block.find('.js-nutrition').addClass('hide');
            console.log('js-nutrition add hide');
            $('.placeholder').trigger('animateFinished', [side]);
        }, 10550)


        var i = 0;
        /*var timerId = setTimeout(function tick() {

            if (i < block.find('.js-ingridiets ul').length) {

                block.find('.js-ingridiets ul').eq(i).addClass('active');

                setTimeout(function() {
                    block.find('.js-ingridiets ul.active').addClass('shake').removeClass('active');
                    console.log(123);
                    i++;
                }, 3000)
                //i++;
            } else {
                i =0;
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);
                $('.placeholder').trigger('animateFinished', [side]);
            }
            timerId = setTimeout(tick, 3000);
        }, 11000);*/
    }

    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'http://widgets/chinese_recipes/prod/server/recipes.json',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    //console.log('football data - ', JSON.parse(d));
                    console.log('football data - ', d);

                    //d = JSON.parse(d);
                    createStructure(d[0], 'front');
                    createStructure(d[1], 'back');

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

                    });

                    /*setInterval(function() {
                        deg = deg + 180;
                        $('.flipper').css('transform', 'rotateY('+ deg +'deg)');
                        console.log(deg);

                    }, 2000)*/



                } catch (e) {
                    console.log(e);
                    console.log('ошибка внутри ajax');
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
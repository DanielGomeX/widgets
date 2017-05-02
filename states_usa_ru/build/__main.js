$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var translate = {
        ru: {
            title: 'Список Соединенных Штатов Америки',
            capital: 'Столица/Крупнейший город',
            population: 'Население',
            statehood: 'Дата основания',
            territory: {
                name: 'Территория',
                total: 'Всего',
                land: 'Земля',
                water: 'Вода'
            }
        },
        en: {
            title: 'List of Unated States of America',
            capital: 'Capital/largest city',
            population: 'Population',
            statehood: 'Statehood',
            territory: {
                name: 'Territory',
                total: 'Total',
                land: 'Land',
                water: 'Water'
            }
        }
    }

    /*function localization(lang) {
        lacalizeWidget(translate[lang]);
    }*/

    function lacalizeWidget(lang) {
        $('.js-capital').html(translate[lang].capital);
        $('.js-population').html(translate[lang].population);
        $('.js-statehood').html(translate[lang].statehood);
        $('.js-territory').html(translate[lang].territory.name);
        $('.js-territory-total').html(translate[lang].territory.total);
        $('.js-territory-land').html(translate[lang].territory.land);
        $('.js-territory-water').html(translate[lang].territory.water);
    }

    function createStructure(obj, lang, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');
        elem.find('.js-largest-name').removeClass('two');
        elem.find('.js-capital-name').removeClass('two');

        elem.find('.js-state-title').html(obj.name);
        elem.find('.js-flag').attr('src', obj.flag);

        if (obj.capital == obj.largest_city) {
            elem.find('.js-largest-name').remove();
            elem.find('.js-capital-name').html(obj.capital);
        } else {
            elem.find('.js-largest-name').html(obj.largest_city).addClass('two');
            elem.find('.js-capital-name').html(obj.capital).addClass('two');
        }

        elem.find('.js-population-value').html(obj.population);
        elem.find('.js-statehood-value').html(obj.statehood);
        var system;

        if (lang === 'ru') {
            system = 'km'
        } else {
            system = 'mi'
        }
        //console.log(obj.territory.total[system])

        elem.find('.js-territory-total-value').html(obj.territory.total[system]);
        elem.find('.js-territory-land-value').html(obj.territory.land[system]);
        elem.find('.js-territory-water-value').html(obj.territory.water[system]);

        elem.appendTo('.content');
    }

    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'https://js.dooh.xyz/states_usa_ru/server/redirect.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('sates_usa data - ', JSON.parse(d));

                    var obj
                      , lang
                      ;

                    d = JSON.parse(d);

                    for (var item in d) {
                        lacalizeWidget(item);
                        obj = d[item];
                        lang = item;
                    }

                    createStructure(obj[0], lang, 'new');

                    for (var i =1; obj.length > i; i++) {
                        createStructure(obj[i], lang, 'create');
                    }

                    var i = 1;
                    setInterval(function() {
                        if (i < obj.length) {
                            $('.js-block.active').removeClass('active')
                            $('.js-block').eq(i).addClass('active');
                            console.log(i);
                            i++;
                        } else {
                            i = 0;
                            $('.js-block').eq(i).addClass('active');
                        }

                    }, 6000)

                    $('.js-block').eq(0).addClass('active');

                    $('.content__wrapper').show();
                    $('.preloader').hide();
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
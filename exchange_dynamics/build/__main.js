$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */



    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'http://widgets/exchange_dynamics/prod/server/rate.json',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('footwear - data', d);
                    var days = [];
                    var currencyUSDVal = []
                      , currencyEURVal = []
                      ;



                    for (var item in d['апрель']) {
                        days.push(item);


                        currencyUSDVal.push(parseFloat(d['апрель'][item]['USD'].replace(' RUB', '').replace(',','.')));
                        currencyEURVal.push(parseFloat(d['апрель'][item]['EUR'].replace(' RUB', '').replace(',','.')));
                    }


                    var data = {
                        labels: days,
                        series: [
                            currencyUSDVal,
                            currencyEURVal
                        ]
                    };

                    var options = {
                        width: 480,
                        height: 300
                    };

                    new Chartist.Line('.ct-chart', data, options);

                    $('.content__wrapper').show();
                    $('.js-block').eq(0).fadeIn(500).addClass('active');
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

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        if (data.image) {
            elem.find('.js-image').attr('src',  data.image);
        }

        if (data.title) {
            elem.find('.js-title').html(data.title);
        }

        if (data.description){
            elem.find('.js-description').html(cutStr(data.description, 145));
        }

        for (var i = 0; 2 > i;i++) {
            elem.find('.js-footer').append('<div class="content__tag">' + data.category[i] + '</div>');
        }


        elem.appendTo('.content__wrapper');
    }
})
$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    function createStructure(obj, side) {
        //console.log(obj);
        var elem = side === 'front' ? $('.js-block-front[data-clone=true]') : $('.js-block-back[data-clone=true]');
        elem.find('.js-table').html('');
        var matchDate = obj.date.split('-');

        var date = new Date(matchDate[2], matchDate[1] - 1, matchDate[0]);

        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        date = date.toLocaleString("en", options);



        elem.find('.js-home-team').html(obj.home_team);
        elem.find('.js-score').html(obj.score);
        elem.find('.js-avay-team').html(obj.away_team);
        elem.find('.js-date').html(date);

        if (obj.descr) {
            for (var i=0; 4 > i;i++) {
                elem.find('.js-table').append(obj.descr[i]);
            }
            var img = $('.js-table').find('img');

            img.each(function() {
                switch ($(this).attr('alt')) {
                    case 'goal':
                        $(this).attr('src', '@@src/images/ball.svg');
                        break;
                    case 'redcard':
                        $(this).attr('src', '@@src/images/redcard.svg');
                        break;
                    case 'yellowcard':
                        $(this).attr('src', '@@src/images/yellowcard.svg');
                        break;
                }
            })
        } else {
            elem.find('.js-table').html('<tr><td class="not-start">' + obj.status + '</td></tr>')
        }

        switch (obj.status) {
            case 'Не начался':
                elem.find('.js-table').html('<tr><td class="not-start">Not started<div>beginning in </div><div>'+obj.time+'</div></td></tr>')
                break;
            case 'Техн. победа':
                elem.find('.js-table').html('<tr><td class="custom">Technical victory</td></tr>')
                break;
        }


        $('.js-table').animate({
            opacity: 1
        }, 300)
    }

    try {
        var time
          , startTime
          ;

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
                    console.log('football data - ', JSON.parse(d));

                    d = JSON.parse(d);

                    createStructure(d[0], 'front');
                    createStructure(d[1], 'back');

                    var i = 2;

                    setInterval(function() {
                        if (i < d.length) {
                            if (i%2) {
                                $('.flip-container').removeClass('flip');
                                createStructure(d[i], 'front');
                            } else {
                                $('.flip-container').addClass('flip');
                                createStructure(d[i], 'back');
                            }

                            i++;
                        } else {
                            if (i%2) {
                                $('.flip-container').removeClass('flip');
                                createStructure(d[0], 'front');
                                createStructure(d[1], 'back');
                            } else {
                                $('.flip-container').addClass('flip');
                                createStructure(d[0], 'back');
                                createStructure(d[1], 'front');
                            }

                            i = 2;
                        }
                    }, 10000)

                    $('.preloader').animate({
                        'width': '500px',
                        'height': '500px',
                        'margin-left': '-250px',
                        'margin-top': '-250px',
                        'opacity': 0.2
                    }, 500, function() {
                        $(this).addClass('slow');
                    });

                    setTimeout(function() {
                        $('.content').show();
                    }, 600)


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
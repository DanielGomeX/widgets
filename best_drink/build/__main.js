$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var $preloader = $('.preloader')
      , $content = $('.js-content')
      ;

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        elem.css('background-image', 'url(' + data.image + ')');

        var title = data.title.split(',')

        title = title[0] + ', <strong>' + title[1] + '</strong>';
        elem.find('.js-title').html(title);

        if (data.description.length > 200) {
            data.description = data.description.substr(0, 200) + '...';
        }

        var description = '';

        for (var i = 0; data.description.length > i; i++) {
            description += '<span>' + data.description.charAt(i) + '</span>';
        }



        elem.find('.js-text').html(description);

        elem.appendTo('.content')
    }

    function animate(slide) {
        var text = slide.find('.js-text');
        var char = text.find('span');
        //var it = char.length;
        var it = 0;


        setTimeout(function() {
            var interval = setInterval(function() {
                //if (it >= 0) {
                if (it <= char.length) {
                    char.eq(it).animate({
                        top: '350px'
                    }, 200)
                    it++;
                } else {
                    clearInterval(interval);
                    slide.fadeOut(300).next().fadeIn(200);
                    $('.js-content').trigger('animateFinished');
                }
            }, 100)
        }, 8000)

    }

    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'https://js.dooh.xyz/best_drink/server/index.php',
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

                    createStructure (d[0], 'new');
                    for (var i = 1; d.length > i; i++) {
                        createStructure (d[i], 'create');
                    }

                    /*var i = 0;
                    var timerId = setTimeout(function tick() {


                        i++;

                        timerId = setTimeout(tick, 2000);
                    }, 2000);*/
                    $('.js-block').eq(0).show();
                    animate($('.js-block').eq(0));
                    var i = 1;
                    $('.js-content').on('animateFinished', function() {
                        animate($('.js-block').eq(i))
                        i++;
                    })

                    $preloader.hide();
                    $content.show();
                } catch (e) {
                    console.log(e);
                    console.log('ошибка внутри ajax');
                    $preloader.addClass('error');
                }

            },
            complete: function() {},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                $preloader.addClass('error')
            }
        })
    } catch (e) {
        console.log(e);
        console.log('ошибка ajax');
        $preloader.addClass('error')
    }
})
/* eslint no-console: 0 */
$(document).ready(function() {

    var $content = $('.js-content'),
        animationSpeed = 350,
        index = 0,
        respLength = 0;

    var start,
        stop,
        total;


    $.ajax({
        url: 'https://js.dooh.xyz/world_news_uk/server/index.php',
        dataType: 'json',
        success: function(resp) {
            var i = 0;
            start = Date.now();

            resp = shuffle(resp);
            respLength = resp.length;

            console.log('World News uk data - ', resp);

            for (var item in resp) {
                var $block = $("<div/>", {
                    "class": "content__block js-block"
                })

                var $title,
                    $description;

                if (resp[item].hasDescr) {
                    $title = $("<div/>", {
                        "class": "content__block__title js-title",
                        text: resp[item].title
                    }).attr('data-type', 'small');

                    $description = $("<div/>", {
                        "class": "content__block__description",
                        text: resp[item].description
                    })

                    $title.appendTo($block);
                    $description.appendTo($block);
                    $block.appendTo($content);
                } else {
                    $title = $("<div/>", {
                        "class": "content__block__title js-title",
                        text: resp[item].title
                    }).css({
                        'position': 'absolute',
                        'visibility': 'hidden',
                        'left': '1440px'
                    })
                    .appendTo($block)
                    .attr('data-type', 'big');

                    $block.addClass('big').appendTo($content);
                }

                i++;

                if (i === resp.length) {
                    $content.trigger('create');
                }
            }
        }
    })

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function runingString() {
        var $title = $('.js-block').eq(index).find('.js-title'),
            width = parseInt($title.css('width')),
            length = $title.html().length;

        $('.js-block').eq(index).find('.js-title').animate({
            left: -width + 'px'
        }, animationSpeed * length,'linear', function() {
            index++;
            switchBlock();
            $content.trigger('start');
        })
    }

    function switchBlock() {
        $('.js-block').hide().removeClass('active');
        $('.js-block').eq(index).addClass('active').show();
    }

    $content.on('create', function() {
        setTimeout(function() {
            $('.js-title').each(function(index, el) {
                var width = $(el).width();
                $(this).css({
                    'width': width,
                    'visibility': 'visible'
                })
            })

            $content.trigger('start');
        }, 50)
    })

    $content.on('start', function() {
        var type = $('.js-block').eq(index).find($('.js-title')).data('type');

        if (index <= respLength - 1) {
            if (type === 'big') {
                runingString();

            } else if (type === 'small') {
                setTimeout(function() {
                    index++;
                    switchBlock();
                    $content.trigger('start');
                }, 10000)
            }
        } else {
            stop = Date.now();
            total = stop - start;

            setTimeout(function() {
                location.reload();
            }, total * 4)

            index = 0;
            $('.js-block').eq(index).addClass('active').show();
            $('.js-title').css('left', '1440px');
            $content.trigger('start');
        }
    })
})
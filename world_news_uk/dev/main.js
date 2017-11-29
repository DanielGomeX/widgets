$(document).ready(function() {

    var $content = $('.js-content'),
        animationSpeed = 250,
        index = 0;

    $.ajax({
        url: '@@src/index.php',
        dataType: 'json',
        success: function(resp) {
            console.log('World News en data - ', resp);

            var i = 0;

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

                if (i === 0) {
                    //$block.addClass('active');
                }

                i++;

                if (i === resp.length) {
                    $content.trigger('create');
                }
            }
        }
    })

    function runingString() {
        var $title = $('.js-block').eq(index).find('.js-title'),
            width = parseInt($title.css('width')),
            length = $title.html().length;
        console.log(animationSpeed * length);

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
        console.log(type);
        if (type == 'big') {
            runingString();

        } else if (type == 'small') {
            setTimeout(function() {
                index++;
                switchBlock();
                $content.trigger('start');
            }, 2000)
        }
    })
})
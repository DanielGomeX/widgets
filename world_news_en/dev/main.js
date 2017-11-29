$(document).ready(function() {

    var $content = $('.js-content');

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

                $("<div/>", {
                    "class": "content__block__title",
                    text: resp[item].title
                }).appendTo($block);

                $("<div/>", {
                    "class": "content__block__description",
                    text: resp[item].description
                }).appendTo($block);

                if (i === 0) {
                    $block.addClass('active');
                }

                $block.appendTo($content);
                i++;
            }

            var blockIndex = 1;

            var timerId = setTimeout(function tick() {

                if (blockIndex < resp.length) {
                    $('.js-block').removeClass('active');
                    $('.js-block').eq(blockIndex).addClass('active');
                    blockIndex++
                } else {
                    blockIndex = 0;
                    $('.js-block').removeClass('active');
                    $('.js-block').eq(blockIndex).addClass('active');
                }

                timerId = setTimeout(tick, 10000);
            }, 10000);
        }
    })
})
$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var $container = $('.js-content');

    $.ajax({
        url: 'http://widgets/top_yachts/prod/server/redirect.php',
        dataType: 'json',
        beforeSend: function() {
            $('.wait').show();
        },
        error: function(jqXHR, textStatus) {
            console.log('crypto_raiting ajax error -- ' + textStatus);
        },
        success: function(data) {
            $('.wait').hide();
            $container.show();
            console.log(data);

            anim(data[0]);

            var i = 1;

            setInterval(function() {
                anim(data[i]);
                i++;
            }, 10000);


        }
    });


    function anim(d) {
        $container.css('background-image', 'url(' + d.image + ')');

        var timeout = setTimeout(function() {
            $('.noise').fadeIn(300);

        }, 3000);

        setTimeout(function() {
            $('.noise').fadeOut(300);
        }, 9800)

        $('.title').html(d.title);
        $('.js-size').html(d.size);
        $('.js-built').html(d.built);
        $('.js-builder').html(d.builder);
        $('.js-owner').html(d.owner.name);
    }


})
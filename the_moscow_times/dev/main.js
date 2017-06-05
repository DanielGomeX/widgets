$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    function createStructure(data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        elem.find('.js-title').html(data.title);
        elem.find('.js-description').html(data.description);

        elem.appendTo('.content')

    }


    function animate(slide) {
        slide.prev().removeClass('active');
        slide.addClass('active');

        var title = slide.find('.js-title')
          , description = slide.find('.js-description')
          ;


        setTimeout(function() {
          title.addClass('visible');
        }, 1000)

        setTimeout(function() {
          title.addClass('top');
        }, 5000)

        setTimeout(function() {
          description.addClass('visible');
        }, 5500)




    }

   (function() {

        var colors = new Array(
          [62,35,255],
          [60,255,60],
          [255,35,98],
          [45,175,230],
          [255,0,255],
          [255,128,0]);

        var step = 0;
        var colorIndices = [0,1,2,3];
        var gradientSpeed = 0.002;

        function updateGradient() {

            if ( $===undefined ) return;

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";

            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";

            $('.js-bg').css({
                background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"
            }).css({
                background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"
            });

            step += gradientSpeed;
            if ( step >= 1 ) {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

            }
        }

        setInterval(updateGradient,10);
    })();


    try {
        var time
          , startTime
          ;

        $.ajax({
            url: '@@src/index.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('the moscow times data - ', JSON.parse(d));

                    d = JSON.parse(d);

                    //var slide = $('.js-block');

                    createStructure(d[0], 'new')
                    for (var i = 1; d.length > i; i++) {
                        createStructure(d[i], 'create')
                    }


                    animate($('.js-block').eq(0));
                    var it = 1;
                    var timerId = setTimeout(function tick() {

                        animate($('.js-block').eq(it))
                        it++;

                        timerId = setTimeout(tick, 10000);
                    }, 10000);

                    $('.preloader').hide();
                    $('.content').show();

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
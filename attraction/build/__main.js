$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var time
      , startTime
      ;

    var $preloader
      , $content = $('.content')
      ;



    $.ajax({
        url: 'http://widgets/attraction/prod/server/index.php',
        beforeSend: function(){
            time = new Date();
            startTime = time.getTime();
        },
        success: function(d) {
            time = new Date();
            console.log((time.getTime() - startTime) / 1000);

            try {
                console.log('attractions - ', JSON.parse(d));

                d = JSON.parse(d);

                var data = d;

                console.log('123',data.results[0].images[0].thumbnails['640x384']);

                var template = Handlebars.compile( $('#template').html() );
                $content.append( template(data) );


                $('.slider').eq(0).on('init', function(slick){
                    $('.js-block').eq(0).addClass('active');
                    animateImg(0);
                })

                // Slick slider init
                $('.slider').slick({
                    arrows: false,
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                    draggable: false
                });

                $('.slider')
                    .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                        $('.slick-list').addClass('do-transition')
                    })
                    .on('afterChange', function(){
                        $('.slick-list').removeClass('do-transition')
                    });



                /*$preloader.hide();
                $content.show();*/
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

    function animateImg(blockIndex) {
        var block = $('.js-block').eq(blockIndex);
        var image = block.find('img')
        var imageCount = image.length;

        var slider = block.find('.slider');
        var i = 1;

        var timerId = setTimeout(function tick() {
            if (i < imageCount) {
                slider.slick('slickNext');
                i++;
            } else {
                i = 0;
                $(window).trigger('imageAnimateFinish');
                clearTimeout(timerId);
                return;
            }

            timerId = setTimeout(tick, 2000);
        }, 2000);

    }

    $(window).on('imageAnimateFinish', function() {
        var activeIndex = $('.js-block.active').index();
        $('.js-block.active').removeClass('active');

        $('.js-block').eq(activeIndex + 1).addClass('active');
        animateImg(activeIndex + 1);
    });



})
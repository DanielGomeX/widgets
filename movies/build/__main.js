$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var time
      , startTime
      ;

    var $preloader
      , $content = $('.content')
      ;

    var globalData;

    $.ajax({
        url: 'https://js.dooh.xyz/attraction/server/index.php',
        beforeSend: function(){
            time = new Date();
            startTime = time.getTime();
        },
        success: function(d) {
            time = new Date();

            try {
                console.log('attractions - ', JSON.parse(d));

                d = JSON.parse(d);

                var data = globalData = d;

                var template = Handlebars.compile( $('#template').html() );
                $content.append( template(data) );


                $('.slider').eq(0).on('init', function(slick){
                    $('.js-block').eq(0).addClass('active').append('<marquee class="content__block__description" behavior="scroll" direction="left" bgcolor="">'+ globalData.results[0].description +'</marquee>');;
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



                /*$('.preloader').hide();
                $('.content').show();*/
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

            timerId = setTimeout(tick, 3000);
        }, 3000);

    }

    $(window).on('imageAnimateFinish', function() {
        var activeIndex = $('.js-block.active').index();
        $('.js-block.active').removeClass('active');

        if (activeIndex == $('.js-block').length) {
            $('.js-block').eq(0).addClass('active').append('<marquee class="content__block__description" behavior="scroll" direction="left" bgcolor="">'+ globalData.results[0].description +'</marquee>');
            animateImg(0);
        } else {
            $('.content__block__description').remove();
            animateImg(activeIndex - 1);
            $('.js-block').eq(activeIndex - 1).addClass('active').append('<marquee class="content__block__description" behavior="scroll" direction="left" bgcolor="">'+ globalData.results[activeIndex - 1].description +'</marquee>');
        }
    });



})
$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var $preloader = $('.preloader')
      , $content = $('.js-content1')
      , $rollInner = $('.content__block__counter__inner')
      ;


    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }
    function createStructure (data, type) {
        var elemContent = type === 'create' ? $('.js-content-inner[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-content-inner[data-clone=true]');
        var elemDetails = type === 'create' ? $('.js-details[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-details[data-clone=true]');
        var elemArrow = type === 'create' ? $('.js-arrow[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-arrow[data-clone=true]');

        elemContent.find('.js-song').html(data.song);
        elemContent.find('.js-artist').html(data.artist);
        elemContent.find('.js-image').attr('src',data.image);

        elemDetails.find('.js-peak-val').html(data.peakPosition);
        elemDetails.find('.js-last-val').html(data.lastWeek);
        elemDetails.find('.js-on-chart-val').html(data.wksOnChart);

        if (data.lastWeek < data.place) {
            elemArrow.addClass('down')
        } else if (data.lastWeek > data.place) {
            elemArrow.addClass('up')
        }

        elemArrow.appendTo('.js-arrows')
        elemContent.appendTo('.js-content');
        elemDetails.appendTo('.js-round');
    }

    function animate(target) {

        var eq = target.targetNum - 1;
        $rollInner.animate({
            top: -target.position + (2 * 72)
        }, 1000, function() {
            setTimeout(function() {
                $('.js-content').addClass('open')
            }, 200)

            setTimeout(function() {
                $('.js-content-ucho').addClass('open');
            }, 1000)

            /*setTimeout(function() {
                $('.js-content-inner').fadeIn(300)
            }, 1700)*/

            setTimeout(function() {
                $('.js-content-inner').eq(eq).fadeIn(300);
            }, 1900)

            setTimeout(function() {
                $('.js-round').fadeIn(300).delay(300).addClass('open');
            }, 2300)

            setTimeout(function() {
                $('.js-details').eq(eq).fadeIn(300);
                $('.js-arrow').eq(eq).fadeIn(300);

                $(document).trigger('AnimationOpenFinished', [eq]);
            }, 3000)
        })
    }

    function animateClose(target) {
        $('.js-details').eq(target).fadeOut(100);
        setTimeout(function() {
            $('.js-round').removeClass('open');
        }, 100)

        setTimeout(function() {
            $('.js-arrow').eq(target).fadeOut(300);
        }, 600)

        setTimeout(function() {
            $('.js-content-inner').eq(target).fadeOut(300);
        }, 600)

        setTimeout(function() {
            $('.js-content-ucho').removeClass('open');
        }, 800)

        setTimeout(function() {
            $('.js-content').removeClass('open')
        }, 1600)

        setTimeout(function() {

            var target = roll();
            animate(target);
            console.log(target);
        }, 2200)
    }

    function cloneRoll() {
        var nums = $('.content__block__num');
        var clone = nums.clone();
        $rollInner.append(clone);
    }

    function roll() {
        var targetNum = randomInteger(1, 50)

        var nums = $('.content__block__num');
        var aa = [];

        nums.each(function() {
            if ($(this).html() == targetNum) {
                aa.push($(this));
            }
        })
        aa[3].addClass('active');


        return {
            position: aa[3].position().top,
            targetNum: targetNum
        };
    }

    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'https://js.dooh.xyz/top_songs/server/index.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('top songs data - ', JSON.parse(d));
                    //console.log('football data - ', d);

                    d = JSON.parse(d);


                    for (var i = 0; 2 > i; i++) {
                        cloneRoll();
                    }

                    createStructure (d[0], 'new');

                    for (var i = 1; d.length > i;i++) {
                        createStructure (d[i], 'create');
                    }


                    setTimeout(function(){
                        var target = roll();
                        animate(target);
                        console.log(target);
                    }, 600)

                    $(document).on('AnimationOpenFinished', function(e, target) {
                        setTimeout(function() {
                            animateClose(target);
                        }, 10000)
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
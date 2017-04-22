$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */
    try {
        $.ajax({
            url: 'https://js.dooh.xyz/about_watch/server/index.php',
            success: function(d) {
                console.log('about_watch - data', JSON.parse(d));
                var data = JSON.parse(d);
                try {
                    $('.content').css('width', data.length * 480);

                    createStructure (data[0], 'new');
                    
                    for (var i = 1;  data.length > i; i++) {
                        createStructure (data[i], 'create');
                    }


                    var it = 1;
                    setInterval(function() {
                        if (it < data.length) {
                            $('.content').animate({
                                'left': parseInt($('.content').css('left')) - 480 + 'px'
                            },300)
                            it++;
                        } else {
                            $('.content').animate({
                                'left': parseInt($('.content').css('left')) - 480 + 'px'
                            },300).css('left', 0).animate({
                                'left': parseInt($('.content').css('left')) - 480 + 'px'
                            },300);
                            it = 0;
                        }
                    }, 8000)

                    $('.content').show();
                    $('.preloader').hide();
                } catch (e) {
                    console.log(e);
                    console.log('ошибка внутри ajax');
                    $('.js-block').html(e);
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

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        if (data.image) {
            elem.css('background-image', 'url(' + data.image + ')');
        }

        if (data.title) {
            elem.find('.js-title').html(data.title);
        }

        if (data.description){
            elem.find('.js-description').html(cutStr(data.description));
        }


        elem.appendTo('.content');
    }

    function cutStr(str) {
        str = str.substr(0,145);
        var wordsArr = str.split(' ');
        wordsArr.pop();

        return wordsArr.join(' ') + ' ...';
    }
})
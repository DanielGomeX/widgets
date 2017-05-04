$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */
    try {
        $.ajax({
            url: '@@src/index.php',
            success: function(d) {
                console.log('footwear - data', JSON.parse(d));
                var data = JSON.parse(d);
                try {

                    createStructure(data[0], 'new');

                    for (var i = 1; data.length > i;i++) {
                        createStructure(data[i], 'create');
                    }

                    var it = 1;
                    var timerId = setTimeout(function tick() {
                        if (it < data.length) {
                            $('.js-block.active').fadeOut(300);
                            $('.js-block').eq(it).fadeIn(500).addClass('active');
                            it++;
                        } else {
                            it = 0;
                        }
                        timerId = setTimeout(tick, 10000);
                    }, 10000);


                    $('.content__wrapper').show();
                    $('.js-block').eq(0).fadeIn(500).addClass('active');
                    $('.preloader').hide();
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

    function createStructure (data, type) {
        var elem = type === 'create' ? $('.js-block[data-clone=true]').clone().attr('data-clone', 'false') : $('.js-block[data-clone=true]');

        if (data.image) {
            elem.find('.js-image').attr('src',  data.image);
        }

        if (data.title) {
            elem.find('.js-title').html(data.title);
        }

        if (data.description){
            elem.find('.js-description').html(cutStr(data.description, 145));
        }

        for (var i = 0; 2 > i;i++) {
            elem.find('.js-footer').append('<div class="content__tag">' + data.category[i] + '</div>');
        }


        elem.appendTo('.content__wrapper');
    }


    function cutStr(str, maxLen) {
        if (str.length > maxLen) {
            str = str.substr(0,maxLen);
            var wordsArr = str.split(' ');
            wordsArr.pop();

            return wordsArr.join(' ') + ' ...';
        } else {
            return str;
        }
    }
})
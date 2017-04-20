$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */
    try {
        $.ajax({
            url: 'http://widgets/footwear/prod/server/index.php',
            success: function(d) {
                console.log('footwear - data', JSON.parse(d));
                var data = JSON.parse(d);
                try {


                    $('.content').show();
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




        elem.appendTo('.content');
    }

    function cutStr(str) {
        str = str.substr(0,145);
        var wordsArr = str.split(' ');
        wordsArr.pop();

        return wordsArr.join(' ') + ' ...';
    }
})
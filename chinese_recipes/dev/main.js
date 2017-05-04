$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    function createStructure(obj, side) {
        //console.log(obj);
        var elem = side === 'front' ? $('.js-block-front[data-clone=true]') : $('.js-block-back[data-clone=true]');
        
    }

    try {
        var time
          , startTime
          ;

        $.ajax({
            url: '@@src/recipes.json',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    //console.log('football data - ', JSON.parse(d));
                    console.log('football data - ', d);

                    //d = JSON.parse(d);
                    

                    


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
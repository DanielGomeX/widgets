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
        url: '@@src/index.php',
        beforeSend: function(){
            time = new Date();
            startTime = time.getTime();
        },
        success: function(d) {
            time = new Date();
            console.log((time.getTime() - startTime) / 1000);

            try {
                console.log('attractions - ', JSON.parse(d));
                //console.log('football data - ', d);

                d = JSON.parse(d);

                var data = d;

                var template = Handlebars.compile( $('#template').html() );
                $content.append( template(data) );


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

})
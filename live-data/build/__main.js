$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */



    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createStructure(obj) {
        var _class = '';
        var bg = '';
        var $elem;

        $('.js-content').append($elem);
    }

    function generateArrayRandomNumber (min, max) {
        var totalNumbers        = max - min + 1,
            arrayTotalNumbers   = [],
            arrayRandomNumbers  = [],
            tempRandomNumber;

        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }

        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }

        return arrayRandomNumbers;
    }


    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'http://widgets/live-data/prod/server/redirect.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('chinese_facts data - ', JSON.parse(d));
                    //console.log('football data - ', d);

                    d = JSON.parse(d);


                } catch (e) {
                    console.log(e);
                    console.log('ошибка внутри ajax');
                    $('.preloader').addClass('error');
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
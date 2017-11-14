/* eslint no-console:0 */
/* eslint eqeqeq: 0 */

var $container = $('.js-content'),
    $block, $title = $('.js-title'),
    $icon = $('.js-icon');


var curentDate = new Date(),
    curentDateFormat = curentDate.getFullYear() + '-' + (curentDate.getMonth() + 1) + '-' + curentDate.getDate(),
    curentTimeFormat = curentDate.getHours() + ':' + curentDate.getMinutes();

function updateVars() {
    $container = $('.js-content');
    $block = $('.js-block');

    var data = [];
}



function init() {

    updateVars();

    try {
        $.ajax({
            url: 'http://widgets/crypto_raiting/prod/server/redirect.php',
            dataType: 'json',
            beforeSend: function() {
                time = new Date();
                startTime = time.getTime();
            },
            success: function(data) {

                var arr = {};

                console.log(data);

                function ChartData() {
                    this.labels = [];
                    this.series = [];
                }

                data = data[curentDateFormat];


                for (var cur in data) {
                  console.log(cur);

                  arr[cur].labels = data[cur];

                }

                console.log(arr);

            }
        });
    } catch (err) {
        $container.hide();
        console.log('crypto_raiting ajax err', err);
    }

}

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

init();
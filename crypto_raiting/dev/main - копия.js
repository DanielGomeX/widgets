/* eslint no-console:0 */
/* eslint eqeqeq: 0 */

var $container = $('.js-content')
  , $block
  , $title = $('.js-title')
  , $icon = $('.js-icon')
  ;


var curentDate = new Date()
  , curentDateFormat = curentDate.getDate() + '-' + ( curentDate.getMonth() + 1 ) + '-' + curentDate.getFullYear()
  , curentTimeFormat = curentDate.getHours() + ':' + curentDate.getMinutes()
  ;

function updateVars() {
    $container = $('.js-content');
    $block = $('.js-block');

    var data = [];
}



function init() {

    updateVars();

    try {
        $.ajax({
            url: '@@src/redirect.php',
            dataType: 'json',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                data = d;
                var first = random(0, data.length);
                console.log(d);

                var chartData = {
                    labels: [],
                    series: []
                };

                function ChartData() {
                    this.name = '';
                    this.icon = '';
                    this.labels = [];
                    this.series = [];
                }

                var chDataB = new ChartData();
                var chDataE = new ChartData();
                var chDataBC = new ChartData();

                var arrB = [];
                var arrE = [];
                var arrBC = [];

                for (var key in d) {
                    var dateArr = key.split('-')
                      , day = dateArr[0]
                      , mounth = dateArr[1]
                      , year = dateArr[2]
                      ;

                    if (key == curentDateFormat) {
                        for (var k in d[key]) {
                            var timeArr = k.split(':')
                              , hour = timeArr[0]
                              , minute = timeArr[1]
                              ;

                            var date = new Date(year + '-' + mounth + '-' + day + 'T' + hour + ':' + minute);
                            var timeDiff = curentDate - date;

                            chDataB.name = d[key][k][0].name
                            chDataE.name = d[key][k][1].name
                            chDataBC.name = d[key][k][2].name

                            chDataB.icon = d[key][k][0].icon
                            chDataE.icon = d[key][k][1].icon
                            chDataBC.icon = d[key][k][2].icon

                            if (timeDiff/ 3600000 < 4 ) {
                                arrB.push(d[key][k][0].price.replace(',', ''));
                                arrE.push(d[key][k][1].price.replace(',', ''));
                                arrBC.push(d[key][k][2].price.replace(',', ''));
                                chartData.labels.push(k);
                            }

                        }

                        chDataB.series.push(arrB);
                        chDataE.series.push(arrE);
                        chDataBC.series.push(arrBC);
                        chDataB.labels = chDataE.labels = chDataBC.labels = chartData.labels;
                    }
                }

                console.log(chDataBC);

                new Chartist.Line('.ct-chart', chDataBC);
            }
        });
    } catch(err) {
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


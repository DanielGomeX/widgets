/* eslint no-console:0 */
/* eslint eqeqeq: 0 */

var $container = $('.js-content'),
    $block,
    $title = $('.js-title'),
    $icon = $('.js-icon');


var curentDate = new Date(),
    curentDateFormat = curentDate.getFullYear() + '-' + (curentDate.getMonth() + 1) + '-' + curentDate.getDate(),
    curentTimeFormat = curentDate.getHours() + ':' + curentDate.getMinutes();

var currency = [
    {
      name: 'Bitcoin',
      icon: 'https://cdn.coinranking.com/Sy33Krudb/btc.svg',
      color: '#f7931a'
    },
    {
      name: 'Ethereum',
      icon: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg',
      color: '#8c8c8c'
    },
    {
      name: 'Ripple',
      icon: 'https://cdn.coinranking.com/Bkuz9Hd_-/xrp.svg',
      color: '#046fa6'
    }
]

var chartOption = {
  height: 300
}

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
            beforeSend: function() {
                time = new Date();
                startTime = time.getTime();
            },
            success: function(data) {

                var arr = {};

                console.log(data);

                data = data[curentDateFormat];

                var resultArr = {};

                for (var cur in data) {
                  var labels = [],
                      series = [],
                      seriesArr = [];
                  for (var time in data[cur]) {
                    var raitTime = new Date(curentDateFormat + 'T' + time),
                        diff = curentDate - raitTime;

                    if (diff / 3600000 < 4) {
                      labels.push(time);
                      seriesArr.push(data[cur][time].price.replace(',', ''));
                    }
                  }

                  resultArr[cur] = {
                    labels: labels,
                    series: [seriesArr]
                  }
                }

                var i = 0;

                var chart = new Chartist.Line('.ct-chart', resultArr[currency[i].name], chartOption);

                $title.html(currency[i].name);
                $icon.find('img').attr('src', currency[i].icon);

                var timerId = setTimeout(function tick() {

                  if (i < currency.length - 1) {
                    i++;
                  } else {
                    i = 0;
                  }

                  chart.update(resultArr[currency[i].name], chartOption);
                  $title.html(currency[i].name);
                  $icon.find('img').attr('src', currency[i].icon);

                  timerId = setTimeout(tick, 60000 / currency.length);
                }, 60000 / currency.length);


                chart.on('draw', function(context) {

                  if (context.type == 'point' || context.type == 'line') {
                    context.element.attr({
                        style: 'stroke: ' + currency[i].color
                    });
                  }
                });

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
/* eslint no-console:0 */
/* eslint eqeqeq: 0 */

var $container = $('.js-content'),
    $block,
    $title = $('.js-title'),
    $icon = $('.js-icon'),
    $tooltipWrapper = $('.js-tooltip-wrapper');


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

var delay = 30000;

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
                var hiLow;
                var i = 0;
                var minPos = {};
                var maxPos = {};

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

                  timerId = setTimeout(tick, delay / currency.length);
                }, delay / currency.length);


                chart.on('draw', function(context) {

                  if (context.type == 'point' || context.type == 'line') {
                    context.element.attr({
                        style: 'stroke: ' + currency[i].color
                    });
                  }
                });

                chart.on('created', function() {
                  hiLow = getMinMax(resultArr[currency[i].name].series[0]);

                  $('.ct-point').each(function() {
                    var x1 = $(this).attr('x1'),
                        y1 = $(this).attr('y1'),
                        x2 = $(this).attr('x2'),
                        y2 = $(this).attr('y2'),
                        val = $(this).attr('ct:value');

                    if (val == hiLow.min) {
                      $(this).addClass('min');
                      createTooltip('min', x1, y1, x2, y2, val);
                    } else if (val == hiLow.max) {
                      $(this).addClass('max')
                      createTooltip('max', x1, y1, x2, y2, val);
                    }
                  })
                })
            }
        });
    } catch (err) {
        $container.hide();
        console.log('crypto_raiting ajax err', err);
    }

}

function createTooltip(lohi, x1, y1, x2, y2, val) {
  /*var contWidth = 466;
  var xMargin = 15;
  var yMargin = 15;

  var $tooltip = $('.js-tooltip-' + lohi);
  var x = parseInt(x1),
      y = parseInt(y1);

  $tooltip.html(val);

  var tooltipWidth = parseInt($tooltip.outerWidth());

  if (contWidth < parseInt(x1) + tooltipWidth + xMargin ) {
    x = x1 - tooltipWidth - xMargin;
  } else {
    x = x + xMargin;
  }

  $('.js-tooltip-' + lohi).css({
    "top": y1 - yMargin + 'px',
    "left": x + 'px'
  }).html(val);*/
}

function getMinMax(arr) {
  min = arr[0];
  max = min;
  for (i = 1; i < arr.length; ++i) {
      if (arr[i] > max) max = arr[i];
      if (arr[i] < min) min = arr[i];
  }

  return {min: min, max: max}
}

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

init();
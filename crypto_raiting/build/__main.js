/* eslint no-console: 0 */

var $container = $('.js-content'),
    $title = $('.js-title'),
    $icon = $('.js-icon');

var data = [];


var curentDate = new Date(),
    curentDateFormat = curentDate.getFullYear() + '-' + (curentDate.getMonth() + 1) + '-' + curentDate.getDate();

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

var delay = 60000;

function init() {

    setTimeout(function() {
        document.location.reload(true);
    }, 600000)

    try {
        $.ajax({
            url: 'https://js.dooh.xyz/crypto_raiting/server/redirect.php',
            dataType: 'json',
            beforeSend: function() {
                $('.wait').show();
            },
            error: function(jqXHR, textStatus) {
                console.log('crypto_raiting ajax error -- ' + textStatus);
            },
            success: function(data) {
                $('.wait').hide();
                $container.show();

                //var arr = {};
                var hiLow;
                var i = 0;

                console.log(data);

                data = data[curentDateFormat];

                var resultArr = {};

                for (var cur in data) {
                    var labels = [],
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

                    if (context.type === 'point' || context.type === 'line') {
                        context.element.attr({
                            style: 'stroke: ' + currency[i].color
                        });
                    }
                });

                chart.on('created', function() {
                    hiLow = getMinMax(resultArr[currency[i].name].series[0]);
                    $('.js-min-val').html(hiLow.min)
                    $('.js-max-val').html(hiLow.max)

                    $('.ct-point').each(function() {
                        var x1 = $(this).attr('x1'),
                            y1 = $(this).attr('y1'),
                            x2 = $(this).attr('x2'),
                            y2 = $(this).attr('y2'),
                            val = Number($(this).attr('ct:value'));

                        if (val === Number(hiLow.min)) {
                            $(this).addClass('min');
                            createTooltip('min', x1, y1, x2, y2, val);
                        } else if (val === Number(hiLow.max)) {
                            $(this).addClass('max')
                            createTooltip('max', x1, y1, x2, y2, val);
                        }
                    })
                })
            }
        });
    } catch (err) {
        $container.hide();
        $('.sorry').show();
        console.log('crypto_raiting ajax err', err);
    }

}

function createTooltip(lohi, x1, y1, x2, y2, val) {
    var contWidth  = 466,
        contHeight = 250;

    var $tooltip = $('.js-tooltip-' + lohi);
    var x = parseInt(x1),
        y = parseInt(y1) + 3;

    $tooltip.html(val);

    var tooltipWidth = parseInt($tooltip.outerWidth() + 20);
    var tooltipHeight = parseInt($tooltip.outerHeight());

    if (contWidth < parseInt(x1) + tooltipWidth) {
        x = x1 - tooltipWidth;
    }

    if (contHeight < parseInt(y1) + tooltipHeight) {
        y = y1 - tooltipHeight + 7
    }

    $('.js-tooltip-' + lohi).css({
        "top": y + 'px',
        "left": x + 'px'
    }).html(val + '&nbsp;$');
}

function getMinMax(arr) {
    var min = arr[0];
    var max = min;
    for (var i = 1; i < arr.length; ++i) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }

    return {min: min, max: max}
}

init();
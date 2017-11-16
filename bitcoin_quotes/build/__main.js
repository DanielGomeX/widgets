var $container = $('.js-content'),
    $block = $('.js-block');
    $title = $('.js-title'),
    $text = $('.js-text'),
    $num = $('.js-num');


function init() {

  var i = 0;
  var num = 0;
  var randomArr = random(0, data.length -1 );

  var timerId = setTimeout(function tick() {

    if (i < data.length - 1) {
      i++;
      num++;
    } else {
      i = 0;
      num = 1;
    }

    $title.html(data[randomArr[i]].title);
    $text.html(data[randomArr[i]].text);
    $num.html(num);


    timerId = setTimeout(tick, 10000);
  }, 50);


}

function random (min, max) {
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

init();
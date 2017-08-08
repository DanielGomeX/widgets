$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    var block = $('.js-block')
      , randomArr = random(0, block.length)
      , delay = 60 / block.length * 1000
      ;


    function init() {
        console.log(randomArr[0], block.eq(randomArr[0]));
        block.eq(randomArr[0]).addClass('active');

        var i = 1;

        var timerId = setTimeout(function tick() {
            if (i != randomArr.length) {
                animate(i);
                i++;
            } else {
                i = 0;
                randomArr = random(0, block.length)
                animate(i);
            }
            timerId = setTimeout(tick, delay);
        }, delay);

    }

    function animate(i) {
        $('.js-block.active').removeClass('active');
        block.eq(randomArr[i]).addClass('active');
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

})
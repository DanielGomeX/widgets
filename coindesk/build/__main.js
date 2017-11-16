/* eslint no-console:0 */
/* eslint eqeqeq: 0 */

var $container = $('.js-content')
  , $block
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
            url: 'https://js.dooh.xyz/coindesk/server/index.php',
            dataType: 'json',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                data = d;
                var first = random(0, data.length);
                var html = tmpl("template", data);
                var i = 0;

                $container.html( html );

                updateVars();

                $block.eq(i).addClass('active');

                var timerId = setTimeout(function tick() {
                    if (i == data.length - 1) {
                        i = 0;
                        $block.removeClass('active').eq(0).addClass('active');
                    } else {
                        i++;
                        $block.removeClass('active').eq(i).addClass('active');
                    }

                    timerId = setTimeout(tick, 10000);
                }, 10000);
            }
        });
    } catch(err) {
        $container.hide();
        console.log('Coindesk ajax err', err);
    }

}

(function() {
    //console.log(data);
    var cache = {};

    this.tmpl = function tmpl( str, data ) {
        var fn = /^[\w-]+$/.test(str) ?
            cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :

        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            "with(obj){p.push('" +

            str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");

        return data ? fn( data ) : fn;
    };
})();

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

init();


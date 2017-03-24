$(document).ready(function() {
    var $placeholder = $('.placeholder')
      , $diffClock = $('.diffClock')
      ;

    cityNames = [
        'London',
        'Tokyo',
        'New_York'
    ]

    var dialColor = '#fff'
      , minuteHandColor = '#fff'
      , hourHandColor = '#fff'
      ;

    $('.currentClock').thooClock({
        dialColor: dialColor,
        minuteHandColor: minuteHandColor,
        hourHandColor: hourHandColor,
        size: 400
    });

    $.ajax({
        url: 'http://api.timezonedb.com/v2/list-time-zone?key=4RDQE6J2NR27&format=json',
        success: function(data){
            console.log(data);
            var zones = {};            
            for (var i=0;data.zones.length > i;i++) {
                for (a=0; cityNames.length>a;a++) {
                    if (data.zones[i].zoneName.split('/')[1].indexOf(cityNames[a]) != -1) {
                        var date = new Date();                        
                        zones[data.zones[i].zoneName.split('/')[1]] = data.zones[i].gmtOffset * 1000 / 3600000;
                        zones[a] = {
                            'city': data.zones[i].zoneName.split('/')[1],
                            'gmtOffset': data.zones[i].gmtOffset * 1000 / 3600000
                        }
                    }
                }
            }

            var currentZone = new Date();
            var cZ = +(currentZone.getTimezoneOffset() / 60);
            
            $diffClock.each(function(index) {
             
                var offset = +(zones[index].gmtOffset + cZ);
                
                if (offset >= 0 ) {
                    offset = '+' + offset;
                } else {
                    offset = String(offset);
                }

                $(this).thooClock({
                    dialColor: dialColor,
                    minuteHandColor: minuteHandColor,
                    hourHandColor: hourHandColor,
                    size: 260,
                    hourCorrection: String(offset)
                });
            })

            $('.diff_col').css('display', 'inline-block');
        }
    });

})
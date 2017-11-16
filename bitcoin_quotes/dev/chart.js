/*for (var key in d) {
      var dateArr = key.split('-')
        , day = dateArr[0]
        , mounth = dateArr[1]
        , year = dateArr[2]
        ;

      var counter = 0;
      var obj = d[curentDateFormat];
      //console.log(obj);
      for (var k in obj) {
          counter++;
          if (counter < 4) {
              console.log(k);
              console.log(obj[k])
              console.log(  counter);
              var timeArr = k.split(':')
                , hour = timeArr[0]
                , minute = timeArr[1]
                ;

              var date = new Date(year + '-' + mounth + '-' + day + 'T' + hour + ':' + minute);
              var timeDiff = curentDate - date;

              if (timeDiff/ 3600000 < 4 ) {
                  arrB.push(d[key][k][0].price.replace(',', ''));
                  chartData.labels.push(k);
              }
          }


      }
  }*/


  //new Chartist.Line('.ct-chart', chDataBC);
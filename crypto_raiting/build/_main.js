function updateVars(){$container=$(".js-content"),$block=$(".js-block")}function init(){updateVars();try{$.ajax({url:"http://widgets/crypto_raiting/prod/server/redirect.php",dataType:"json",beforeSend:function(){time=new Date,startTime=time.getTime()},success:function(t){console.log(t),t=t[curentDateFormat];var e={};for(var n in t){var r=[],c=[];for(var a in t[n]){var o=new Date(curentDateFormat+"T"+a);(curentDate-o)/36e5<4&&(r.push(a),c.push(t[n][a].price.replace(",","")))}e[n]={labels:r,series:[c]}}var i=0,u=new Chartist.Line(".ct-chart",e[currency[i].name],chartOption);u.on("draw",function(t){"point"!=t.type&&"line"!=t.type||t.element.attr({style:"stroke: "+currency[i].color})}),$title.html(currency[i].name),$icon.find("img").attr("src",currency[i].icon);var s=setTimeout(function t(){i<currency.length-1?i++:i=0,u.update(e[currency[i].name],chartOption),$title.html(currency[i].name),$icon.find("img").attr("src",currency[i].icon),s=setTimeout(t,6e4/currency.length)},6e4/currency.length)}})}catch(t){$container.hide(),console.log("crypto_raiting ajax err",t)}}function random(t,e){var n=t-.5+Math.random()*(e-t+1);return n=Math.round(n)}var $container=$(".js-content"),$block,$title=$(".js-title"),$icon=$(".js-icon"),curentDate=new Date,curentDateFormat=curentDate.getFullYear()+"-"+(curentDate.getMonth()+1)+"-"+curentDate.getDate(),curentTimeFormat=curentDate.getHours()+":"+curentDate.getMinutes(),currency=[{name:"Bitcoin",icon:"https://cdn.coinranking.com/Sy33Krudb/btc.svg",color:"#f7931a"},{name:"Ethereum",icon:"https://cdn.coinranking.com/rk4RKHOuW/eth.svg",color:"#8c8c8c"},{name:"Ripple",icon:"https://cdn.coinranking.com/Bkuz9Hd_-/xrp.svg",color:"#046fa6"}],chartOption={height:300};init();
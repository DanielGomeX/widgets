function init(){setTimeout(function(){document.location.reload(!0)},6e5);try{$.ajax({url:"https://js.dooh.xyz/crypto_raiting/server/redirect.php",dataType:"json",beforeSend:function(){$(".wait").show()},error:function(t,e){console.log("crypto_raiting ajax error -- "+e)},success:function(t){$(".wait").hide(),$container.show();var e,n=0;console.log(t),t=t[curentDateFormat];var r={};for(var a in t){var c=[],o=[];for(var i in t[a]){var s=new Date(curentDateFormat+"T"+i);(curentDate-s)/36e5<4&&(c.push(i),o.push(t[a][i].price.replace(",","")))}r[a]={labels:c,series:[o]}}var u=new Chartist.Line(".ct-chart",r[currency[n].name],chartOption);$title.html(currency[n].name),$icon.find("img").attr("src",currency[n].icon);var l=setTimeout(function t(){n<currency.length-1?n++:n=0,u.update(r[currency[n].name],chartOption),$title.html(currency[n].name),$icon.find("img").attr("src",currency[n].icon),l=setTimeout(t,delay/currency.length)},delay/currency.length);u.on("draw",function(t){"point"!==t.type&&"line"!==t.type||t.element.attr({style:"stroke: "+currency[n].color})}),u.on("created",function(){e=getMinMax(r[currency[n].name].series[0]),$(".js-min-val").html(e.min),$(".js-max-val").html(e.max),$(".ct-point").each(function(){var t=$(this).attr("x1"),n=$(this).attr("y1"),r=$(this).attr("x2"),a=$(this).attr("y2"),c=Number($(this).attr("ct:value"));c===Number(e.min)?($(this).addClass("min"),createTooltip("min",t,n,r,a,c)):c===Number(e.max)&&($(this).addClass("max"),createTooltip("max",t,n,r,a,c))})})}})}catch(t){$container.hide(),$(".sorry").show(),console.log("crypto_raiting ajax err",t)}}function createTooltip(t,e,n,r,a,c){var o=$(".js-tooltip-"+t),i=parseInt(e),s=parseInt(n)+3;o.html(c);var u=parseInt(o.outerWidth()+20),l=parseInt(o.outerHeight());466<parseInt(e)+u&&(i=e-u),250<parseInt(n)+l&&(s=n-l+7),$(".js-tooltip-"+t).css({top:s+"px",left:i+"px"}).html(c+"&nbsp;$")}function getMinMax(t){for(var e=t[0],n=e,r=1;r<t.length;++r)t[r]>n&&(n=t[r]),t[r]<e&&(e=t[r]);return{min:e,max:n}}var $container=$(".js-content"),$title=$(".js-title"),$icon=$(".js-icon"),data=[],curentDate=new Date,curentDateFormat=curentDate.getFullYear()+"-"+(curentDate.getMonth()+1)+"-"+curentDate.getDate(),currency=[{name:"Bitcoin",icon:"https://cdn.coinranking.com/Sy33Krudb/btc.svg",color:"#f7931a"},{name:"Ethereum",icon:"https://cdn.coinranking.com/rk4RKHOuW/eth.svg",color:"#8c8c8c"},{name:"Ripple",icon:"https://cdn.coinranking.com/Bkuz9Hd_-/xrp.svg",color:"#046fa6"}],chartOption={height:300},delay=6e4;init();
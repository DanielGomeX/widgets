function updateVars(){$container=$(".js-content"),$block=$(".js-block")}function init(){updateVars();try{$.ajax({url:"http://widgets/crypto_raiting/prod/server/redirect.php",dataType:"json",beforeSend:function(){time=new Date,startTime=time.getTime()},success:function(t){var e={};console.log(t),t=t[curentDateFormat];for(var n in t)console.log(n),e[n].labels=t[n];console.log(e)}})}catch(t){$container.hide(),console.log("crypto_raiting ajax err",t)}}function random(t,e){var n=t-.5+Math.random()*(e-t+1);return n=Math.round(n)}var $container=$(".js-content"),$block,$title=$(".js-title"),$icon=$(".js-icon"),curentDate=new Date,curentDateFormat=curentDate.getFullYear()+"-"+(curentDate.getMonth()+1)+"-"+curentDate.getDate(),curentTimeFormat=curentDate.getHours()+":"+curentDate.getMinutes();init();
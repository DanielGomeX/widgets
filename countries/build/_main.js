$(document).ready(function(){function e(e,t){var n="create"===t?$(".js-block[data-clone=true]").clone().attr("data-clone","false"):$(".js-block[data-clone=true]");n.find(".js-flag").css("background-image","url("+e.flag+")"),n.find(".js-title").html(e.ru_name),n.find(".js-title").closest(".block").attr("title",e.ru_name),n.find(".js-gerb").css("background-image","url("+e.gerb+")"),n.find(".js-capital").html(e.capital),void 0!=e.locals?n.find(".js-locals").html(e.locals):n.find(".js-locals").closest(".block__row").css("display","none"),void 0!=e.currency?n.find(".js-currency").html(e.currency):n.find(".js-currency").closest(".block__row").css("display","none"),void 0!=e.phone_code?n.find(".js-phone-code").html(e.phone_code):n.find(".js-phone-code").closest(".block__row").css("display","none"),n.appendTo(".content")}function t(e){var c=$(".js-block").eq(e);c.addClass("active"),c.find(".js-flag").css({opacity:1}).delay(1500).animate({width:"70px",height:"70px",top:"6px",left:n(c.find(".js-title"),"left")-80+"px",margin:0},800),setTimeout(function(){c.find(".js-gerb").css({opacity:1}).delay(1500).animate({width:"70px",height:"70px",top:"6px",left:n(c.find(".js-title"),"right")+10+"px",margin:0},800)},2e3),setTimeout(function(){c.find(".block__content").addClass("active")},5e3),setTimeout(function(){c.removeClass("active"),s<o.length?t(o[s+1]):(s=0,t(o[s])),s++},8e3)}function n(e,t){return"left"===t?e.offset().left:e.offset().left+parseInt(e.width())}var o=function(e,t){for(var n,o=t-e+1,s=[],c=[];o--;)s.push(o+e);for(;s.length;)n=Math.round(Math.random()*(s.length-1)),c.push(s[n]),s.splice(n,1);return c}(0,87),s=0;$.ajax({url:"https://js.dooh.xyz/countries/server/index.php",success:function(n){console.log("country_data",JSON.parse(n)),n=JSON.parse(n),e(n["Австралия"],"new"),n.length=0;for(var c in n){var a=n[c];n.length++,"Австралия"!=c&&e(a,"create")}setTimeout(function(){$(".preloader").hide(),$(".content").show(),t(o[s])},2e3)},complete:function(){}})});
$(document).ready(function(){function n(n,e){var t="create"===e?$(".js-block[data-clone=true]").clone(!0).attr("data-clone","false"):$(".js-block[data-clone=true]");t.find(".js-flag").attr("src",n.flag),t.find(".js-title").html(n.ru_name),t.find(".js-title").closest(".block").attr("title",n.ru_name),t.find(".js-gerb").attr("src",n.gerb),t.find(".js-capital").html(n.capital),void 0!=n.locals?t.find(".js-locals").html(n.locals):t.find(".js-locals").closest(".block__row").css("display","none"),void 0!=n.currency?t.find(".js-currency").html(n.currency):t.find(".js-currency").closest(".block__row").css("display","none"),void 0!=n.phone_code?t.find(".js-phone-code").html(n.phone_code):t.find(".js-phone-code").closest(".block__row").css("display","none"),t.appendTo(".content")}function e(n){var o=$(".js-block").eq(n);o.addClass("active"),o.find(".js-flag").animate({opacity:1},500),setTimeout(function(){o.find(".js-flag").addClass("min")},1500),setTimeout(function(){o.find(".js-gerb").animate({opacity:1},500)},1800),setTimeout(function(){o.find(".js-gerb").addClass("min"),o.find(".block__content").addClass("active")},3600),setTimeout(function(){o.removeClass("active"),e(t(0,88)[n+1])},8e3)}function t(n,e){for(var t,o=e-n+1,s=[],c=[];o--;)s.push(o+n);for(;s.length;)t=Math.round(Math.random()*(s.length-1)),c.push(s[t]),s.splice(t,1);return c}$.ajax({url:"http://widgets/countries/prod/server/info_new.json",success:function(o){console.log("country_data",o),n(o["Австралия"],"new"),o.length=0;for(var s in o){var c=o[s];o.length++,"Австралия"!=s&&n(c,"create")}setTimeout(function(){$(".preloader").hide(),$(".content").show(),e(t(0,88)[0])},2e3)},complete:function(){}})});
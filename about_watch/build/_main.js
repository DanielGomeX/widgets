$(document).ready(function(){function t(t,n){var o="create"===n?$(".js-block[data-clone=true]").clone().attr("data-clone","false"):$(".js-block[data-clone=true]");t.image&&o.css("background-image","url("+t.image+")"),t.title&&o.find(".js-title").html(t.title),t.description&&o.find(".js-description").html(e(t.description)),o.appendTo(".content")}function e(t){t=t.substr(0,145);var e=t.split(" ");return e.pop(),e.join(" ")+" ..."}try{$.ajax({url:"https://js.dooh.xyz/about_watch/server/index.php",success:function(e){console.log("about_watch - data",JSON.parse(e));var n=JSON.parse(e);try{$(".content").css("width",480*n.length),t(n[0],"new");for(var o=1;n.length>o;o++)t(n[o],"create");var a=1;setInterval(function(){a<n.length?($(".content").animate({left:parseInt($(".content").css("left"))-480+"px"},300),a++):($(".content").animate({left:parseInt($(".content").css("left"))-480+"px"},300).css("left",0).animate({left:parseInt($(".content").css("left"))-480+"px"},300),a=0)},8e3),$(".content").show(),$(".preloader").hide()}catch(t){console.log(t),console.log("ошибка внутри ajax"),$(".js-block").html(t)}},complete:function(){},error:function(t,e,n){console.log(t,e,n),$(".preloader").addClass("error")}})}catch(t){console.log(t),console.log("ошибка ajax"),$(".preloader").addClass("error")}});
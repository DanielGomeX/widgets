$(document).ready(function(){function e(e,t){console.log("createStructure",t);var i="front"===t?$(".js-block-front[data-clone=true]"):$(".js-block-back[data-clone=true]");i.find(".js-ingridiets").html(""),i.find(".js-details").removeClass("show").removeClass("hide"),i.find(".js-nutrition").removeClass("show").removeClass("hide"),i.find(".js-title").html(e.name),i.find(".js-cook").html(i.find(".js-cook").html()+" "+e.details.cook),i.find(".js-prep").html(i.find(".js-prep").html()+" "+e.details.prep),i.find(".js-skill").html(e.details.skill),i.find(".js-serves").html(e.details.serves),i.find(".js-kcal").html(e.nutrition.kcal),i.find(".js-salt").html(e.nutrition.salt),i.find(".js-sugars").html(e.nutrition.sugars),i.find(".js-protein").html(e.nutrition.protein);var n=[],s=0;n[s]=[];for(var o=0;e.ingridiets.length>o;o++)o%5==0?(s++,n[s]=[],n[s].push(e.ingridiets[o])):n[s].push(e.ingridiets[o]);n.splice(0,1);for(var o=0;n.length>o;o++){var l='<ul class="ul_'+o+' animated"></ul>';i.find(".js-ingridiets").append(l);for(var s=0;n[o].length>s;s++)i.find(".ul_"+o).append("<li>"+n[o][s]+"</li>")}}function t(e){i=new Date,n=i.getTime(),console.log("animate",e);var t=$(".js-block-"+e);setTimeout(function(){t.find(".js-details").addClass("show")},500),setTimeout(function(){t.find(".js-details").addClass("hide")},5500),setTimeout(function(){t.find(".js-nutrition").addClass("show")},5550),setTimeout(function(){t.find(".js-nutrition").addClass("hide")},10550);var s=0,o=setTimeout(function l(){s<t.find(".js-ingridiets ul").length?(t.find(".js-ingridiets ul").eq(s).addClass("active"),setTimeout(function(){t.find(".js-ingridiets ul.active").addClass("shake").removeClass("active"),console.log(123),s++},8e3)):(i=new Date,console.log((i.getTime()-n)/1e3),$(document).trigger("animateFinished",[e])),o=setTimeout(l,8e3)},11e3)}try{var i,n;$.ajax({url:"http://widgets/chinese_recipes/prod/server/recipes.json",beforeSend:function(){i=new Date,n=i.getTime()},success:function(s){i=new Date,console.log((i.getTime()-n)/1e3);try{console.log("football data - ",s),e(s[0],"front"),e(s[1],"back");var o=0;setTimeout(function(){t("front")},1e3);$(document).on("animateFinished",function(i,n){console.log(n);var l="front"===n?"back":"front";o+=180,$(".flipper").css("transform","rotateY("+o+"deg)"),e(s[2],n),t(l)})}catch(e){console.log(e),console.log("ошибка внутри ajax")}},complete:function(){},error:function(e,t,i){console.log(e,t,i),$(".preloader").addClass("error")}})}catch(e){console.log(e),console.log("ошибка ajax"),$(".preloader").addClass("error")}});
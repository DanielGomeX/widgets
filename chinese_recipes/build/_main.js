$(document).ready(function(){function e(e,o){console.log("createStructure",o);var s="front"===o?$(".js-block-front[data-clone=true]"):$(".js-block-back[data-clone=true]");s.find(".js-ingridiets").html(""),s.find(".js-details").removeClass("show").removeClass("hide"),s.find(".js-nutrition").removeClass("show").removeClass("hide"),s.find(".js-title").html(e.name),s.find(".js-cook").html(s.find(".js-cook").html()+" "+e.details.cook),s.find(".js-prep").html(s.find(".js-prep").html()+" "+e.details.prep),s.find(".js-skill").html(e.details.skill),s.find(".js-serves").html(e.details.serves),s.find(".js-kcal").html(e.nutrition.kcal),s.find(".js-salt").html(e.nutrition.salt),s.find(".js-sugars").html(e.nutrition.sugars),s.find(".js-protein").html(e.nutrition.protein);var n=[],t=0;n[t]=[];for(var i=0;e.ingridiets.length>i;i++)i%5==0?(t++,n[t]=[],n[t].push(e.ingridiets[i])):n[t].push(e.ingridiets[i]);n.splice(0,1);for(var i=0;n.length>i;i++){var l='<ul class="ul_'+i+' animated"></ul>';s.find(".js-ingridiets").append(l);for(var t=0;n[i].length>t;t++)s.find(".ul_"+i).append("<li>"+n[i][t]+"</li>")}}function o(e){s=new Date,n=s.getTime();var o=$(".js-block-"+e);console.log(o),setTimeout(function(){o.find(".js-details").addClass("show"),console.log("js-details add show")},500),setTimeout(function(){o.find(".js-details").addClass("hide"),console.log("js-details add hide")},5500),setTimeout(function(){o.find(".js-nutrition").addClass("show"),console.log("js-nutrition add hide")},5550),setTimeout(function(){o.find(".js-nutrition").addClass("hide"),console.log("js-nutrition add hide"),$(".placeholder").trigger("animateFinished",[e])},10550)}try{var s,n;$.ajax({url:"http://widgets/chinese_recipes/prod/server/recipes.json",beforeSend:function(){s=new Date,n=s.getTime()},success:function(t){s=new Date,console.log((s.getTime()-n)/1e3);try{console.log("football data - ",t),e(t[0],"front"),e(t[1],"back");var i=0;setTimeout(function(){o("front")},1e3);$(".placeholder").on("animateFinished",function(s,n){console.log(n);var l="front"===n?"back":"front";i+=180,$(".flipper").css("transform","rotateY("+i+"deg)"),e(t[2],n),o(l)})}catch(e){console.log(e),console.log("ошибка внутри ajax")}},complete:function(){},error:function(e,o,s){console.log(e,o,s),$(".preloader").addClass("error")}})}catch(e){console.log(e),console.log("ошибка ajax"),$(".preloader").addClass("error")}});
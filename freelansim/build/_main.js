$(document).ready(function(){function e(e,o){if("Notification"in window)if("granted"===Notification.permission){new Notification(e,o)}else"denied"!==Notification.permission&&Notification.requestPermission(function(i){if("granted"===i){new Notification(e,o)}else alert("Вы запретили показывать уведомления")});else alert("Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.")}try{var o,i;setInterval(function(){$.ajax({url:"http://widgets/freelansim/prod/server/index.php",beforeSend:function(){o=new Date,i=o.getTime()},success:function(n){o=new Date,console.log((o.getTime()-i)/1e3);try{console.log("freelansim data - ",JSON.parse(n)),n=JSON.parse(n);if(0!=n.status.newLine){console.log($(this).title),console.log($(this).description);for(var t=0;n.orders.length>t;t++)e('<a href="'+n.orders[t].link+'">'+n.orders[t].title+"</a>",{body:n.orders[t].description})}else e("Количество заказов 0",{body:"Наверное еще никому ничего не нужно",icon:"http://widgets/freelansim/prod/server/images/null.png"})}catch(e){console.log(e),console.log("ошибка внутри ajax")}},complete:function(){},error:function(e,o,i){console.log(e,o,i),$(".preloader").addClass("error")}})},12e4)}catch(e){console.log(e),console.log("ошибка ajax"),$(".preloader").addClass("error")}});
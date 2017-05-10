$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */

    function createStructure(obj, side) {
        //console.log(obj);
        var elem = side === 'front' ? $('.js-block-front[data-clone=true]') : $('.js-block-back[data-clone=true]');

    }

    function sendNotification(title, options) {
        // Проверим, поддерживает ли браузер HTML5 Notifications
        if (!("Notification" in window)) {
            alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
        } else if (Notification.permission === "granted") {
            // Если права есть, отправим уведомление
            var notification = new Notification(title, options);

            /*function clickFunc() {
                alert('Пользователь кликнул на уведомление');
            }

            notification.onclick = clickFunc;*/
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // Если права успешно получены, отправляем уведомление
                if (permission === "granted") {
                    var notification = new Notification(title, options);
                } else {
                    alert('Вы запретили показывать уведомления'); // Юзер отклонил наш запрос на показ уведомлений
                }
            });
        } else {
            // Пользователь ранее отклонил наш запрос на показ уведомлений
            // В этом месте мы можем, но не будем его беспокоить. Уважайте решения своих пользователей.
        }
    }

    try {
        var time
          , startTime
          ;


        setInterval(function() {
            $.ajax({
                url: 'http://widgets/freelansim/prod/server/index.php',
                beforeSend: function(){
                    time = new Date();
                    startTime = time.getTime();
                },
                success: function(d) {
                    time = new Date();
                    console.log((time.getTime() - startTime) / 1000);

                    try {
                        console.log('freelansim data - ', JSON.parse(d));
                        //console.log('football data - ', d);

                        d = JSON.parse(d);

                        var newLine = d.status.newLine
                        //console.log(d.status.newLine);

                        if (newLine != 0) {
                            console.log($(this).title);
                            console.log($(this).description);
                            for (var i = 0;d.orders.length > i; i++) {
                                sendNotification('<a href="'+ d.orders[i].link +'">' + d.orders[i].title + '</a>', {
                                    body: d.orders[i].description
                                })
                            }
                        } else {
                            sendNotification('Количество заказов 0', {
                                body: 'Наверное еще никому ничего не нужно',
                                icon: 'http://widgets/freelansim/prod/server/images/null.png'
                            })
                        }


                    } catch (e) {
                        console.log(e);
                        console.log('ошибка внутри ajax');
                    }

                },
                complete: function() {},
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                    $('.preloader').addClass('error')
                }
            })

        }, 120000)
    } catch (e) {
        console.log(e);
        console.log('ошибка ajax');
        $('.preloader').addClass('error')
    }
})
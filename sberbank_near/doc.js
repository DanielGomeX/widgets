/*var myGeocoder = ymaps.geocode(myCoords, "Сбербанк");
                myGeocoder.then(
                    function (res) {

                        var nearest = res.geoObjects;
                        nearest.options.set({
                            'iconLayout': 'default#image',
                            'iconImageHref': 'sb_icon.png',
                            'iconImageSize': [30, 30]
                        })
                        nearest.properties.set('iconContent', 'Sberbank');

                        myMap.geoObjects.add(res.geoObjects);

                        var i = 0;
                        nearest.each(function(){
                            var coords = nearest.get(i++).geometry.getCoordinates();
                            objCoords.push(coords);
                        })

                        var it = 0;
                        var interval = 4000;
                        setInterval(function() {

                            if (it < objCoords.length) {

                                ymaps.route([myCoords, objCoords[it]]).then(
                                    function (route) {
                                        route.getPaths().options.set({
                                            strokeColor: '36AF28',
                                            opacity: 0.9
                                        })

                                        myMap.setBounds(myMap.geoObjects.getBounds(res.geoObjects.get(1), res.geoObjects.get(2)));

                                        myMap.geoObjects.add(route);
                                        setTimeout(function(){
                                            myMap.geoObjects.remove(route);
                                        }, interval - 500)

                                        console.log(route.getLength());
                                    },
                                    function (error) {
                                        console.log('Возникла ошибка: ' + error.message + 'it=' + it);
                                    }
                                );
                                it++;

                            } else {

                                it = 0;

                            }

                        }, interval)

                    },
                    function (err) {
                        console.log(err)
                    }
                );*/
                // построение пешеходного маршрута

                /*ymaps.route([myCoords, objCoords[0]], {
                    multiRoute: true,
                    routingMode: 'pedestrian'
                }).done(
                    function (route) {
                        route.getPaths().options.set({
                            strokeColor: '36AF28',
                            opacity: 0.9
                        })
                        //route.options.set(multiRoute, true);
                        //route.options.set('routingMode', 'pedestrian');

                        myMap.geoObjects.add(route);
                    },
                    function (error) {
                        console.log('Возникла ошибка: ' + error.message + 'it=' + it);
                    }
                );*/

                /*multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        myCoords,
                        objCoords[1]
                    ],
                    params: {
                        //Тип маршрутизации - пешеходная маршрутизация.
                        routingMode: 'pedestrian'
                    }
                }, {
                    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                    //boundsAutoApply: true,
                    //wayPointDraggable: true,
                    wayPointVisible: false
                });
                myMap.geoObjects.add(multiRoute);*/
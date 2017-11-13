$(document).ready(function() {


    var inn = [
        5027048344,
        5024015044,
        6315909714,
        5260104258
    ]

    var data = {
        "entitySearchFilter": {
            "regionNumber": null,
            "onlyActive": false,
            "startRowIndex": 0,
            "pageSize": 15,
            "code": "6164241937",
            "name": null,
            "legalCase": null
        },
        "isCompany": null,
        "isFirmBankrupt": null,
        "isSro": null,
        "isFirmTradeOrg": null,
        "isSroTradePlace": null,
        "isTradePlace": null
    }

    function ajax(data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('post', 'https://fedresurs.ru/api/company/search');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function(){
            if (this.readyState == 4) {
                if (this.status == 200)
                    callback(JSON.parse(this.responseText));
                // иначе сетевая ошибка
            } else {
                //console.log(data.entitySearchFilter.code);
            }
        };
        xhr.send(JSON.stringify(data));
    }

    function sendToServer(data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('post', 'https://widgets.andryushkov.ru/parseinn/index.php');
        //xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function(){
            if (this.readyState == 4) {
                if (this.status == 200)
                    callback(JSON.parse(this.responseText));
                // иначе сетевая ошибка
            }
        };
        console.log(data);
        xhr.send(data);
    }

    for (var i = inn.length - 1; i >= 0; i--) {
        data.entitySearchFilter.code = inn[i];
        ajax(data, function(d) {
            //console.log({inn: JSON.stringify(d.pageData[0])});

            sendToServer({inn: d.pageData[0]}, function(da) {
                console.log(da);
            });
        });
    }

    /*ajax('https://fedresurs.ru/api/company/search', function(data){
        console.log(data.pageData[0]);
    });*/

    /*ajax(url, data, function(data) {
        console.log(data.pageData[0]);
        $.ajax({
            type: "POST",
            url: "http://parseinn.andryushkov.ru/index.php",
            data: {inn: JSON.stringify(data.pageData[0])},
            success: function(msg) {
                console.log("Прибыли данные: " + msg);
            }
        });
    })*/
});

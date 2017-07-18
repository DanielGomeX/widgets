<!DOCTYPE html>
<html>
<head>
    <title>parser</title>
    <script  src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <style type="text/css">
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .content {
            position: absolute;
            top: 50%;
            margin-top: -250px;
            left: 50%;
            margin-left: -250px;
            width: 500px;
            background-color: #eee;
            min-height: 500px;
            box-sizing: border-box;
            padding: 30px;
        }
    </style>
</head>
<body>
    <div class="content">
        <div class="content__row">
            Всего страниц <span class="total-page"></span>
        </div>
        <div class="content__row">
            Осталось страниц <span class="ost-page"></span>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function() {
            $.ajax({
                url: 'prod/server/index.php',
                success: function(data){
                    console.log(data);
                }
            });

            var interval = setInterval(function() {
                $.ajax({
                    url: 'prod/server/redirect.php',
                    success: function(d){
                        console.log('data--', JSON.parse(d));
                        var data = JSON.parse(d)
                        if (data.linkCount != 0) {
                            console.log(data.linkCount - data.filesSave)
                            $('.total-page').html(data.linkCount);
                            $('.ost-page').html(data.linkCount - data.filesSave);

                            if (data.linkCount == data.filesSave) {
                                clearInterval(interval);
                            }

                        }
                    }
                });
            }, 100)


        })
    </script>
</body>
</html>
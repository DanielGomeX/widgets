<?php  include 'prod/server/index.php' ?>

<!DOCTYPE html>
<html>
<head>
    <title>parser</title>
    <script  src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="content">

    </div>
    <script type="text/javascript">
        $(document).ready(function() {
            $.ajax({
                url: 'prod/server/redirect.php',
                success: function(data){
                    console.log(data);
                }
            });
        })
    </script>
</body>
</html>
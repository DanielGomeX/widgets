$(document).ready(function() {


    console.log('test_widget js here');
    var bla = false;

    if (!bla) {
        alert('asd');

        function create() {
            $('.placeholder').append('<div>Hello world</div>');
        }

        create();
    }
})
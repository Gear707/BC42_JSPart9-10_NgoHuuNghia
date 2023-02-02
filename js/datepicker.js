// Hien thi button
$( function() {
    $( "#datepicker" ).datepicker({
        showOn: "button",
        buttonImage: "img/calendar-icon.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: "dd/mm/yy"
    });
} );

// Lay ngay mac dinh
$( document ).ready(function() {
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = ((''+day).length<2 ? '0' : '') + day + '/' + ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
    $('#datepicker').val(output);   
});
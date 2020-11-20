$(document).ready(function() {


  $("#tweet-text").on('keyup', function() {
    //console.log( $(this).val().length); //The this keyword is a reference to the button

    let remaining = 140 - $(this).val().length;

    if (remaining < 0) {
    --remaining;
    $(this).parent("form").find('.counter').addClass("TextRed");
    } else {
      $(this).parent("form").find('.counter').removeClass("TextRed");   
    }

    $(this).parent("form").find('.counter').val(remaining);
   // $('.counter').val(remaining);
  });

});
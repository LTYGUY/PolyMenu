$('#menucategory > button').click(function(){
    $('#menucategory > button').removeClass('active');
    $(this).addClass('active');
  });
  
$('#menucategory > button:first').addClass('active');
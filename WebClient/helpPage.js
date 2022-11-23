$('#helpmenu > button').click(function(){
    $('#helpmenu > button').removeClass('active');
    $(this).addClass('active');
  });
  
$('#helpmenu > button:first').addClass('active');

function displayHelpPage(id){
    closeAllPages();
    $(`#${id}`).show();
}

function closeAllPages(){
    $('#helpPages > div').each(function(){
        $(this).hide();
    });
}
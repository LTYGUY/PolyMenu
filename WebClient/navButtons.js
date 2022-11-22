$('nav > a').click(function(){
    $('nav > a').removeClass('navActive');
    $(this).addClass('navActive');
  });

let noHashPage = true;

$('nav > a').each(function(index){
    if ('#' + $(this).attr("href") == window.location.hash)
    {
        $(this).addClass('navActive')
        noHashPage = false;
    }
});

if (noHashPage)
{
    $('nav > a:first').addClass('navActive')
}
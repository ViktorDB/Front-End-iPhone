/**
 * Created by Viktor on 10/12/14.
 */

showNav = false;
showNavListHistory = false;


$( "#nav-icon" ).click(function() {

    if(showNav == false)
    {
        slideNavOpen();
    }
    else
    {
        slideNavClose();
    }

});

$( "#fullpage" ).click(function() {

    slideNavClose();

});


function slideNavOpen()
{
    $( "#fullpage" ).addClass( "slidefullpage" );
    window.setTimeout(function(){$("#fullpage").removeClass("slidefullpage");}, 500);

    $("nav").css('left', '0px');
    $("#nav-icon").css('left', '250px');
    $("#fullpage").css('left', '250px');

    $("#compareNav").css('left', '250px');
    $("#compareSubNav").css('left', '250px');

    showNav = true;
}

function slideNavClose()
{
    $( "#fullpage" ).addClass( "slidefullpage" );
    window.setTimeout(function(){$("#fullpage").removeClass("slidefullpage");}, 500);

    $("nav").css('left', '-250px');
    $("#nav-icon").css('left', '0px');
    $("#fullpage").css('left', '0px');

    $("#compareNav").css('left', '0px');
    $("#compareSubNav").css('left', '0px');

    showNav = false;
}



$( "#nav-tab-history" ).click(function() {
    if(showNavListHistory == false)
    {
        $("#nav-list-history").css('height', '420px');

        $("#history-sort").css('-webkit-transform', 'rotate(180deg)');
        $("#history-sort").css(' -ms-transform', 'rotate(180deg)');
        $("#history-sort").css('transform', 'rotate(180deg)');
        $("#history-sort").css('margin-top', '15px');

        showNavListHistory = true;
    }
    else
    {
        $("#nav-list-history").css('height', '0px');

        $("#history-sort").css('-webkit-transform', 'rotate(0deg)');
        $("#history-sort").css(' -ms-transform', 'rotate(0deg)');
        $("#history-sort").css('transform', 'rotate(0deg)');
        $("#history-sort").css('margin-top', '10px');

        showNavListHistory = false;
    }

});





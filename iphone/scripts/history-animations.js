/**
 * Created by Viktor on 12/12/14.
 */

function animateIphone2G()
{
    $( "#page3-iphone-caption" ).css( "height", "2%" );

    //$( "#iphone-2g-front" ).css( "height", "0%" );
    $( "#iphone-2g-back" ).css( "left", "-60px" );

    setTimeout(function()
    {
        $( "#page3-iphone-caption" ).css( "height", "15%" );

    }, 2000);

    setTimeout(function()
    {
        $( "#page3-iphone-caption" ).css( "opacity", "1.0" );

    }, 3000);
}


function animateIphone3G()
{
    $( "#page5-iphone-caption" ).css( "height", "5%" );

    //$( "#iphone-2g-front" ).css( "height", "0%" );
    $( "#iphone-3g-side" ).css( "-ms-transform", "rotate(9deg)" );
    $( "#iphone-3g-side" ).css( "-webkit-transform", "rotate(9deg)" );
    $( "#iphone-3g-side" ).css( "transform", "rotate(9deg)" );


    setTimeout(function()
    {
        $( "#page5-iphone-caption" ).css( "height", "15%" );

    }, 1500);

    setTimeout(function()
    {
        $( "#page5-iphone-caption" ).css( "opacity", "1.0" );

    }, 2500);
}


function animateIphone3GS()
{
    //$("#image-3GS").attr("src", "http://localhost:63342/iphone/images/history/iphone-3gs-combo-1.png");
    $( "#page7-iphone-caption" ).html("");

    setTimeout(function()
    {
        $("#image-3GS").attr("src", "http://student.howest.be/viktor.de.bock/3NMCT/iphone/images/history/iPhone-3gs-combo-1.png");
        $( "#page7-iphone-caption" ).html("Save your moments");

    }, 1000);

    setTimeout(function()
    {
        $("#image-3GS").attr("src", "http://student.howest.be/viktor.de.bock/3NMCT/iphone/images/history/iPhone-3gs-combo-2.png");
        $( "#page7-iphone-caption" ).html("Speak the words");

    }, 3000);

    setTimeout(function()
    {
        $( "#page7-iphone-caption" ).html("Explore the world");
        $("#image-3GS").attr("src", "http://student.howest.be/viktor.de.bock/3NMCT/iphone/images/history/iPhone-3gs-combo-3.png");

    }, 5000);


    setTimeout(function()
    {
        $( "#page7-iphone-caption" ).html("Bringing it all together");
        //$("#image-3GS").attr("src", "http://localhost:63342/iphone/images/history/iphone-3gs-combo-3.png");

    }, 7000);
}

function animateIphone4()
{

    $( "#iphone-4-side" ).css( "left", "250px" );

    setTimeout(function()
    {
        $( "#page9-iphone-caption" ).css( "height", "15%" );

    }, 2000);

    setTimeout(function()
    {
        $( "#page9-iphone-caption" ).css( "opacity", "1.0" );

    }, 3000);

}


function animateIphone4S()
{
    $( "#page11-iphone-caption" ).css( "height", "5%" );

    //$( "#iphone-2g-front" ).css( "height", "0%" );
    $( "#iphone-4s-combo-left" ).css( "left", "-40px" );
    //$( "#iphone-4s-combo-middle" ).css( "-webkit-transform", "rotate(9deg)" );
    $( "#iphone-4s-combo-right" ).css( "left", "-50px" );


    setTimeout(function()
    {
        $( "#page11-iphone-caption" ).css( "height", "15%" );

    }, 2000);

    setTimeout(function()
    {
        $( "#page11-iphone-caption" ).css( "opacity", "1.0" );

    }, 3000);
}

function animateIphone5()
{
    $( "#page13-iphone-caption" ).css( "height", "5%" );

    //$( "#iphone-2g-front" ).css( "height", "0%" );
    $( "#iphone-5-combo-left" ).css( "left", "30px" );
    //$( "#iphone-4s-combo-middle" ).css( "-webkit-transform", "rotate(9deg)" );
    $( "#iphone-5-combo-right" ).css( "left", "-30px" );


    setTimeout(function()
    {
        $( "#page13-iphone-caption" ).css( "height", "15%" );

    }, 2000);

    setTimeout(function()
    {
        $( "#page13-iphone-caption" ).css( "opacity", "1.0" );

    }, 3000);
}

function animateIphone5C()
{
    //$( "#page15-iphone-caption" ).css( "height", "5%" );

    $( "#iphone-5c-combo-1" ).css( "top", "130px" );

    setTimeout(function()
    {
        $( "#iphone-5c-combo-2" ).css( "top", "130px" );

    }, 300);

    setTimeout(function()
    {
        $( "#iphone-5c-combo-3" ).css( "top", "130px" );

    }, 600);

    setTimeout(function()
    {
        $( "#iphone-5c-combo-4" ).css( "top", "130px" );

    }, 900);

    setTimeout(function()
    {
        $( "#iphone-5c-combo-5" ).css( "top", "130px" );

    }, 1200);


    setTimeout(function()
    {
        $( "#page15-iphone-caption" ).css( "height", "6%" );

    }, 1500);

    setTimeout(function()
    {
        $( "#page15-iphone-caption" ).css( "opacity", "1.0" );

    }, 2300);
}

function animateIphone5S()
{
    $( "#page17-iphone-caption" ).css( "height", "5%" );

    //$( "#iphone-2g-front" ).css( "height", "0%" );
    //$( "#iphone-4s-combo-middle" ).css( "-webkit-transform", "rotate(9deg)" );
    $( "#iphone-5s-combo-2" ).css( "left", "170px" );


    setTimeout(function()
    {
        $( "#page17-iphone-caption" ).css( "height", "15%" );

    }, 2000);

    setTimeout(function()
    {
        $( "#page17-iphone-caption" ).css( "opacity", "1.0" );

    }, 3000);
}

function animateIphone6()
{
    $( "#page19-iphone-caption" ).css( "height", "5%" );

    //$( "#iphone-2g-front" ).css( "height", "0%" );
    //$( "#iphone-4s-combo-middle" ).css( "-webkit-transform", "rotate(9deg)" );
    $( "#iphone-6plus-1" ).css( "left", "0px" );


    setTimeout(function()
    {
        $( "#page19-iphone-caption" ).css( "height", "15%" );

    }, 2000);

    setTimeout(function()
    {
        $( "#page19-iphone-caption" ).css( "opacity", "1.0" );

    }, 3000);
}


function animateCompareNav()
{
    $( "#compareNav" ).css( "display", "block" );
    $( "#compareSubNav" ).css( "display", "block" );

    setTimeout(function()
    {
        $( "#compareNav" ).css( "opacity", "1" );
        $( "#compareSubNav" ).css( "opacity", "1" );

    }, 100);
}

function animateCompareNavHide()
{
    $( "#compareNav" ).css( "opacity", "0" );
    $( "#compareSubNav" ).css( "opacity", "0" );

    setTimeout(function()
    {
        $( "#compareNav" ).css( "display", "none" );
        $( "#compareSubNav" ).css( "display", "none" );

    }, 100);
}
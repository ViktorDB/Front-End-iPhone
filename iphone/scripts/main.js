/**
 * Created by Viktor on 09/12/14.
 */

clickedNavigation = false;

var animation1 = false;
var animation2 = false;
var animation3 = false;
var animation4 = false;
var animation5 = false;
var animation6 = false;
var animation7 = false;
var animation8 = false;
var animation9 = false;

$( "nav" ).click(function() {

    clickedNavigation = true;
    setTimeout(function(){ clickedNavigation = false; }, 2001);

});

$(document).ready(function() {
    $('#fullpage').fullpage({

        //Navigation
        anchors:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
        navigation: false,

        //Scrolling
        css3: true,
        scrollingSpeed: 1800,
        autoScrolling: true,
        scrollBar: false,
        easing: 'easeInQuart',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 15,



        onLeave: function (index, nextIndex, direction) {



            //SKIP MIDDLESPACE

            if (index == 3 && direction == 'down' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(5); }, 100);

            }

            if (index == 5 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(3); }, 100);

            }





            if (index == 5 && direction == 'down'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(7); }, 100);

            }

            if (index == 7 && direction == 'up'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(5); }, 100);

            }






            if (index == 7 && direction == 'down'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(9); }, 100);

            }

            if (index == 9 && direction == 'up'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(7); }, 100);

            }






            if (index == 9 && direction == 'down'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(11); }, 100);

            }

            if (index == 11 && direction == 'up'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(9); }, 100);

            }








            if (index == 11 && direction == 'down'  && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(13); }, 100);

            }

            if (index == 13 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(11); }, 100);

            }







            if (index == 13 && direction == 'down' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(15); }, 100);

            }

            if (index == 15 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(13); }, 100);

            }






            if (index == 15 && direction == 'down' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(17); }, 100);

            }

            if (index == 17 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(15); }, 100);

            }







            if (index == 17 && direction == 'down' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(19); }, 100);

            }

            if (index == 19 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(17); }, 100);

            }







            if (index == 19 && direction == 'down' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(21); }, 100);

            }

            if (index == 21 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(19); }, 100);

            }


            if (index == 22 && direction == 'down' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(24); }, 100);

            }

            if (index == 24 && direction == 'up' && clickedNavigation == false) {
                //alert("Going to section 4!");
                //setTimeout(function(){ animateIphone2G(); }, 2000);
                setTimeout(function(){ $.fn.fullpage.moveTo(22); }, 100);

            }



            else if (index == 21 && direction == 'down') {
                //alert("Going to section 22!");
                setTimeout(function(){ animateCompareNav(); }, 500);

            }

            else if (index == 22 && direction == 'down') {
                //alert("Going to section 22!");
                setTimeout(function(){ animateCompareNavHide(); }, 50);

            }

            else if (index == 22 && direction == 'up') {
                //alert("Going to section 22!");
                setTimeout(function(){ animateCompareNavHide(); }, 50);

            }




        },

        afterLoad: function(anchorLink, index){

            //GOING TO IPHONE 2G
            //after leaving section 2
            if (index == 3 && animation1 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone2G(); animation1 = true; }, 500);
                //setTimeout(function(){ $.fn.fullpage.moveTo(4); }, 500);

            }

            //GOING TO IPHONE 3G
            //after leaving section 2
            else if (index == 5 && animation2 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone3G(); animation2 = true; }, 500);
                //$.fn.fullpage.moveTo(6);
            }


            //GOING TO IPHONE 3GS
            //after leaving section 2
            else if (index == 7 && animation3 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone3GS(); animation3 = true; }, 500);
                //$.fn.fullpage.moveTo(8);
            }


            //GOING TO IPHONE 4
            //after leaving section 2
            else if (index == 9 && animation4 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone4(); animation4 = true;}, 500);
                //$.fn.fullpage.moveTo(10);
            }


            //GOING TO IPHONE 4s
            //after leaving section 2
            else if (index == 11 && animation5 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone4S();animation5 = true; }, 500);
                //$.fn.fullpage.moveTo(12);
            }

            //GOING TO IPHONE 5
            //after leaving section 2
            else if (index == 13 && animation6 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone5();animation6 = true; }, 500);
                //$.fn.fullpage.moveTo(14);
            }

            //GOING TO IPHONE 5C
            //after leaving section 2
            else if (index == 15 && animation7 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone5C();animation7 = true; }, 500);
                //$.fn.fullpage.moveTo(16);
            }


            //GOING TO IPHONE 5S
            //after leaving section 2
            else if (index == 17 && animation8 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone5S();animation8 = true; }, 500);
                //$.fn.fullpage.moveTo(18);
            }


            //GOING TO IPHONE 6
            //after leaving section 2
            else if (index == 19 && animation9 == false) {
                //alert("Going to section 3!");
                setTimeout(function(){ animateIphone6();animation9 = true; }, 500);

            }



            //using index
            if(index == 22){
                setTimeout(function(){ animateCompareNav();animation10 = true; }, 1);
            }

        }


/*        afterLoad: function(anchorLink, index){
            //using index
            if(index == 23){
                setTimeout(function(){ animateCompareNav(); }, 500);
            }*/

        //}
    });



});




function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        $( "#compare-wrapper" ).css( "top", "120px" );
    else                 // If another browser, return 0

    return false;
}

msieversion();



/**
 * Created by Viktor on 13/12/14.
 */

$( window ).load(function() {
    hideAllCompares();
    hideAllFilters();
    $('.compare-design-iphone').css('display', 'block');
    $('#compare-left-iphone-1').css('display', 'block');
    $('#compare-right-iphone-1').css('display', 'block');
});


/*var selectionLeft = document.getElementById("selectionLeft");
selectionLeft.addEventListener('change', function()
{
    hideAllComparesLeft();
    var selectedLeft = selectionLeft.options[selectionLeft.selectedIndex].value;
    $('#compare-left-iphone-'+selectedLeft).css('display', 'block');
});

var selectionRight = document.getElementById("selectionRight");
selectionRight.addEventListener('change', function()
{
    hideAllComparesRight();
    var selectedRight = selectionRight.options[selectionRight.selectedIndex].value;
    $('#compare-right-iphone-'+selectedRight).css('display', 'block');
});*/

/*
$( "#compareButton" ).click(function() {
    hideAllCompares();

    var selectionLeft = document.getElementById("selectionLeft");
    var selectedLeft = selectionLeft.options[selectionLeft.selectedIndex].value;
    console.log(selectedLeft);

    var selectionRight = document.getElementById("selectionRight");
    var selectedRight = selectionRight.options[selectionRight.selectedIndex].value;
    console.log(selectedRight);

    $('#compare-left-iphone-'+selectedLeft).css('display', 'block');
    $('#compare-right-iphone-'+selectedRight).css('display', 'block');
});
*/


$(".selectListLeft").click(function(e){

    var id = this.id;
    var iphoneName = this.innerHTML;


    $("#chosenLeft").html(iphoneName);

    var resLeft = id.split("-");

    var resultLeft = resLeft[1];


    hideAllComparesLeft();
    $('#compare-left-iphone-'+resultLeft).css('display', 'block');

    $( "#selectionLeftDiv" ).css( "height", "80px" );

    $( "#selectionLeftDiv" ).css( "background-color", "#e6e6e6" );

    $( "#compareSubNav" ).css( "display", "block" );
    setTimeout(function(){ $( "#compareSubNav" ).css( "opacity", "1" ); }, 5);

    e.stopPropagation();
});

$(".selectListRight").click(function(e){
    var id = this.id;
    var iphoneName = this.innerHTML;


    $("#chosenRight").html(iphoneName);

    var resRight = id.split("-");

    var resultRight = resRight[1];


    hideAllComparesRight();
    $('#compare-right-iphone-'+resultRight).css('display', 'block');

    $("#selectionRightDiv").css( "height", "80px" );

    $( "#compareSubNav" ).css( "display", "block" );
    setTimeout(function(){ $( "#compareSubNav" ).css( "opacity", "1" ); }, 5);

    e.stopPropagation();
});




//click on nav
$("#selectionLeftDiv").click(function(){
    $( "#selectionLeftDiv" ).css( "height", "380px" );
    $( "#compareSubNav" ).css( "opacity", "0" );
    setTimeout(function(){ $( "#compareSubNav" ).css( "display", "none" ); }, 300);

    $("#selectionRightDiv").css( "height", "80px" );
    $( "#selectionRightDiv" ).css( "background-color", "#e6e6e6" );

});

$("#selectionRightDiv").click(function(){
    $( "#selectionRightDiv" ).css( "height", "380px" );
    $( "#compareSubNav" ).css( "opacity", "0" );

    setTimeout(function(){ $( "#compareSubNav" ).css( "display", "none" ); }, 300);

    $("#selectionLeftDiv").css( "height", "80px" );
    $( "#selectionLeftDiv" ).css( "background-color", "#e6e6e6" );
});





$('#filter-design').click(function()
{
    hideAllFilters();
    $('.compare-design-iphone').css('display', 'block');
    unclickAllFilters();
    $('#filter-design').css('background-color', '#e6e6e6');

});

$('#filter-screen').click(function()
{
    hideAllFilters();
    $('.compare-screen-iphone').css('display', 'block');
    unclickAllFilters();
    $('#filter-screen').css('background-color', '#e6e6e6');
});

$('#filter-camera').click(function()
{
    hideAllFilters();
    $('.compare-camera-iphone').css('display', 'block');
    unclickAllFilters();
    $('#filter-camera').css('background-color', '#e6e6e6');
});

$('#filter-hardware').click(function()
{
    hideAllFilters();
    $('.compare-hardware-iphone').css('display', 'block');
    unclickAllFilters();
    $('#filter-hardware').css('background-color', '#e6e6e6');
});

$('#filter-battery').click(function()
{
    hideAllFilters();
    $('.compare-battery-iphone').css('display', 'block');
    unclickAllFilters();
    $('#filter-battery').css('background-color', '#e6e6e6');
});

function hideAllCompares()
{

    hideAllComparesLeft();
    hideAllComparesRight();

}

function hideAllComparesLeft()
{
    $('#compare-left-iphone-1').css('display', 'none');
    $('#compare-left-iphone-2').css('display', 'none');
    $('#compare-left-iphone-3').css('display', 'none');
    $('#compare-left-iphone-4').css('display', 'none');
    $('#compare-left-iphone-5').css('display', 'none');
    $('#compare-left-iphone-6').css('display', 'none');
    $('#compare-left-iphone-7').css('display', 'none');
    $('#compare-left-iphone-8').css('display', 'none');
    $('#compare-left-iphone-9').css('display', 'none');
    $('#compare-left-iphone-10').css('display', 'none');
}

function hideAllComparesRight()
{
    $('#compare-right-iphone-1').css('display', 'none');
    $('#compare-right-iphone-2').css('display', 'none');
    $('#compare-right-iphone-3').css('display', 'none');
    $('#compare-right-iphone-4').css('display', 'none');
    $('#compare-right-iphone-5').css('display', 'none');
    $('#compare-right-iphone-6').css('display', 'none');
    $('#compare-right-iphone-7').css('display', 'none');
    $('#compare-right-iphone-8').css('display', 'none');
    $('#compare-right-iphone-9').css('display', 'none');
    $('#compare-right-iphone-10').css('display', 'none');
}

function hideAllFilters()
{
    $('.compare-design-iphone').css('display', 'none');
    $('.compare-screen-iphone').css('display', 'none');
    $('.compare-camera-iphone').css('display', 'none');
    $('.compare-hardware-iphone').css('display', 'none');
    $('.compare-battery-iphone').css('display', 'none');
}

function unclickAllFilters()
{
    $('#filter-design').css('background-color', '#afafaf');
    $('#filter-screen').css('background-color', '#afafaf');
    $('#filter-camera').css('background-color', '#afafaf');
    $('#filter-hardware').css('background-color', '#afafaf');
    $('#filter-battery').css('background-color', '#afafaf');
}

setTimeout(function()
{
    hideAllCompares();
    hideAllFilters();
    $('#compare-left-iphone-1').css('display', 'block');
    $('#compare-right-iphone-1').css('display', 'block');
    $('.compare-design-iphone').css('display', 'block');

}, 500);
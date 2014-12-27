/**
 * Created by Viktor on 07/12/14.
 */

iphoneArray = [];

console.log("json ingelezen");

$(document).ready(function () { // load json file using jquery ajax
    $.getJSON('./data/iphones.json', function (data) {
        var outputLeft = '';
        var outputRight = '';
        $.each(data, function (key, val) {
            var i = key+1;
            iphoneArray.push(data);

            //LINKS

            //hoofddiv openen
            outputLeft += '<div id='+"compare-left-iphone-" + i + ' class='+"compare-box"+'>';

            //img openen
            outputLeft += '<div id='+"img-left-iphone-" + i + ' class='+"compare-img-iphone"+'>';

            outputLeft += '<div><img src="' + val.image + '"></div>';

            //img sluiten
            outputLeft += '</div>';

            //naam openen
            outputLeft += '<div id='+"name-left-iphone-" + i + ' class='+"compare-name-iphone"+'>';

            //outputLeft += '<div>' + val.name + '</div>';

            //naam sluiten
            outputLeft += '</div>';

            //design openen
            outputLeft += '<div id='+"design-left-iphone-" + i + ' class='+"compare-design-iphone"+'>';

            outputLeft += '<table>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Dimension" + '</td><td>' + val.dimension + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Weight" + '</td><td>' + val.weight + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Material" + '</td><td>' + val.material + '</td>';
            outputLeft += '</tr>';

            outputLeft += '</table>';

            //design sluiten
            outputLeft += '</div>';

            //screen openen
            outputLeft += '<div id='+"screen-left-iphone-" + i + ' class='+"compare-screen-iphone"+'>';

            outputLeft += '<table>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Display Size" + '</td><td>' + val.displaysize + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Resolution" + '</td><td>' + val.displayresolution + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Pixel Density" + '</td><td>' + val.pixeldensity + '</td>';
            outputLeft += '</tr>';

            outputLeft += '</table>';

            //screen sluiten
            outputLeft += '</div>';

            //camera openen
            outputLeft += '<div id='+"camera-left-iphone-" + i + ' class='+"compare-camera-iphone"+'>';

            outputLeft += '<table>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Camera MP" + '</td><td>' + val.cameramp + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Front-Camera MP" + '</td><td>' + val.frontcameramp + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Camcorder" + '</td><td>' + val.camcorder + '</td>';
            outputLeft += '</tr>';

            outputLeft += '</table>';

            //camera sluiten
            outputLeft += '</div>';

            //hardware openen
            outputLeft += '<div id='+"hardware-left-iphone-" + i + ' class='+"compare-hardware-iphone"+'>';

            outputLeft += '<table>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "System Chip" + '</td><td>' + val.systemchip + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Processor" + '</td><td>' + val.processor + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Graphics Processor" + '</td><td>' + val.graphicprocessor + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "System Memory" + '</td><td>' + val.systemmemory + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Storage" + '</td><td>' + val.storage + '</td>';
            outputLeft += '</tr>';

            outputLeft += '</table>';

            //hardware sluiten
            outputLeft += '</div>';

            //battery openen
            outputLeft += '<div id='+"battery-left-iphone-" + i + ' class='+"compare-battery-iphone"+'>';

            outputLeft += '<table>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Stand-by time" + '</td><td>' + val.standbytime + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Talk time" + '</td><td>' + val.talktime + '</td>';
            outputLeft += '</tr>';

            outputLeft += '<tr>';
            outputLeft += '<td>' + "Capacity" + '</td><td>' + val.capacity + '</td>';
            outputLeft += '</tr>';

            outputLeft += '</table>';

            //battery sluiten
            outputLeft += '</div>';

            //hoofddiv sluiten
            outputLeft += '</div>';





            //RECHTS

            //hoofddiv openen
            outputRight += '<div id='+"compare-right-iphone-" + i + ' class='+"compare-box"+'>';

            //img openen
            outputRight += '<div id='+"img-right-iphone-" + i + ' class='+"compare-img-iphone"+'>';

            outputRight += '<div><img src="' + val.image + '"></div>';

            //img sluiten
            outputRight += '</div>';

            //naam openen
            outputRight += '<div id='+"name-right-iphone-" + i + ' class='+"compare-name-iphone"+'>';

            //outputRight += '<div>' + val.name + '</div>';

            //naam sluiten
            outputRight += '</div>';

            //design openen
            outputRight += '<div id='+"design-right-iphone-" + i + ' class='+"compare-design-iphone"+'>';

            outputRight += '<table>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Dimension" + '</td><td>' + val.dimension + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Weight" + '</td><td>' + val.weight + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Material" + '</td><td>' + val.material + '</td>';
            outputRight += '</tr>';

            outputRight += '</table>';

            //design sluiten
            outputRight += '</div>';

            //screen openen
            outputRight += '<div id='+"screen-right-iphone-" + i + ' class='+"compare-screen-iphone"+'>';

            outputRight += '<table>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Display Size" + '</td><td>' + val.displaysize + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Resolution" + '</td><td>' + val.displayresolution + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Pixel Density" + '</td><td>' + val.pixeldensity + '</td>';
            outputRight += '</tr>';

            outputRight += '</table>';

            //screen sluiten
            outputRight += '</div>';

            //camera openen
            outputRight += '<div id='+"camera-right-iphone-" + i + ' class='+"compare-camera-iphone"+'>';

            outputRight += '<table>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Camera MP" + '</td><td>' + val.cameramp + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Front-Camera MP" + '</td><td>' + val.frontcameramp + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Camcorder" + '</td><td>' + val.camcorder + '</td>';
            outputRight += '</tr>';

            outputRight += '</table>';

            //camera sluiten
            outputRight += '</div>';

            //hardware openen
            outputRight += '<div id='+"hardware-right-iphone-" + i + ' class='+"compare-hardware-iphone"+'>';

            outputRight += '<table>';

            outputRight += '<tr>';
            outputRight += '<td>' + "System Chip" + '</td><td>' + val.systemchip + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Processor" + '</td><td>' + val.processor + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Graphics Processor" + '</td><td>' + val.graphicprocessor + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "System Memory" + '</td><td>' + val.systemmemory + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Storage" + '</td><td>' + val.storage + '</td>';
            outputRight += '</tr>';

            outputRight += '</table>';

            //hardware sluiten
            outputRight += '</div>';

            //battery openen
            outputRight += '<div id='+"battery-right-iphone-" + i + ' class='+"compare-battery-iphone"+'>';

            outputRight += '<table>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Stand-by time" + '</td><td>' + val.standbytime + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Talk time" + '</td><td>' + val.talktime + '</td>';
            outputRight += '</tr>';

            outputRight += '<tr>';
            outputRight += '<td>' + "Capacity" + '</td><td>' + val.capacity + '</td>';
            outputRight += '</tr>';

            outputRight += '</table>';

            //battery sluiten
            outputRight += '</div>';

            //hoofddiv sluiten
            outputRight += '</div>';
        });
        console.log(iphoneArray);

        $('#compare-left').html(outputLeft); 	// replace all existing content
        $('#compare-right').html(outputRight); 	// replace all existing content
    });
});
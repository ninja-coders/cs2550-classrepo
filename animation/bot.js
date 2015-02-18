var botImg, msPerFrame, frameCount, moveDist, botDivWidth;
var botLeft;
var margin = 10;

function startMove() {
    botImg = document.getElementById("botImg");

    var msPerFrameTxt = document.getElementById("msPerFrameTxt");
    msPerFrame = msPerFrameTxt.value;

/*
    var frameCountTxt = document.getElementById("frameCountTxt");
    frameCount = frameCountTxt.value;
*/

    var moveDistTxt = document.getElementById("moveDistTxt");
    moveDist = parseInt(moveDistTxt.value);

    var botDiv = document.getElementById("botDiv");
    botDivWidth = botDiv.offsetWidth;

    botLeft = 0;
    setTimeout(moveBot, msPerFrame);
}

function moveBot() {
    botLeft += moveDist;
    botImg.style.left = botLeft + "px";

    if (botLeft < botDivWidth - botImg.width - margin) {
	setTimeout(moveBot, msPerFrame);
    }
}

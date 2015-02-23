var HEX_HEIGHT = 90;
var HEX_WIDTH = 110;
var HEX_START = 20;
var START_OFFSET = 55;

function createGrid(n) {
  console.log('generating');
  $('gameGrid').innerHTML = "";

  var boardHeight = HEX_HEIGHT * ((n*2)+1);
  var boardWidth = HEX_WIDTH * ((n*2)+1);

  $('gameGrid').parentElement.style.height = boardHeight + "px";
  $('gameGrid').parentElement.style.width = boardWidth + "px";

  console.group("Grid Generation");
  var rowCount = (n * 2) + 1;
  var largestCellCount = rowCount;
  var midRow = n;
  for (var r = 0; r < rowCount; ++r) {
    console.group("Row: " + r);
    var diff = (midRow < r) ? r - midRow : midRow - r;
    var cellCount = rowCount - diff;

    var top = r * HEX_HEIGHT;
    var left = diff * START_OFFSET;
    console.log("Row Top: " + top);
    console.log("Row Left Start: " + left);
    for (var c = 0; c < cellCount; c++) {
      console.group("Cell: " + c);

      console.log("Placing Cell - Top: " + top + " Left: " + left);

      var newDiv = document.createElement('div');
      newDiv.className = 'hexagon';
      newDiv.style.top = top + "px";
      newDiv.style.left = left + "px";
      $('gameGrid').appendChild(newDiv);

      left += HEX_WIDTH;

      console.groupEnd();
    }
    console.groupEnd();
  }
  /*
  for (var i = 0; i <= n; ++i) {
    console.group("Iteration - " + i);

    var j = 0;
    var count = i*6;
    do {
      console.log('generating: ' + i + ' - ' + j);

      var top = (n-i) * HEX_HEIGHT;
      var left = (n-i) * HEX_WIDTH;
      console.log('top: ' + top);
      console.log('left: ' + left);

      var newDiv = document.createElement('div');
      newDiv.className = 'hexagon';
      newDiv.style.top = top + "px";
      newDiv.style.left = left + "px";
      $('gameGrid').appendChild(newDiv);

      //newDiv.addClass('hexagon');

      //$('#gameGrid').add(newDiv);
      //console.log('here');
      j++;
    } while (j < count);
    console.groupEnd();
  }
  */
  console.log('All done');
  console.groupEnd();
}

$().ready(function() {
  $('buildBtn').addClick(function() {
    createGrid(3);
  });
});

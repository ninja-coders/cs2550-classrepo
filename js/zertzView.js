'use strict';

var GameView = (function() {
  function GameView() {
    this.$$board = $('gameBoard');
  }

  GameView.prototype.render = function(board) {
    var boardHtml = "<table>";
    for (var i = 0; i < board.length; ++i) {
      boardHtml += "<tr>";
      var col = board[i];
      for (var j = 0; j < col.length; ++j) {
        var className = col[j] === 'B' ? 'blackTile' : 'whiteTile';
        boardHtml += "<td class='" + className + "'></td>";
      }
      boardHtml += "</tr>";
    }
    boardHtml += "</table>";
    this.$$board.innerHTML = boardHtml;
  };

  return GameView;
})();

$().ready(function() {
  var controller = new GameController();

  controller.init();

  $('increase').onclick = function() {
    controller.increaseSize();
  };
});

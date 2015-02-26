'use strict';

var GameView = (function() {
  function GameView() {
    this.$$board = $('gameBoard');
    this.$$cellSelectedEventHandlers = [];
    this.$$boardCells = [];
  }

  GameView.prototype.addEventListener = function(event, func) {
    if (event === 'cellselected') {
      this.$$cellSelectedEventHandlers.push(func);
    }
  };

  GameView.prototype.highlightCell = function(x,y) {
    this.$$boardCells[y][x].className = 'selectedTile';
    //console.log(this.$$boardCells[y][x]);
  };

  GameView.prototype.$$triggerCellSelectedEvent = function(x,y) {
    for (var i = 0; i < this.$$cellSelectedEventHandlers.length; ++i) {
      var func = this.$$cellSelectedEventHandlers[i];
      try {
        func(x, y);
      } catch (e) {
        console.error(e);
      }
    }
  };

  GameView.prototype.$$createClickEvent = function(x,y) {
    var self = this;
    return function() { self.$$triggerCellSelectedEvent(x,y); };
  };

  GameView.prototype.render = function(board) {
    this.$$boardCells = [];
    var boardTable = document.createElement('table');
    var count = board.length;
    var style = window.getComputedStyle(this.$$board);
    var size = parseInt(style.width) / count;

    for (var i = 0; i < board.length; ++i) {
      var boardRow = document.createElement('tr');
      var rowCells = [];
      var col = board[i];
      for (var j = 0; j < col.length; ++j) {
        var className = col[j] === 'B' ? 'blackTile' : 'whiteTile';
        var boardCell = document.createElement('td');
        boardCell.className = className;
        boardCell.style.height = size + "px";
        boardCell.style.width = size + "px";
        boardCell.addEventListener('click', this.$$createClickEvent(j,i));

        rowCells.push(boardCell);
        boardRow.appendChild(boardCell);
      }
      boardTable.appendChild(boardRow);
      this.$$boardCells.push(rowCells);
    }
    this.$$board.appendChild(boardTable);
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

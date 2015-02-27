'use strict';

var GameView = (function() {
  function GameView() {
    this.$$board = $('gameBoard');
    this.$$cellSelectedEventHandlers = [];
    this.$$pieceMovedEventHandlers = [];
    this.$$boardCells = [];
  }
  function createOriginalLoc(x,y) {
    return {x: x, y: y};
  }

  GameView.prototype.addEventListener = function(event, func) {
    if (event === 'cellselected') {
      this.$$cellSelectedEventHandlers.push(func);
    } else if (event === 'piecemoved') {
      this.$$pieceMovedEventHandlers.push(func);
    }
  };

  GameView.prototype.highlightCell = function(x,y) {
    this.$$boardCells[y][x].className = 'selectedTile';
    //console.log(this.$$boardCells[y][x]);
  };

  GameView.prototype.$$triggerEvent = function(event,data) {
    if (event === 'cellselect') {
      for (var i = 0; i < this.$$cellSelectedEventHandlers.length; ++i) {
        var func = this.$$cellSelectedEventHandlers[i];
        try {
          func(data.x, data.y);
        } catch (e) {
          console.error(e);
        }
      }
    } else if (event === 'piecemoved') {
      for (var i = 0; i < this.$$pieceMovedEventHandlers.length; ++i) {
        var func = this.$$pieceMovedEventHandlers[i];
        try {
          func(data.startx, data.starty, data.x, data.y);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  GameView.prototype.$$createClickEvent = function(x,y) {
    var self = this;
    return function() { self.$$triggerEvent('cellselect', {x: x, y: y}); };
  };

  GameView.prototype.$$createDragEnterEvent = function(x,y) {
    var self = this;
    return function(ev) {
      self.$$dragPosition = {x: x, y: y};
    };
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

        var className = col[j].indexOf('B') >= 0 ? 'blackTile' : 'whiteTile';
        var boardCell = document.createElement('td');
        boardCell.className = className;
        boardCell.style.height = size + "px";
        boardCell.style.width = size + "px";
        boardCell.addEventListener('click', this.$$createClickEvent(j,i));
        boardCell.addEventListener('dragenter', this.$$createDragEnterEvent(j,i));

        rowCells.push(boardCell);
        boardRow.appendChild(boardCell);

        if (col[j].indexOf('M') > 0) {
          // Have a marble attach here
          this.$$pieceImg = document.createElement('img');
          this.$$pieceImg.src = 'img/gray-marble.png';
          this.$$pieceImg.draggable = true;
          this.$$pieceImg.style.width = this.$$pieceImg.style.height = "40px";
          var self = this;
                    self.$$originalLoc = createOriginalLoc(j, i);

          this.$$pieceImg.addEventListener('dragstart', function(ev) {
            //self.$$originalDrag = self.$$pieceImg.parentElement;
            //self.$$originalDrag.removeChild(self.$$pieceImg);
            //self.$$pieceImg.style.visiblity = 'hidden';
          });
          this.$$pieceImg.addEventListener('drag', function(ev) {
            //console.log('drag');
          });
          this.$$pieceImg.addEventListener('dragend', function(ev) {
            console.log(self.$$originalLoc);
            self.$$triggerEvent('piecemoved', {
              startx: self.$$originalLoc.x,
              starty: self.$$originalLoc.y,
              x: self.$$dragPosition.x,
              y: self.$$dragPosition.y
            });
            //if (self.$$dragElement) {
            //  self.$$pieceImg.parentElement.removeChild(self.$$pieceImg);
            //  self.$$dragElement.appendChild(self.$$pieceImg);
            //}
            //console.log(ev);
          });
          boardCell.appendChild(this.$$pieceImg);
          //this.$$boardCells[0][0].appendChild(this.$$pieceImg);
        }
      }
      boardTable.appendChild(boardRow);
      this.$$boardCells.push(rowCells);
    }
    this.$$board.innerHTML = '';
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

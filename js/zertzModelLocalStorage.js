'use strict';

var GameModel = (function() {
  var MODEL_SPACE = 'gameModel';

  function GameModel() {
    this.$$init();
  };

  GameModel.prototype.$$init = function() {
    this.$$store = new StorageService(MODEL_SPACE);
    this.$$store.init();
    this.$$boardSize = this.$$store.getItem('boardSize') || 8;
    this.$$piece = this.$$store.getItem('pieces') || {x: 2, y: 2};
  };

  GameModel.prototype.$$generateInitialBoard = function() {
    this.$$board = new Array();
    for (var i = 0; i < this.$$boardSize; ++i) {
      this.$$board[i] = new Array();
      for (var j = 0; j < this.$$boardSize; ++j) {
        this.$$board[i][j] = (i + j) % 2 === 0 ? 'W' : 'B';
        if (j == this.$$piece.x && i === this.$$piece.y) {
          this.$$board[i][j] += 'M';
        }
      }
    }
  };

  GameModel.prototype.movePiece = function(sx, sy, x, y) {
    console.log('here');
    this.$$piece = {x: x, y: y};
    this.$$store.setItem('pieces', this.$$piece);
    this.$$generateInitialBoard();
  };

  GameModel.prototype.getBoard = function() {
    if (!this.$$board) {
      this.$$generateInitialBoard();
    }

    return this.$$board;
  };

  GameModel.prototype.increase = function() {
    this.$$boardSize++;
    this.$$generateInitialBoard();
  };

  GameModel.prototype.canSelect = function(x,y) {
    return ((x + y) % 2) !== 0;
  };

  return GameModel;
})();

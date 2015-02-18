'use strict';

var GameModel = (function() {
  function GameModel() {
    this.$$boardSize = 5;
  };

  GameModel.prototype.$$generateInitialBoard = function() {
    this.$$board = new Array();
    for (var i = 0; i < this.$$boardSize; ++i) {
      this.$$board[i] = new Array();
      for (var j = 0; j < this.$$boardSize; ++j) {
        this.$$board[i][j] = (i + j) % 2 === 0 ? 'W' : 'B';
      }
    }
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
  }

  return GameModel;
})();

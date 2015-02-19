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


/*
var GameModel = (function() {
  var STANDARD_MODE = {
    HEXAGON_RADIUS : 3,
    BLACK_MARBLES : 10,
    GREY_MARBLES : 8,
    WHITE_MARBLES : 6,
    WIN_ALL : 3,
    WIN_BLACK : 6,
    WIN_GREY : 5,
    WIN_WHITE : 4
  };

  var FAST_MODE = {
    HEXAGON_RADIUS : 3,
    BLACK_MARBLES : 10,
    GREY_MARBLES : 8,
    WHITE_MARBLES : 6,
    WIN_ALL : 3,
    WIN_BLACK : 6,
    WIN_GREY : 5,
    WIN_WHITE : 4
  };

  function GameModel(fastMode) {
    this.$$fastMode = arguments.length <= 0 ? false : !!fastMode;

    var startValues = this.fastMode ? FAST_MODE : STANDARD_MODE;
    this.$$hexagonRadius = startValues.HEXAGON_RADIUS;
    this.$$blackMarbles = startValues.BLACK_MARBLES;
    this.$$greyMarbles = startValues.GREY_MARBLES;
    this.$$whiteMarbles = startValues.WHITE_MARBLES;
    this.$$winAll = startValues.WIN_ALL;
    this.$$winBlack = startValues.WIN_BLACK;
    this.$$winGrey = startValues.WIN_GREY;
    this.$$winWhite = startValues.WIN_WHITE;
  };

  GameModel.prototype.$$generateBoard = function() {
    var rows = (this.$$hexagonRadius * 2) + 1;
    var cols = rows;
    this.$$board = new Array();

    var length = rows;
    for (var i = 0; i < (rows / 2); ++i) {
      var z = length - i - 1;
      this.$$board[i] = new Array();
      this.$$board[z] = new Array();
      for (var j = 0; j < (this.$$hexagonRadius + 1 + i); ++j) {
        this.$$board[i][j] = 'H';
        this.$$board[z][j] = 'H';
      }
    }
  };

  GameModel.prototype.$getBoard = function() {
    if (!this.$$board) {
      this.$$generateBoard();
    }

    return this.$$board;
  };

  GameModel.prototype.$removeTile = function(x, y) {

  };

  GameModel.prototype.$placeMarble = function(color, x, y) {

  };

  return GameModel;
})();
*/

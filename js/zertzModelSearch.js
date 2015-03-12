'use strict';

var GameModel = (function() {
  var MODEL_SPACE = 'gameModel';

  function GameModel() {
    this.$$init();
    this.$$useHash = true;
  };

  GameModel.prototype.$$init = function() {
    // format: '?boardSize=8'
    var search;
    if (this.$$useHash) {
      search = location.hash;
    } else {
      search = location.search;
    }
    search = search.substring(1);
    var pairs = search.split('&');
    var params = {
      boardSize: 8,
      x: 2,
      y: 2
    };
    pairs.forEach(function(p) {
      var keyValue = p.split('=');
      params[keyValue[0]] = parseInt(keyValue[1]);
    });

    this.$$boardSize = params.boardSize;
    this.$$piece = { x: params.x, y: params.y };
  };

  GameModel.prototype.$$generateInitialBoard = function() {
    this.$$board = new Array();
    for (var i = 0; i < this.$$boardSize; ++i) {
      this.$$board[i] = new Array();
      for (var j = 0; j < this.$$boardSize; ++j) {
        this.$$board[i][j] = (i + j) % 2 === 0 ? 'W' : 'B';
        if (j === this.$$piece.x && i === this.$$piece.y) {
          this.$$board[i][j] += 'M';
        }
      }
    }
  };

  GameModel.prototype.movePiece = function(sx, sy, x, y) {
    console.log('here');
    this.$$piece = {x: x, y: y};
    var update = "boardSize=" + this.$$boardSize + "&y=" + this.$$piece.y + "&x=" + this.$$piece.x;
    if (this.$$useHash) {
      location.hash = "#" + update;
    } else {
      location.search = "?" + update;
    }
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

'use strict';

var GameController = (function() {
  function GameController(view, model) {
    this.$$view = view || new GameView();
    this.$$model = model || new GameModel();
  }

  GameController.prototype.init = function() {
    this.$$updateView();
  };

  GameController.prototype.$$updateView = function() {
    var board = this.$$model.getBoard();
    this.$$view.render(board);
  }

  GameController.prototype.increaseSize = function() {
    this.$$model.increase();
    this.$$updateView();
  };

  return GameController;
})();

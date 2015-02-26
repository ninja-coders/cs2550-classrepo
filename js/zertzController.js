'use strict';

var GameController = (function() {
  function GameController(view, model) {
    this.$$view = view || new GameView();
    this.$$model = model || new GameModel();
  }

  GameController.prototype.init = function() {
    this.$$updateView();

    var self = this;
    this.$$view.addEventListener('cellselected', function(x,y) { self.$$cellSelected(x,y); });
  };

  GameController.prototype.$$cellSelected = function(x,y) {
    if (this.$$model.canSelect(x,y)) {
      console.log('Can select');
      this.$$view.highlightCell(x, y);
    } else {
      console.log('Bu keye');
    }
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

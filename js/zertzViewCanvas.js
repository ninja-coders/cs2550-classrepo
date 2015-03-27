'use strict';

var GameView = (function() {
  function GameView() {
    this.$$boardCanvas = $('gameCanvas');
    this.$$board = this.$$boardCanvas.getContext('2d');
    this.$$sound = $('sound');

    this.$$cellSelectedEventHandlers = [];
    this.$$pieceMovedEventHandlers = [];
    this.$$boardCells = [];
    this.$$yodaDiv = $('yodaResponse');
    this.$$apiService = new ApiService();
    this.$$message = [
      'Hello, how are you?',
      'I am doing so well, are you?',
      'What is going on?',
      'Why would you do this?',
      'Does anyone really like the new star wars?',
      'This is fun right?',
      'Do you like red?',
      'Is this it?'
    ];

    var self = this;
    this.$$boardCanvas.addEventListener('mousemove', function(e) {
      self.$$mouseMove(self.$$convertLocation(e));
    });
    this.$$boardCanvas.addEventListener('mouseup', function(e) {
      self.$$mouseUp(self.$$convertLocation(e));
    });
    this.$$boardCanvas.addEventListener('mousedown', function(e) {
      self.$$mouseDown(self.$$convertLocation(e));
    });
    this.$$boardCanvas.addEventListener('mouseout', function(e) {
      self.$$mouseOut(self.$$convertLocation(e));
    });
  }
  function createOriginalLoc(x,y) {
    return {x: x, y: y};
  }

  GameView.prototype.$$convertLocation = function(e) {
    var rect = this.$$boardCanvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  GameView.prototype.$$mouseMove = function(e) {
    //console.log('move', e);
    if (this.$$hitPiece) {
      this.$$hitPiece.piece.x = e.x - this.$$hitPiece.offset.x;
      this.$$hitPiece.piece.y = e.y - this.$$hitPiece.offset.y;
    }
    this.$$update();
  };

  GameView.prototype.$$mouseOut = function(e) {
    console.log('out', e);
  };

  GameView.prototype.$$mouseDown = function(e) {
    console.log('down', e);
    var self = this;
    this.$$pieces.forEach(function(p) {
      if (e.x >= p.x && e.x <= (p.x + p.size) && e.y >= p.y && e.y <= (p.y + p.size)) {
        console.log('hit');
        self.$$sound.play();
        self.$$hitPiece = {
          piece: p,
          offset: {
            x: e.x - p.x,
            y: e.y - p.y
          }
        };
      }

    });
  };

  GameView.prototype.$$mouseUp = function(e) {
    console.log('up', e);
    this.$$sound.pause();

    var eventDetails = {
      startX: this.$$hitPiece.piece.startX,
      startY: this.$$hitPiece.piece.startY
    };
    var size = this.$$lastBoard.size;
    var count = this.$$lastBoard.count;

    eventDetails.x = parseInt(e.x / size) % count;
    eventDetails.y = parseInt(e.y / size) % count;

    this.$$triggerEvent('piecemoved', eventDetails);
    this.$$hitPiece = null;
  };


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

  GameView.prototype.$$drawBoard = function() {
    var context = this.$$board;
    var board = this.$$lastBoard.board;
    var size = this.$$lastBoard.size;
    var count = this.$$lastBoard.count;

    for(var i = 0; i < count; ++i) {
      for (var j = 0; j < count; ++j) {
        var fill = board[i][j].indexOf('B') >= 0 ? 'black' : 'white';
        context.beginPath();
        var x = j*size;
        var y = i*size;
        context.rect(x, y, size, size);

        var gradient = context.createLinearGradient(x, y, x+size, y+size);
        gradient.addColorStop(0, 'gray');
        gradient.addColorStop(1, fill);
        context.fillStyle = gradient; //fill;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();


      }
    }
  };


  GameView.prototype.$$readPieces = function() {
    var board = this.$$lastBoard.board;
    var size = this.$$lastBoard.size;
    var count = this.$$lastBoard.count;
    var context = this.$$board;

    this.$$pieces = [];
    var self = this;
    for (var i = 0; i < count; ++i) {
      for (var j = 0; j < count; ++j) {
        if (board[i][j].indexOf('M') > 0) {
          var image = new Image();
          var x = j*size;
          var y = i*size;

          image.onload = (function(image, x, y, size, i, j) {
            return function() {
              var piece = {
                image: image,
                size: size,
                x: x,
                y: y,
                startX: j,
                startY: i
              };
              self.$$pieces.push(piece);
              self.$$update();
              //context.drawImage(image, x, y, size, size);
            };
          })(image, x, y, size, i, j);
          image.src = 'img/gray-marble.png';
        }
      }
    }

  };

  GameView.prototype.$$drawPieces = function() {
    var context = this.$$board;

    var self = this;
    this.$$pieces.forEach(function(p) {
      context.drawImage(p.image, p.x, p.y, p.size, p.size);
    });
  };

  GameView.prototype.$$update = function() {
    this.$$drawBoard();
    this.$$drawPieces();
  };

  GameView.prototype.render = function(board) {
    var count = board.length;
    var size = this.$$boardCanvas.width / count;

    this.$$lastBoard = {
      board: board,
      size: size,
      count: count
    };
    this.$$readPieces();
    this.$$update();
  };

  return GameView;
})();

$().ready(function() {
  $('gameBoard').style.display = 'none';
  var controller = new GameController();

  controller.init();

  $('increase').onclick = function() {
    controller.increaseSize();
  };
});

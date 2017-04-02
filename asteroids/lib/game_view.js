const Game = require('./game.js');

function GameView() {
  this.setupContext();
  this.bindKeyHandlers();
}

GameView.prototype.setupContext = function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;
  this.ctx = canvasEl.getContext("2d");
  this.game = new Game();
};

GameView.prototype.animate = function() {
  window.setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
    //this.game.checkCollisions();
  }, 1000/60);
};

GameView.prototype.bindKeyHandlers = function () {
  key('a', () => this.game.power('a'));
  key('s', () => this.game.power('s'));
  key('d', () => this.game.power('d'));
  key('w', () => this.game.power('w'));
};

const g = new GameView();
//g.bindKeyHandlers();
g.animate();

const Game = require('./game.js');

function GameView() {
  this.setupContext();
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
    this.game.checkCollisions();
  }, 1000/60);
};

const g = new GameView();
g.animate();

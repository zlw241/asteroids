const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');


Util.inherits(Asteroid, MovingObject);

function Game () {
  this.DIM_X = window.innerWidth;
  this.DIM_Y = window.innerHeight;
  this.NUM_ASTEROIDS = 25;

  this.addAsteroids();
}

Game.prototype.randomPosition = function () {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.addAsteroids = function () {
  this.asteroids = [];
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let pos = this.randomPosition();
    let asteroid = new Asteroid({pos: pos});
    this.asteroids.push(asteroid);
  }
  return this.asteroids;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach((asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((asteroid) => {
    asteroid.move();
  });
};

Game.prototype.checkCollisions = function() {

  for (let i = 0; i < this.asteroids.length; i++) {
    let asteroid1 = this.asteroids[i];
    for (let j = 0; j < this.asteroids.length; j++) {
      let asteroid2 = this.asteroids[j];
      if (asteroid1 !== asteroid2 && asteroid1.isCollidedWith(asteroid2)) {
        let max = Math.max(i, j);
        let min = Math.min(i, j);
        this.asteroids.splice(max, 1);
        this.asteroids.splice(min, 1);
      }
    }
  }
};

// Game.prototype.remove = function(asteroid) {
//
// };

module.exports = Game;

const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');


Util.inherits(Asteroid, MovingObject);
Util.inherits(Ship, MovingObject);
Util.inherits(Bullet, MovingObject);

function Game () {
  this.DIM_X = window.innerWidth;
  this.DIM_Y = window.innerHeight;
  this.NUM_ASTEROIDS = 20;
  this.asteroids = [];
  this.bullets = [];
  this.addAsteroids();
  this.addShip();
}

Game.prototype.randomPosition = function () {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.addShip = function () {
  let pos = [this.DIM_X / 2, this.DIM_Y / 2];
  this.ship = new Ship({pos: pos});
};

Game.prototype.addAsteroids = function () {
  // this.asteroids = [];
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
  this.bullets.forEach((bullet) => {
    bullet.draw(ctx);
  });
  this.ship.draw(ctx);
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((asteroid) => {
    asteroid.move();
  });
  this.bullets.forEach((bullet) => {
    bullet.move();
  });
  this.ship.move();
};

Game.prototype.checkCollisions = function() {
  let ship = this.ship;
  for (let i = 0; i < this.asteroids.length; i++) {
    let asteroid1 = this.asteroids[i];
    if (ship.isCollidedWith(asteroid1)) {
      this.asteroids.splice(i, 1);
    }
  }
  //   for (let j = 0; j < this.asteroids.length; j++) {
  //     let asteroid2 = this.asteroids[j];
  //     if (asteroid1 !== asteroid2 && asteroid1.isCollidedWith(asteroid2)) {
  //       let max = Math.max(i, j);
  //       let min = Math.min(i, j);
  //       this.asteroids.splice(max, 1);
  //       this.asteroids.splice(min, 1);
  //     }
  //   }
  // }
};

Game.prototype.fireBullet = function() {
  console.log(this);

  let bullet = ship.fireBullet();
  this.bullets.push(bullet);
};

Game.prototype.power = function(impulse) {
  if (impulse === 'a') {
    if (this.ship.vel[0] > -200) {
      this.ship.vel[0] -= 2;
    }
  }

  if (impulse === 'd') {
    if (this.ship.vel[0] < 200) {
      this.ship.vel[0] += 2;
    }
  }

  if (impulse === 'w') {
    if (this.ship.vel[1] > -200) {
      this.ship.vel[1] -= 2;
    }
  }

  if (impulse === 's') {
    if (this.ship.vel[1] < 200) {
      this.ship.vel[1] += 2;
    }
  }
};


// Game.prototype.remove = function(asteroid) {
//
// };

module.exports = Game;

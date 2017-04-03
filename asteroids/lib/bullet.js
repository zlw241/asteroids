const MovingObject = require('./moving_object.js');

function Bullet (options) {
  this.vel = options.vel;
  this.pos = options.pos;
  options.radius = 2;
  options.color = 'green';
  MovingObject.call(this, options);
}

module.exports = Bullet;

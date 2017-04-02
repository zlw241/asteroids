const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid(options) {
  this.COLOR = 'black';
  this.RADIUS = 20;
  options.color = this.COLOR;
  options.radius = this.RADIUS;
  options.vel = Util.randomVec(10);
  MovingObject.call(this, options);
}

module.exports = Asteroid;

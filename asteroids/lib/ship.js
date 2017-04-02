const MovingObject = require('./moving_object.js');

function Ship (options) {
  this.COLOR = 'red';
  this.RADIUS = 20;
  options.color = this.COLOR;
  options.radius = this.RADIUS;
  options.vel = [0, 0];
  MovingObject.call(this, options);
}

Ship.prototype.draw = function () {
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  this.centerX = this.pos[0];
  this.centerY = this.pos[1];
  ctx.arc(
    this.centerX,
    this.centerY,
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

// Ship.prototype.power = function (impulse) {
//   this.vel[0] += impulse[0];
//   this.vel[1] += impulse[1];
// };

module.exports = Ship;

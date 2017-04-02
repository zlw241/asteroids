function MovingObject(options) {
  this.pos = options.pos;
  this.centerX = this.pos[0];
  this.centerY = this.pos[1];
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
}

MovingObject.prototype.draw = function(ctx) {
  color = 'rgb(0, ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')';
  ctx.fillStyle = color;
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

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.pos[0] < -this.radius) {
    this.pos[0] = window.innerWidth;
  }
  if (this.pos[0] > window.innerWidth + this.radius) {
    this.pos[0] = 1;
  }
  if (this.pos[1] < -this.radius) {
    this.pos[1] = window.innerHeight;
  }
  if (this.pos[1] > window.innerHeight + this.radius) {
    this.pos[1] = 1;
  }
};

MovingObject.prototype.distanceBetween = function(otherObject) {
  let x1 = this.centerX;
  let y1 = this.centerY;
  let x2 = otherObject.centerX;
  let y2 = otherObject.centerY;
  return Math.pow(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2), 0.5);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  if (this.distanceBetween(otherObject) <= (this.radius + otherObject.radius)) {
    return true;
  }
  return false;
};

const colors = [];
for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        colors.push('rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' + Math.floor(255 - 42.5 * j) + ')');
      }
}



// MovingObject.prototype = function collideWith(otherObject) {
//
// }

module.exports = MovingObject;
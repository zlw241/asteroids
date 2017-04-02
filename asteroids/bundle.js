/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);
const MovingObject = __webpack_require__(0);
const Asteroid = __webpack_require__(3);


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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(1);

function Asteroid(options) {
  this.COLOR = 'black';
  this.RADIUS = 20;
  options.color = this.COLOR;
  options.radius = this.RADIUS;
  options.vel = Util.randomVec(5);
  MovingObject.call(this, options);
}

module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

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


/***/ })
/******/ ]);
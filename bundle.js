/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wave_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wave.js */ \"./js/wave.js\");\n/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector.js */ \"./js/vector.js\");\n\r\n\r\n\r\n\r\nlet thep5 = new p5(function (p) {\r\n\r\n  let wave = new _wave_js__WEBPACK_IMPORTED_MODULE_0__[\"Wave\"](250, p, p.windowWidth*0.1);\r\n  let fr = 40;\r\n  let dt = 1.0/fr;\r\n\r\n  // Guify\r\n  let gui = new guify({\r\n    title: 'Wave Simulation #27',\r\n    align: 'right',\r\n    theme: 'dark'\r\n  });\r\n\r\n  gui.Register([\r\n    {\r\n      type: 'range',\r\n      label: 'k',\r\n      min: 120, max: 500, step: 10,\r\n      object: wave,\r\n      property: 'k'\r\n    },\r\n    {\r\n      type: 'button',\r\n      label: 'Reset',\r\n      action: () => {\r\n        for (let i = wave.particles.length-1; i--; ) {\r\n          wave.particles[i].pos.y = p.windowHeight/2;\r\n          wave.particles[i].v = _vector_js__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"].zero;\r\n        }\r\n      }\r\n    }\r\n  ])\r\n\r\n  p.setup = () => {\r\n    p.createCanvas(p.windowWidth, p.windowHeight);\r\n    p.frameRate(fr);\r\n    p.background(232, 238, 242);\r\n    p.fill(132, 191, 237);\r\n    p.stroke(97, 154, 198);\r\n    p.strokeWeight(4);\r\n  };\r\n  \r\n  p.draw = () => {\r\n    p.clear();\r\n    p.background(232, 238, 242);\r\n    wave.particles[0].pos.y = p.mouseY;\r\n    wave.update(p, dt);\r\n    wave.draw(p);\r\n  };\r\n});\r\n\r\nconsole.log(\"Main.ts loaded\");\r\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/vector.js":
/*!**********************!*\
  !*** ./js/vector.js ***!
  \**********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vector\", function() { return Vector; });\nclass Vector {\r\n\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n  }\r\n\r\n  static is(x, y) {\r\n    return new Vector(x, y);\r\n  } \r\n\r\n  toString() {\r\n    return `${this.x}i ${this.y>0?'+':'-'} ${Math.abs(this.y)}j`;\r\n  }\r\n\r\n  get neg() {\r\n    return Vector.scale(this, -1);\r\n  }\r\n\r\n  abs() {\r\n    return Math.sqrt(this.x*this.x + this.y*this.y);\r\n  }\r\n\r\n  // Functions that have side effects (change this)\r\n  plus(b) {\r\n    this.x += b.x;\r\n    this.y += b.y;\r\n    return this;\r\n  }\r\n  dot(b) {\r\n    this.x *= b.x;\r\n    this.y *= b.y;\r\n    return this;\r\n  }\r\n  times(s) {\r\n    this.x *= s;\r\n    this.y *= s;\r\n    return this;\r\n  }\r\n  \r\n  // Functions that don't have side effects (return new vectors)\r\n  static Sum(a, b) {\r\n    return new Vector(a.x+b.x, a.y+b.y);\r\n  }\r\n  static Dot(a, b) {\r\n    return a.x*b.x + a.y*b.y;\r\n  }\r\n  static Scale(a, s) {\r\n    return new Vector(a.x*s, a.y*s);\r\n  }\r\n\r\n\r\n};\r\n\r\nVector.zero = Vector.is(0, 0);\r\n\r\nconsole.log(\"Vector.ts loaded\");\n\n//# sourceURL=webpack:///./js/vector.js?");

/***/ }),

/***/ "./js/wave.js":
/*!********************!*\
  !*** ./js/wave.js ***!
  \********************/
/*! exports provided: Particle, Wave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Particle\", function() { return Particle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wave\", function() { return Wave; });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./js/vector.js\");\n\r\n\r\nclass Particle {\r\n\r\n  constructor(pos, m) {\r\n    this.pos = pos;\r\n    this.v = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n    this.a = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n    this.F = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n    this._m = m;\r\n    this.m_inv = 1.0/m;\r\n  }\r\n\r\n  get m() {\r\n    return this._m;\r\n  }\r\n  set m(value) {\r\n    this._m = value;\r\n    this.m_inv = 1.0/this._m;\r\n  }\r\n\r\n  /**\r\n   * Updates the forces on the system based on the positions\r\n   */\r\n  // yl and yr are particle_to_the_left.y and particle_to_the_right.y, respectively\r\n  updateDynamics(p, dt, k, yl, yr) {\r\n    // Sets yl and yr to the same y as 'this' particle, so it\r\n    // doesn't generate any force\r\n    yl = yl === false ? this.pos.y : yl;\r\n    yr = yr === false ? this.pos.y : yr;\r\n\r\n    let dyl = yl - this.pos.y;\r\n    let dyr = yr - this.pos.y;\r\n\r\n    this.F = new _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"](0, dyl*k + dyr*k);\r\n\r\n    this.a = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].Scale(this.F, this.m_inv);\r\n    this.F = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero; // Zeroes the forces\r\n  }\r\n\r\n  // After updating all the forces, updates velocity and position of the particle\r\n  updateKinematics(p, dt) {\r\n    // TODO: use Verlet Integration\r\n    // TODO: understand Verlet Integration\r\n    this.v.plus(_vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].Scale(this.a, dt));\r\n    this.pos.plus(_vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].Scale(this.v, dt));\r\n\r\n    // if (this.pos.y + Particle.r >= p.windowHeight) {\r\n    //   this.pos.y = p.windowHeight - Particle.r;\r\n    //   this.v.y *= -0.8;\r\n    // }\r\n  }\r\n\r\n  // P-chan!\r\n  draw(pchan) {\r\n    pchan.arc(this.pos.x, this.pos.y, Particle.r, Particle.r, 0, pchan.TAU);\r\n  }\r\n};\r\n\r\n// Some constants...\r\nParticle.r = 20;\r\nParticle.m = 1;\r\n\r\nclass Wave {\r\n\r\n  constructor(k, p, margin) {\r\n    this.k = k;\r\n\r\n    // Initializes all particles\r\n    this.particles = [];\r\n    let x = margin + Particle.r;\r\n    while (x + Particle.r < p.windowWidth - margin) {\r\n      this.particles.push(new Particle(_vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].is(x, p.windowHeight/2), Particle.m));\r\n      x += Particle.r;\r\n    }\r\n  }\r\n\r\n  update(p, dt) {\r\n    // Dynamics update\r\n    this.particles[this.particles.length-1].updateDynamics(\r\n      p, dt, this.k, \r\n      this.particles[this.particles.length-2].pos.y, \r\n      false\r\n    );\r\n    for (let i = this.particles.length-2; i > 0; i--) {\r\n      this.particles[i].updateDynamics(\r\n        p, dt, this.k,\r\n        this.particles[i-1].pos.y,\r\n        this.particles[i+1].pos.y\r\n      );\r\n    }\r\n    this.particles[0].updateDynamics(p, dt, this.k, false, this.particles[1].pos.y);\r\n\r\n    // Kinematics update...\r\n    // ikr only3 lines\r\n    for (let i = this.particles.length-1; i--; ) {\r\n      this.particles[i].updateKinematics(p, dt);\r\n    }\r\n  }\r\n\r\n  draw(p) {\r\n    for (let i = this.particles.length-1; i--; ) {\r\n      if (i > 0) {// if not on the last particle\r\n        // WHERE DO WE DRAW THE LINE?\r\n        // here. here we draw the line\r\n        p.line(this.particles[i-1].pos.x, this.particles[i-1].pos.y,\r\n               this.particles[i].pos.x, this.particles[i].pos.y);\r\n      }\r\n      this.particles[i].draw(p);\r\n    }\r\n  }\r\n}\r\n\r\n\r\nconsole.log(\"Wave.ts loaded\");\r\n\n\n//# sourceURL=webpack:///./js/wave.js?");

/***/ })

/******/ });
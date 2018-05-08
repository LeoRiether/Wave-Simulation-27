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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wave_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wave.js */ \"./js/wave.js\");\n/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector.js */ \"./js/vector.js\");\n\r\n\r\n\r\n\r\nlet thep5 = new p5(function (p) {\r\n\r\n  let wave = new _wave_js__WEBPACK_IMPORTED_MODULE_0__[\"Wave\"](1500, p, p.windowWidth*0.1);\r\n  let fr = 40;\r\n  let dt = 1.0/fr;\r\n\r\n  let opt = {\r\n    staticLastParticle: false,\r\n    mouseIndex: 0\r\n  };\r\n\r\n  // Guify\r\n  let gui = new guify({\r\n    title: 'Wave Simulation #27',\r\n    align: 'right',\r\n    theme: 'dark'\r\n  });\r\n\r\n  gui.Register([\r\n    {\r\n      type: 'color',\r\n      label: 'Color',\r\n      format: 'hex',\r\n      onChange: (c) => {\r\n        p.fill(p.color(c));\r\n        p.stroke(p.color(c));\r\n      }\r\n    },\r\n    {\r\n      type: 'button',\r\n      label: 'Reset',\r\n      action: () => {\r\n        for (let i = wave.particles.length-1; i >= 0; i--) {\r\n          wave.at(i).pos.y = p.windowHeight/2.0;\r\n          wave.at(i).vl = 0;\r\n          wave.at(i).vr = 0;\r\n          wave.at(i).a  = 0;\r\n        }\r\n      }\r\n    },\r\n    {\r\n      type: 'checkbox',\r\n      label: 'Fixed last particle',\r\n      object: opt,\r\n      property: 'staticLastParticle'\r\n    },\r\n    {\r\n      type: 'range',\r\n      label: 'Moved particle index',\r\n      min: 0, max: wave.len-1, step: 1,\r\n      object: opt,\r\n      property: 'mouseIndex'\r\n    }\r\n  ])\r\n\r\n  p.setup = () => {\r\n    p.createCanvas(p.windowWidth, p.windowHeight);\r\n    p.frameRate(fr);\r\n    p.background(232, 238, 242);\r\n    p.fill(132, 191, 237);\r\n    p.stroke(97, 154, 198);\r\n    p.strokeWeight(4);\r\n  };\r\n  \r\n  p.draw = () => {\r\n    p.clear();\r\n    p.background(232, 238, 242);\r\n    \r\n    // Moves particle with mouse\r\n    if (p.mouseIsPressed && !p.keyIsDown(p.SHIFT)) {\r\n      if(opt.mouseIndex !== wave.len) wave.at(opt.mouseIndex).vr = (p.mouseY - wave.at(opt.mouseIndex).pos.y)/dt;\r\n      if(opt.mouseIndex !== 0) wave.at(opt.mouseIndex).vl = (p.mouseY - wave.at(opt.mouseIndex).pos.y)/dt;\r\n      wave.at(opt.mouseIndex).pos.y = p.mouseY;\r\n    }\r\n\r\n    wave.update(p, dt, opt.staticLastParticle);\r\n    if (opt.staticLastParticle) wave.at(-1).pos.y = p.windowHeight/2.0;\r\n    wave.draw(p);\r\n  };\r\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/vector.js":
/*!**********************!*\
  !*** ./js/vector.js ***!
  \**********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vector\", function() { return Vector; });\n// Could have jsut used p5.Vector, \r\n// but didn't know it existed until after this file was made\r\nclass Vector {\r\n\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n  }\r\n\r\n  static is(x, y) {\r\n    return new Vector(x, y);\r\n  } \r\n\r\n  toString() {\r\n    return `${this.x}i ${this.y>0?'+':'-'} ${Math.abs(this.y)}j`;\r\n  }\r\n\r\n  get neg() {\r\n    return Vector.scale(this, -1);\r\n  }\r\n\r\n  abs() {\r\n    return Math.sqrt(this.x*this.x + this.y*this.y);\r\n  }\r\n\r\n  // Functions that have side effects (change this)\r\n  plus(b) {\r\n    this.x += b.x;\r\n    this.y += b.y;\r\n    return this;\r\n  }\r\n  dot(b) {\r\n    this.x *= b.x;\r\n    this.y *= b.y;\r\n    return this;\r\n  }\r\n  times(s) {\r\n    this.x *= s;\r\n    this.y *= s;\r\n    return this;\r\n  }\r\n  \r\n  // Functions that don't have side effects (return new vectors)\r\n  static Sum(a, b) {\r\n    return new Vector(a.x+b.x, a.y+b.y);\r\n  }\r\n  static Dot(a, b) {\r\n    return a.x*b.x + a.y*b.y;\r\n  }\r\n  static Scale(a, s) {\r\n    return new Vector(a.x*s, a.y*s);\r\n  }\r\n\r\n\r\n};\r\n\r\nVector.zero = Vector.is(0, 0);\n\n//# sourceURL=webpack:///./js/vector.js?");

/***/ }),

/***/ "./js/wave.js":
/*!********************!*\
  !*** ./js/wave.js ***!
  \********************/
/*! exports provided: Particle, Wave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Particle\", function() { return Particle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wave\", function() { return Wave; });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./js/vector.js\");\n\r\n\r\nclass Particle {\r\n\r\n  constructor(pos, m) {\r\n    this.pos = pos;\r\n    this.vr = 0;\r\n    this.vl = 0;\r\n    this.nvr = 0;\r\n    this.nvl = 0;\r\n    this.a = 0;\r\n    this.F = 0;\r\n    this._m = m;\r\n    this.m_inv = 1.0/m;\r\n  }\r\n\r\n  get m() {\r\n    return this._m;\r\n  }\r\n  set m(value) {\r\n    this._m = value;\r\n    this.m_inv = 1.0/this._m;\r\n  }\r\n\r\n  /**\r\n   * Updates the forces on the system based on the positions\r\n   */\r\n  // yl and yr are particle_to_the_left.y and particle_to_the_right.y, respectively\r\n  updateDynamics(p, dt, k, pl, pr) {\r\n    // Sets yl and yr to the same y as 'this' particle, so it\r\n    // doesn't generate any force\r\n    \r\n    if (pl !== false) {\r\n      pl.nvl += this.vl; \r\n    } else {    // Reflexão\r\n      pr.nvr -= this.vl;\r\n    }\r\n    if (pr !== false) {\r\n      pr.nvr += this.vr;\r\n    } else {    // Reflexão\r\n      pl.nvl -= this.vr;\r\n    }\r\n  }\r\n\r\n  // After updating all the forces, updates velocity and position of the particle\r\n  updateKinematics(p, dt) {\r\n    this.vr = this.nvr;\r\n    this.vl = this.nvl;\r\n    this.nvr = 0;\r\n    this.nvl = 0;\r\n    this.pos.y += this.vr*dt + this.vl*dt;\r\n    \r\n    // Velocity Verlet\r\n    // TODO: understand Verlet Integration\r\n    // this.pos.plus(Vector.Sum(Vector.Scale(this.v, dt), Vector.Scale(this.last_a, 0.5*dt*dt)));\r\n    // this.v.plus(Vector.Scale(Vector.Sum(this.a, this.last_a), 0.5*dt));\r\n    // this.v.times(1.000001);\r\n  }\r\n\r\n  // P-chan!\r\n  // Rest in peace, P-chan!\r\n  draw(pchan) {\r\n    pchan.arc(this.pos.x, this.pos.y, Particle.r, Particle.r, 0, pchan.TAU);\r\n  }\r\n};\r\n\r\n// Some constants...\r\nParticle.r = 10;\r\nParticle.m = 1; // absolutely no purpose whatsoever\r\n\r\nclass Wave {\r\n\r\n  constructor(k, p, margin) {\r\n    this.k = k;\r\n\r\n    // Initializes all particles\r\n    this.particles = [];\r\n    let x = margin + Particle.r;\r\n    let y;\r\n    while (x + Particle.r < p.windowWidth - margin) {\r\n      this.particles.push(new Particle(_vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].is(x, p.windowHeight/2), Particle.m));\r\n      x += Particle.r;\r\n    }\r\n  }\r\n\r\n  get len() {\r\n    return this.particles.length;\r\n  }\r\n\r\n  // Gets particle at index 'i'\r\n  // negative indexes work just like in python\r\n  at(i) {\r\n    return this.particles[i < 0 ? (this.particles.length + i) : i];\r\n  }\r\n\r\n  update(p, dt, staticLastParticle) {\r\n    // Dynamics update\r\n    this.at(-1).updateDynamics(p, dt, this.k, this.at(-2), false);\r\n    for (let i = this.len-2; i > 0; i--) {\r\n      this.at(i).updateDynamics(p, dt, this.k, this.at(i-1), this.at(i+1));\r\n    }\r\n    this.at(0).updateDynamics(p, dt, this.k, false, this.at(1));\r\n\r\n    // Kinematics update...\r\n    for (let i = this.len-1; i >= 0; i--) {\r\n      this.at(i).updateKinematics(p, dt);\r\n    }\r\n  }\r\n\r\n  draw(p) {\r\n    for (let i = this.len-1; i >= 0; i--) {\r\n      if (i > 0) { // if not on the last iterated particle\r\n        // WHERE DO WE DRAW THE LINE?\r\n        // here. here we draw the line\r\n        p.line(this.at(i-1).pos.x, this.at(i-1).pos.y,\r\n               this.at(i).pos.x, this.at(i).pos.y);\r\n      }\r\n      this.at(i).draw(p);\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack:///./js/wave.js?");

/***/ })

/******/ });
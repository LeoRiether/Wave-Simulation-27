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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wave_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wave.js */ \"./js/wave.js\");\n/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector.js */ \"./js/vector.js\");\n\r\n\r\n\r\n\r\nlet thep5 = new p5(function (p) {\r\n\r\n  let wave = new _wave_js__WEBPACK_IMPORTED_MODULE_0__[\"Wave\"]();\r\n  let particle = new _wave_js__WEBPACK_IMPORTED_MODULE_0__[\"Particle\"](_vector_js__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"].is(0, p.windowHeight/2), 20, 1);\r\n  particle.v = _vector_js__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"].is(50, -300);\r\n  let fr = 40;\r\n  let dt = 1.0/fr;\r\n\r\n  // Guify\r\n  let gui = new guify({\r\n    title: 'Wave Simulation #27',\r\n    align: 'right',\r\n    theme: 'dark'\r\n  });\r\n\r\n  gui.Register([\r\n    {\r\n      type: 'range',\r\n      label: 'Mass',\r\n      min: 0.5, max: 10, step: 0.5,\r\n      object: particle,\r\n      property: 'm'\r\n    }\r\n  ])\r\n\r\n  p.setup = () => {\r\n    p.createCanvas(p.windowWidth, p.windowHeight);\r\n    p.frameRate(fr);\r\n    p.background(232, 238, 242);\r\n    p.fill(132, 191, 237);\r\n    p.stroke(97, 154, 198);\r\n  };\r\n  \r\n\r\n  p.draw = () => {\r\n    particle.F = _vector_js__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"].is(0, 200);\r\n    particle.updateDynamics(p, dt);\r\n    particle.updateKinematics(p, dt);\r\n    console.log(particle.v.toString())\r\n\r\n    p.clear();\r\n    p.background(232, 238, 242);\r\n    particle.draw(p);\r\n  };\r\n});\r\n\r\nconsole.log(\"Main.ts loaded\");\r\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/vector.js":
/*!**********************!*\
  !*** ./js/vector.js ***!
  \**********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vector\", function() { return Vector; });\nclass Vector {\r\n\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n  }\r\n\r\n  static is(x, y) {\r\n    return new Vector(x, y);\r\n  } \r\n\r\n  toString() {\r\n    return `${this.x}i ${this.y>0?'+':'-'} ${Math.abs(this.y)}j`;\r\n  }\r\n\r\n  abs() {\r\n    return Math.sqrt(this.x*this.x + this.y*this.y);\r\n  }\r\n  plus(b) {\r\n    return Vector.Sum(this, b);\r\n  }\r\n  dot(b) {\r\n    return Vector.Dot(this, b);\r\n  }\r\n  times(s) {\r\n    return Vector.Scale(this, s);\r\n  }\r\n  \r\n  static Sum(a, b) {\r\n    return new Vector(a.x+b.x, a.y+b.y);\r\n  }\r\n  static Dot(a, b) {\r\n    return a.x*b.x + a.y*b.y;\r\n  }\r\n  static Scale(a, s) {\r\n    return new Vector(a.x*s, a.y*s);\r\n  }\r\n\r\n\r\n};\r\n\r\nVector.zero = Vector.is(0, 0);\r\n\r\nconsole.log(\"Vector.ts loaded\");\n\n//# sourceURL=webpack:///./js/vector.js?");

/***/ }),

/***/ "./js/wave.js":
/*!********************!*\
  !*** ./js/wave.js ***!
  \********************/
/*! exports provided: Particle, Wave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Particle\", function() { return Particle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wave\", function() { return Wave; });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./js/vector.js\");\n\r\n\r\nclass Particle {\r\n\r\n  constructor(pos, r, m) {\r\n    this.pos = pos;\r\n    this.v = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n    this.a = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n    this.F = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n    this.r = r;\r\n    this._m = m;\r\n    this.m_inv = 1.0/this._m;\r\n    console.log(pos, r);\r\n  }\r\n\r\n  get m() {\r\n    return this._m;\r\n  }\r\n  set m(value) {\r\n    this._m = value;\r\n    this.m_inv = 1.0/this._m;\r\n  }\r\n\r\n  updateDynamics(p, dt) {\r\n    console.log(this.m, this.m_inv);\r\n    this.a = this.F.times(this.m_inv);\r\n    this.F = _vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"].zero;\r\n  }\r\n\r\n  updateKinematics(p, dt) {\r\n    this.v = this.v.plus(this.a.times(dt));\r\n    this.pos = this.pos.plus(this.v.times(dt));\r\n\r\n    if (this.pos.y >= p.windowHeight) {\r\n      this.pos.y = p.windowHeight;\r\n      this.v.y *= -0.8;\r\n    }\r\n  }\r\n\r\n  draw(pchan) {\r\n    pchan.arc(this.pos.x, this.pos.y, this.r, this.r, 0, pchan.TAU);\r\n  }\r\n\r\n\r\n};\r\n\r\nclass Wave {\r\n\r\n  constructor(plist) {\r\n    \r\n  }\r\n}\r\n\r\nconsole.log(\"Wave.ts loaded\");\r\n\n\n//# sourceURL=webpack:///./js/wave.js?");

/***/ })

/******/ });
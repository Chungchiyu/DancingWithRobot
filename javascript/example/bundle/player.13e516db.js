// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"KcYi":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
window.video = document.getElementById('video');
var canvas = document.getElementById('canvas');
window.progressContainer = document.getElementById('progress-container');
var progressFilled = document.getElementById('progress-filled');
var progressThumb = document.getElementById('progress-thumb');
var loading = document.querySelector('.loading');
var fileInput = document.getElementById('file-input');
var selectVideoButton = document.getElementById('select-video');
// const playPauseButton = document.getElementById('play-pause');
var restartButton = document.getElementById('restart');
var closeButton = document.getElementById('close-button');
var poseButton = document.getElementById('pose-button');
var leftSide = document.getElementById('left-side');
var rightSide = document.getElementById('right-side');
var handle = document.querySelector('.divider');
var poseDetectToggle = document.getElementById('poseDetect');
window.linkRobot = document.getElementById('link-robot');
var DEG2RAD = Math.PI / 180;
var poseNetLoaded = false;
var lastPoses = [];
var lastPoseAngles;
var videoAspectRatio = 16 / 9;
var lowResCanvas;
var lowResolution = 720;
document.addEventListener('DOMContentLoaded', LoadMediaPipe);
var model;
var detector;
function initPoseDetector() {
  return _initPoseDetector.apply(this, arguments);
}
function _initPoseDetector() {
  _initPoseDetector = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var detectorConfig;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          model = poseDetection.SupportedModels.BlazePose;
          detectorConfig = {
            runtime: 'mediapipe',
            modelType: 'full',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
            enableSmoothing: true,
            enableSegmentation: false,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          };
          _context.next = 4;
          return poseDetection.createDetector(model, detectorConfig);
        case 4:
          return _context.abrupt("return", _context.sent);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _initPoseDetector.apply(this, arguments);
}
function detectPose(_x, _x2) {
  return _detectPose.apply(this, arguments);
}
function _detectPose() {
  _detectPose = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(detector, video) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return detector.estimatePoses(video, {
            flipHorizontal: false
          });
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _detectPose.apply(this, arguments);
}
function LoadMediaPipe() {
  return _LoadMediaPipe.apply(this, arguments);
}
function _LoadMediaPipe() {
  _LoadMediaPipe = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return initPoseDetector();
        case 3:
          detector = _context3.sent;
          console.log('MediaPipe loaded successfully');
          poseNetLoaded = true;
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error('Error loading the MediaPipe model', _context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _LoadMediaPipe.apply(this, arguments);
}
video.addEventListener('loadedmetadata', function () {
  videoAspectRatio = video.videoWidth / video.videoHeight;
  resizeCanvas();
  createLowResCanvas();
});
video.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('mousedown', startProgressDrag);
selectVideoButton.addEventListener('click', function () {
  return fileInput.click();
});
fileInput.addEventListener('change', loadVideo);
// playPauseButton.addEventListener('click', playPause);
restartButton.addEventListener('click', restart);
closeButton.addEventListener('click', closeVideo);
poseDetectToggle.addEventListener('click', function () {
  poseDetectToggle.classList.toggle('checked');
  estimatePoses();
  if (poseDetectToggle.classList.contains('checked')) canvas.style.display = '';else canvas.style.display = 'none';
});
linkRobot.addEventListener('click', function () {
  linkRobot.classList.toggle('checked');
  estimatePoses();
});
function createLowResCanvas() {
  lowResCanvas = document.createElement('canvas');
  var aspectRatio = video.videoWidth / video.videoHeight;
  lowResCanvas.width = lowResolution;
  lowResCanvas.height = Math.round(lowResolution / aspectRatio);
}
function resizeCanvas() {
  var containerRect = leftSide.getBoundingClientRect();
  var containerWidth = containerRect.width;
  var containerHeight = containerRect.height;
  var canvasWidth, canvasHeight;
  if (containerWidth / containerHeight > videoAspectRatio) {
    canvasHeight = containerHeight;
    canvasWidth = canvasHeight * videoAspectRatio;
  } else {
    canvasWidth = containerWidth;
    canvasHeight = canvasWidth / videoAspectRatio;
  }
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = "".concat((containerHeight - canvasHeight) / 2, "px");
  if (lastPoses.length > 0) {
    drawPoses(lastPoses);
  }
}
function drawPoses(poses) {
  lastPoses = poses;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var scaleX = canvas.width / video.videoWidth;
  var scaleY = canvas.height / video.videoHeight;
  var minDimension = Math.min(canvas.width, canvas.height);
  var keyPointRadius = minDimension * 0.008;
  var lineWidth = minDimension * 0.005;
  if (poses.length > 0) {
    var pose = poses[0];
    poses.forEach(function (pose) {
      var connections = poseDetection.util.getAdjacentPairs(model);
      connections.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          j = _ref2[1];
        var kp1 = pose.keypoints[i];
        var kp2 = pose.keypoints[j];
        if (kp1.score > 0.3 && kp2.score > 0.3) {
          ctx.beginPath();
          ctx.moveTo(kp1.x * scaleX, kp1.y * scaleY);
          ctx.lineTo(kp2.x * scaleX, kp2.y * scaleY);
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      });
      pose.keypoints.forEach(function (keypoint, index) {
        var noDraw = index < 10 && index != 2 && index != 5 && index != 9 && index != 10;
        if (keypoint.score > 0.3 && !noDraw) {
          ctx.beginPath();
          ctx.arc(keypoint.x * scaleX, keypoint.y * scaleY, keyPointRadius, 0, 2 * Math.PI);
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.strokeStyle = 'yellow';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
    var angles = calculateAllAngles(pose.keypoints3D, window.groupNameSelected);
    displayAngles(ctx, angles);
    var remapAngles = angleMapping(angles);
    lastPoseAngles = remapAngles;
    if (linkRobot.classList.contains('checked')) {
      Object.keys(window.viewer.robot.joints).slice(0, 6).map(function (jointName, index) {
        window.viewer.setJointValue(jointName, Object.entries(remapAngles)[index][1] * DEG2RAD);
      });
    }
  }

  // if (poses.length > 0) {
  //   const pose = poses[0];
  //   pose.keypoints3D.forEach(keypoint => {
  //     if (keypoint.score > 0.3) {

  //       const [x, y] = project3DTo2D(keypoint.x, keypoint.y, keypoint.z);
  //       ctx.beginPath();
  //       ctx.arc(x * scaleX, y * scaleY, keyPointRadius, 0, 2 * Math.PI);
  //       ctx.fillStyle = 'blue';
  //       ctx.fill();
  //     }
  //   });
  // }
}
var angleOut = [];
function angleMapping(angles) {
  if (angles.J1 !== 'undefined' && angles.J1 !== 'nan') {
    angleOut.J1 = angles.J1 > 90 ? 90 : angles.J1;
    angleOut.J1 = angles.J1 < -90 ? -90 : angles.J1;
    angleOut.J1 = map(angleOut.J1, 90, -90, -110, 110);
  }
  if (angles.J2 !== 'undefined' && angles.J2 !== 'nan') {
    angleOut.J2 = angles.J2 > 180 ? 180 : angles.J2;
    angleOut.J2 = angles.J2 < -180 ? -180 : angles.J2;
    angleOut.J2 = map(angles.J2, 60, 0, -50, 0);
  }
  if (angles.J3 !== 'undefined' && angles.J3 !== 'nan') {
    angleOut.J3 = angles.J3 > 180 ? 180 : angles.J3;
    angleOut.J3 = angles.J3 < -180 ? -180 : angles.J3;
    angleOut.J3 = map(angles.J3, 0, 180, -80, 90);
  }
  angleOut.J4 = 0;
  if (angles.J5 !== 'undefined' && angles.J5 !== 'nan') {
    angleOut.J5 = angles.J5 > 180 ? 180 : angles.J5;
    angleOut.J5 = angles.J5 < -180 ? -180 : angles.J5;
    angleOut.J5 = map(angles.J5, 180, 90, 0, -90);
  }
  angleOut.J6 = 0;
  return angleOut;
}
function map(input, in_min, in_max, out_min, out_max) {
  return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function calculateAllAngles(keypoints3D) {
  var groupName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
  var angles = {};
  var group = window.groups.find(function (g) {
    return g.name === groupName;
  });
  if (!group || !group.data) {
    console.error('Group not found or group data is empty');
    return angles;
  }
  Object.entries(group.data).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
    var points = value.split(',').map(function (id) {
      return id.trim();
    });
    if (points.length === 3) {
      var _points$map = points.map(function (i) {
          if (["OH", "DV", "RH", "IH", "UV", "LH"].includes(i)) return i;
          return keypoints3D[parseInt(i)] || {
            x: 0,
            y: 0,
            z: 0,
            score: 0
          };
        }),
        _points$map2 = _slicedToArray(_points$map, 3),
        a = _points$map2[0],
        b = _points$map2[1],
        c = _points$map2[2];
      if (a.score > 0.2 && b.score > 0.2 || typeof c === 'string') {
        angles[key] = calculateAngle(a, b, c);
      } else {
        console.warn("Low confidence for angle ".concat(key, ", skipping calculation"));
      }
    } else {
      console.warn("Invalid number of points for angle ".concat(key, ", expected 3 but got ").concat(points.length));
    }
  });
  return angles;
}
function calculateAngle(A, B, C) {
  // Check if we're dealing with 2D or 3D calculation
  var is3D = typeof C === 'string';

  // Vector from B to A
  var BA = {
    x: A.x - B.x,
    y: A.y - B.y,
    z: is3D ? (A.z || 0) - (B.z || 0) : 0
  };
  var BC;
  if (is3D) {
    switch (C) {
      case "OH":
        BC = {
          x: 0,
          y: 0,
          z: -1
        };
        break;
      case "DV":
        BC = {
          x: 0,
          y: -1,
          z: 0
        };
        break;
      case "RH":
        BC = {
          x: 1,
          y: 0,
          z: 0
        };
        break;
      case "IH":
        BC = {
          x: 0,
          y: 0,
          z: 1
        };
        break;
      case "UV":
        BC = {
          x: 0,
          y: 1,
          z: 0
        };
        break;
      case "LH":
        BC = {
          x: -1,
          y: 0,
          z: 0
        };
        break;
      default:
        throw new Error("Unknown axis: ".concat(C));
    }

    // 3D calculation
    var angle = calculateAngleBetweenVectors(BA, BC);
    var cross = crossProduct(BA, BC);
    var dot = dotProduct(cross, {
      x: 0,
      y: 1,
      z: 0
    }); // Assuming Y is up
    return dot < 0 ? -angle : angle;
  } else {
    // Vector from B to C
    BC = {
      x: C.x - B.x,
      y: C.y - B.y,
      z: is3D ? (C.z || 0) - (B.z || 0) : 0
    };
    // 2D calculation
    return calculateAngle2D(BA, BC);
  }
}
function calculateAngle2D(v1, v2) {
  var dot = v1.x * v2.x + v1.y * v2.y;
  var det = v1.x * v2.y - v1.y * v2.x;
  var angle = Math.atan2(det, dot) * (180 / Math.PI);
  return Math.abs(angle); // Always return positive angle for 2D
}
function calculateAngleBetweenVectors(v1, v2) {
  // Calculate dot product
  var dotProduct = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

  // Calculate magnitudes
  var magnitudeV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
  var magnitudeV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);

  // Calculate angle
  var angle = Math.acos(dotProduct / (magnitudeV1 * magnitudeV2));
  return angle * (180 / Math.PI);
}
function crossProduct(v1, v2) {
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x
  };
}
function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
function displayAngles(context, angles) {
  context.font = '14px Arial';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.lineWidth = 3;
  var y = 30;
  var text = "Group: ".concat(window.groupNameSelected);
  context.strokeText(text, 10, y);
  context.fillText(text, 10, y);
  y += 20;
  for (var _i = 0, _Object$entries = Object.entries(angles); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      name = _Object$entries$_i[0],
      angle = _Object$entries$_i[1];
    var _text = "".concat(name, ": ").concat(angle.toFixed(1), "\xB0");
    context.strokeText(_text, 10, y);
    context.fillText(_text, 10, y);
    y += 20;
  }
}
function loadVideo(_x3) {
  return _loadVideo.apply(this, arguments);
}
function _loadVideo() {
  _loadVideo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event) {
    var file;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          file = event.target.files[0];
          if (!file) {
            _context4.next = 21;
            break;
          }
          video.src = URL.createObjectURL(file);
          loading.style.display = 'block';
          canvas.style.display = 'none';
          selectVideoButton.style.display = 'none';
          _context4.next = 8;
          return video.play();
        case 8:
          video.pause();
          _context4.next = 11;
          return generateThumbnails();
        case 11:
          closeButton.style.display = 'flex';
          poseButton.style.display = 'flex';
          event.target.value = '';
          canvas.style.display = 'block';
          canvas.style.pointerEvents = 'auto';
          video.style.display = 'block';
          document.querySelector('.controls').style.display = 'flex';
          resizeCanvas();
          createLowResCanvas();
          estimatePoses();
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _loadVideo.apply(this, arguments);
}
var playPauseAnimation = document.getElementById('play-pause-animation');
canvas.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseAnimation.className = 'play-pause-animation play';
    if (poseDetectToggle.classList.contains('checked')) requestAnimationFrame(estimatePoses);
  } else {
    video.pause();
    playPauseAnimation.className = 'play-pause-animation pause';
  }
  playPauseAnimation.style.display = 'block';
  setTimeout(function () {
    playPauseAnimation.style.display = 'none';
  }, 1000);
}
function restart() {
  video.currentTime = 0;
  video.play();
  requestAnimationFrame(estimatePoses);
}
var recordDataButton = document.getElementById('record-data');
window.jointsData = [];
recordDataButton.addEventListener('click', recordData);
function recordData() {
  var currentTime = video.currentTime;
  jointsData = [{
    time: currentTime,
    angles: lastPoseAngles
  }];
  addMarkerToProgressBar(currentTime);
  window.newCard();
}
function addMarkerToProgressBar(time) {
  var progress = time / video.duration * 99 + 1;
  var marker = document.createElement('div');
  marker.className = 'progress-marker';
  progressContainer.appendChild(marker);
  marker.style.left = "calc(".concat(progress, "% - ").concat(marker.clientWidth / 2, "px)");
  marker.addEventListener('click', function (event) {
    marker.addEventListener('mousedown', function (event) {
      event.stopPropagation();
    });
    event.stopPropagation();
    video.currentTime = time;
    updateProgress();
  });
}
function updateProgress() {
  var progress = video.currentTime / video.duration * 99 + 1;
  var thickness = progressThumb.clientWidth;
  progressFilled.style.width = "calc(".concat(progress, "% - ").concat(thickness / 2, "px)");
  progressThumb.style.left = "calc(".concat(progress, "% - ").concat(thickness / 2, "px)");
  if (poseDetectToggle.classList.contains('checked') || video.paused) estimatePoses();
}
function startProgressDrag(e) {
  updateProgressWithEvent(e);
  document.addEventListener('mousemove', updateProgressWithEvent);
  document.addEventListener('mouseup', stopProgressDrag);
  document.body.style.userSelect = 'none';
}
function stopProgressDrag() {
  document.removeEventListener('mousemove', updateProgressWithEvent);
  document.removeEventListener('mouseup', stopProgressDrag);
  document.body.style.userSelect = '';
  if (video.paused) {
    estimatePoses();
  }
}
function updateProgressWithEvent(e) {
  var rect = progressContainer.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var width = rect.width;
  var newTime = x / width * video.duration;
  video.currentTime = newTime;
}
function generateThumbnails() {
  return _generateThumbnails.apply(this, arguments);
}
function _generateThumbnails() {
  _generateThumbnails = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var duration, thumbnailCount, thumbnailCanvas, context, i, thumbnailTime, thumbnailDiv, thumbnails;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          duration = video.duration;
          thumbnailCount = 20;
          thumbnailCanvas = document.createElement('canvas');
          context = thumbnailCanvas.getContext('2d');
          thumbnailCanvas.width = 160;
          thumbnailCanvas.height = 90;
          i = 0;
        case 7:
          if (!(i < thumbnailCount)) {
            _context5.next = 20;
            break;
          }
          thumbnailTime = i / thumbnailCount * duration;
          _context5.next = 11;
          return setVideoCurrentTime(video, thumbnailTime);
        case 11:
          thumbnailDiv = document.createElement('div');
          thumbnailDiv.className = 'progress-thumbnail';
          thumbnailDiv.style.display = 'none';
          progressContainer.insertBefore(thumbnailDiv, progressFilled);
          context.drawImage(video, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
          thumbnailDiv.style.backgroundImage = "url(".concat(thumbnailCanvas.toDataURL(), ")");
        case 17:
          i++;
          _context5.next = 7;
          break;
        case 20:
          loading.style.display = 'none';
          thumbnails = document.querySelectorAll('.progress-thumbnail');
          thumbnails.forEach(function (thumbnail) {
            return thumbnail.style.display = 'block';
          });
          video.currentTime = 0;
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _generateThumbnails.apply(this, arguments);
}
function setVideoCurrentTime(_x4, _x5) {
  return _setVideoCurrentTime.apply(this, arguments);
}
function _setVideoCurrentTime() {
  _setVideoCurrentTime = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(video, time) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise(function (resolve) {
            video.currentTime = time;
            video.addEventListener('seeked', resolve, {
              once: true
            });
          }));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _setVideoCurrentTime.apply(this, arguments);
}
function closeVideo() {
  video.pause();
  video.src = "";
  selectVideoButton.style.display = 'flex';
  canvas.style.display = 'none';
  video.style.display = 'none';
  document.querySelector('.controls').style.display = 'none';
  closeButton.style.display = 'none';
  poseButton.style.display = 'none';
  document.querySelector('.modal').style.display = 'none';
  var thumbnails = document.querySelectorAll('.progress-thumbnail');
  thumbnails.forEach(function (thumbnail) {
    return thumbnail.remove();
  });
  progressContainer.querySelectorAll('.progress-marker').forEach(function (mark) {
    return mark.remove();
  });
}
var isDragging = false;
handle.addEventListener('mousedown', function (event) {
  isDragging = true;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.body.style.userSelect = 'none';
});
function onDrag(event) {
  if (!isDragging) return;
  var containerRect = document.querySelector('.container').getBoundingClientRect();
  var newWidth = event.clientX - containerRect.left;
  if (newWidth > 400 && newWidth < containerRect.width - 400) {
    leftSide.style.width = "".concat(newWidth, "px");
    rightSide.style.width = "".concat(containerRect.width - newWidth, "px");
    resizeCanvas();
  }
}
function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.userSelect = '';
}
window.addEventListener('resize', function () {
  resizeCanvas();
  createLowResCanvas();
});

// async function estimatePoses() {
//   console.log('estimation');
//   if (video.readyState >= 2 && poseNetLoaded) {
//     const lowResContext = lowResCanvas.getContext('2d');
//     lowResContext.drawImage(video, 0, 0, lowResCanvas.width, lowResCanvas.height);

//     const poses = await detector.estimatePoses(lowResCanvas, {
//       flipHorizontal: false
//     });
//     drawPoses(poses);
//   }
//   if (!video.paused) {
//     requestAnimationFrame(estimatePoses);
//   }
// }
function estimatePoses() {
  return _estimatePoses.apply(this, arguments);
}
function _estimatePoses() {
  _estimatePoses = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var lowResContext, poses;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!poseDetectToggle.classList.contains('checked')) {
            _context7.next = 10;
            break;
          }
          console.log('estimation');
          if (!(video.readyState >= 2 && poseNetLoaded)) {
            _context7.next = 9;
            break;
          }
          lowResContext = lowResCanvas.getContext('2d');
          lowResContext.drawImage(video, 0, 0, lowResCanvas.width, lowResCanvas.height);
          _context7.next = 7;
          return detectPose(detector, video);
        case 7:
          poses = _context7.sent;
          drawPoses(poses);
        case 9:
          if (!video.paused) {
            requestAnimationFrame(estimatePoses);
          }
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _estimatePoses.apply(this, arguments);
}
poseButton.addEventListener('click', function () {
  var poseList = document.querySelectorAll('.field');
  poseList.forEach(function (e, index) {
    e.innerHTML = "".concat(angleDefinitions[index].name, ": ").concat(angleDefinitions[index].points);
  });
  document.querySelector('.modal').style.zIndex = '1000';
  document.querySelector('.modal').classList.toggle('show');
  document.querySelector('.overlay').classList.toggle('show');
});
document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('show');
  document.querySelector('.overlay').classList.remove('show');
  setTimeout(function () {
    document.querySelector('.modal').style.zIndex = '-1';
  }, 500);
});
},{}]},{},["KcYi"], null)
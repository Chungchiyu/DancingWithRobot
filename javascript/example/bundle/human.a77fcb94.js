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
})({"EwPg":[function(require,module,exports) {
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var figure = document.getElementById('figure');
var svg = document.getElementById('svgLayer');
var nodes = [{
  id: 0,
  x: 150,
  y: 50
}, {
  id: 1,
  x: 158,
  y: 30
}, {
  id: 2,
  x: 165,
  y: 30
}, {
  id: 3,
  x: 172,
  y: 30
}, {
  id: 4,
  x: 142,
  y: 30
}, {
  id: 5,
  x: 135,
  y: 30
}, {
  id: 6,
  x: 128,
  y: 30
}, {
  id: 7,
  x: 185,
  y: 40
}, {
  id: 8,
  x: 115,
  y: 40
}, {
  id: 9,
  x: 160,
  y: 70
}, {
  id: 10,
  x: 140,
  y: 70
}, {
  id: 11,
  x: 200,
  y: 105
}, {
  id: 12,
  x: 100,
  y: 105
}, {
  id: 13,
  x: 225,
  y: 130
}, {
  id: 14,
  x: 75,
  y: 130
}, {
  id: 15,
  x: 250,
  y: 115
}, {
  id: 16,
  x: 50,
  y: 115
}, {
  id: 17,
  x: 270,
  y: 117
}, {
  id: 18,
  x: 30,
  y: 117
}, {
  id: 19,
  x: 263,
  y: 97
}, {
  id: 20,
  x: 37,
  y: 97
}, {
  id: 21,
  x: 247,
  y: 102
}, {
  id: 22,
  x: 53,
  y: 102
}, {
  id: 23,
  x: 185,
  y: 200
}, {
  id: 24,
  x: 115,
  y: 200
}, {
  id: 25,
  x: 195,
  y: 290
}, {
  id: 26,
  x: 105,
  y: 290
}, {
  id: 27,
  x: 185,
  y: 380
}, {
  id: 28,
  x: 115,
  y: 380
}, {
  id: 29,
  x: 175,
  y: 400
}, {
  id: 30,
  x: 125,
  y: 400
}, {
  id: 31,
  x: 220,
  y: 405
}, {
  id: 32,
  x: 80,
  y: 405
}];
var connections = [[0, 2], [0, 5], [7, 2], [8, 5], [9, 10], [11, 12], [13, 11], [14, 12], [15, 13], [16, 14], [16, 20], [17, 15], [18, 16], [19, 17], [15, 19], [20, 18], [21, 15], [22, 16], [23, 11], [24, 12], [24, 23], [25, 23], [26, 24], [27, 25], [28, 26], [29, 27], [30, 28], [31, 29], [32, 30], [28, 32], [27, 31]];
var selectedPoints = [];
var useExteriorAngle = false;
var selectedCoordinateLine = null;
var showCoordinateSystem = false;
var selectedButton = null;

// Initial draw of the dashed ellipse
drawDashedEllipse();

// Modify the CSS for the SVG layer to ensure it's always on top
svg.style.zIndex = '9999';

// Create nodes and connections
nodes.forEach(createNode);
connections.forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    startId = _ref2[0],
    endId = _ref2[1];
  var start = nodes.find(function (n) {
    return n.id === startId;
  });
  var end = nodes.find(function (n) {
    return n.id === endId;
  });
  createLine(start, end);
});
function createNode(node) {
  var element = document.createElement('div');
  element.className = 'node';
  element.setAttribute('id', node.id);
  element.style.left = "".concat(node.x - 5, "px");
  element.style.top = "".concat(node.y - 5, "px");
  element.textContent = node.id;
  element.addEventListener('click', function (e) {
    e.stopPropagation();
    selectNode(node, element);
  });
  figure.appendChild(element);
}
function createLine(start, end) {
  var line = document.createElement('div');
  line.className = 'line';
  var length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  var angle = Math.atan2(end.y - start.y, end.x - start.x);
  line.style.width = "".concat(length, "px");
  line.style.left = "".concat(start.x, "px");
  line.style.top = "".concat(start.y, "px");
  line.style.transform = "rotate(".concat(angle, "rad)");
  figure.appendChild(line);
}
function selectNode(node, element) {
  var index = selectedPoints.findIndex(function (p) {
    return p.id === node.id;
  });
  if (index !== -1) {
    selectedPoints.splice(index, 1);
    element.classList.remove('selected');
  } else {
    if (selectedPoints.length >= 4) {
      var removedNode = selectedPoints.shift();
      document.querySelector(".node:nth-child(".concat(removedNode.id + 1, ")")).classList.remove('selected');
    }
    selectedPoints.push(node);
    element.classList.add('selected');
  }
  showCoordinateSystem = selectedPoints.length === 2;
  updateAngle();
}
function calculateAngle(p1, p2, p3) {
  var v1 = {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  };
  var v2 = {
    x: p3.x - p2.x,
    y: p3.y - p2.y
  };
  var dotProduct = v1.x * v2.x + v1.y * v2.y;
  var v1Mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  var v2Mag = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  var cosAngle = dotProduct / (v1Mag * v2Mag);
  var clampedCosAngle = Math.max(-1, Math.min(1, cosAngle));
  return Math.acos(clampedCosAngle);
}
function createSVGElement(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}
function drawDashedEllipse() {
  var ellipse = createSVGElement('ellipse');
  ellipse.setAttribute('cx', '150');
  ellipse.setAttribute('cy', '50');
  ellipse.setAttribute('rx', '40');
  ellipse.setAttribute('ry', '45');
  ellipse.setAttribute('fill', 'none');
  ellipse.setAttribute('stroke', 'black');
  ellipse.setAttribute('stroke-width', '2');
  ellipse.setAttribute('stroke-dasharray', '5,5');
  svg.appendChild(ellipse);
}
function drawCoordinateSystem(x, y) {
  var size = 50;
  var angles = [0, -Math.PI / 4, -Math.PI / 2, Math.PI / 2, Math.PI, 3 * Math.PI / 4];
  var labels = ['RH', 'IH', 'UV', 'DV', 'LH', 'OH'];

  // Create a map of virtual points
  var virtualPoints = {};
  labels.forEach(function (label, index) {
    virtualPoints[label] = {
      x: x + size * Math.cos(angles[index]),
      y: y + size * Math.sin(angles[index]),
      id: label
    };
  });

  // Check if we need to use a virtual point
  if (selectedPoints.length === 3 && typeof selectedPoints[2].id === 'string') {
    var virtualLabel = selectedPoints[2].id;
    if (virtualPoints[virtualLabel]) {
      selectedPoints[2] = virtualPoints[virtualLabel];
    }
  }
  angles.forEach(function (angle, index) {
    var line = createSVGElement('line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x + size * Math.cos(angle));
    line.setAttribute('y2', y + size * Math.sin(angle));
    line.setAttribute('stroke', 'green');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '5,5');
    line.setAttribute('data-label', labels[index]);
    line.style.transition = 'all 0.3s ease';
    var hitBox = createSVGElement('line');
    hitBox.setAttribute('x1', x);
    hitBox.setAttribute('y1', y);
    hitBox.setAttribute('x2', x + size * Math.cos(angle));
    hitBox.setAttribute('y2', y + size * Math.sin(angle));
    hitBox.setAttribute('stroke', 'transparent');
    hitBox.setAttribute('stroke-width', '10');
    var label = createSVGElement('text');
    label.setAttribute('x', x + (size + 10) * Math.cos(angle));
    label.setAttribute('y', y + (size + 10) * Math.sin(angle));
    label.setAttribute('fill', 'green');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.textContent = labels[index];
    label.style.opacity = '1';
    hitBox.addEventListener('mouseover', function () {
      line.setAttribute('stroke', 'red');
      line.setAttribute('stroke-width', '2');
      // label.style.opacity = '1';
    });
    hitBox.addEventListener('mouseout', function () {
      if (selectedCoordinateLine !== line) {
        line.setAttribute('stroke', 'green');
        line.setAttribute('stroke-width', '2');
      }
      // label.style.opacity = '0';
    });
    hitBox.addEventListener('click', function (e) {
      e.stopPropagation();
      if (selectedCoordinateLine) {
        selectedCoordinateLine.setAttribute('stroke', 'black');
        selectedCoordinateLine.setAttribute('stroke-width', '1');
      }
      line.setAttribute('stroke', 'blue');
      line.setAttribute('stroke-width', '2');
      selectedCoordinateLine = line;
      var endX = parseFloat(line.getAttribute('x2'));
      var endY = parseFloat(line.getAttribute('y2'));
      var virtualPoint = {
        x: endX,
        y: endY,
        id: labels[index]
      };
      selectNode(virtualPoint, {
        classList: {
          add: function add() {},
          remove: function remove() {}
        }
      });
    });
    svg.appendChild(line);
    svg.appendChild(hitBox);
    svg.appendChild(label);
  });
}
function updateAngle() {
  svg.innerHTML = '';
  drawDashedEllipse();
  if (selectedPoints.length >= 2) {
    var _selectedPoints = selectedPoints,
      _selectedPoints2 = _slicedToArray(_selectedPoints, 2),
      p1 = _selectedPoints2[0],
      p2 = _selectedPoints2[1];
    var line = createSVGElement('line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', '6');
    svg.appendChild(line);
    if (selectedPoints.length < 3 || typeof selectedPoints[2].id !== 'number') {
      drawCoordinateSystem(p2.x, p2.y);

      // Highlight saved coordinate lines
      selectedPoints.forEach(function (point) {
        if (typeof point.id === 'string') {
          var coordinateLine = svg.querySelector("line[data-label=\"".concat(point.id, "\"]"));
          if (coordinateLine) {
            coordinateLine.setAttribute('stroke', 'blue');
            coordinateLine.setAttribute('stroke-width', '2');
          }
        }
      });
    }
  }
  if (selectedPoints.length === 3) {
    var _selectedPoints3 = selectedPoints,
      _selectedPoints4 = _slicedToArray(_selectedPoints3, 3),
      _p = _selectedPoints4[0],
      _p2 = _selectedPoints4[1],
      p3 = _selectedPoints4[2];
    var line2 = createSVGElement('line');
    line2.setAttribute('x1', _p2.x);
    line2.setAttribute('y1', _p2.y);
    line2.setAttribute('x2', p3.x);
    line2.setAttribute('y2', p3.y);
    line2.setAttribute('stroke', 'blue');
    line2.setAttribute('stroke-width', '6');
    svg.appendChild(line2);
    var interiorAngle = calculateAngle(_p, _p2, p3);
    var exteriorAngle = 2 * Math.PI - interiorAngle;
    drawAngle(_p, _p2, p3, interiorAngle, 'red', false);
    drawAngle(_p, _p2, p3, exteriorAngle, 'blue', true);
  } else if (selectedPoints.length === 4) {
    var _selectedPoints5 = selectedPoints,
      _selectedPoints6 = _slicedToArray(_selectedPoints5, 4),
      _p3 = _selectedPoints6[0],
      _p4 = _selectedPoints6[1],
      _p5 = _selectedPoints6[2],
      p4 = _selectedPoints6[3];

    // Draw first line
    var line1 = createSVGElement('line');
    line1.setAttribute('x1', _p3.x);
    line1.setAttribute('y1', _p3.y);
    line1.setAttribute('x2', _p4.x);
    line1.setAttribute('y2', _p4.y);
    line1.setAttribute('stroke', 'blue');
    line1.setAttribute('stroke-width', '6');
    svg.appendChild(line1);

    // Draw second line
    var _line = createSVGElement('line');
    _line.setAttribute('x1', _p5.x);
    _line.setAttribute('y1', _p5.y);
    _line.setAttribute('x2', p4.x);
    _line.setAttribute('y2', p4.y);
    _line.setAttribute('stroke', 'green');
    _line.setAttribute('stroke-width', '6');
    svg.appendChild(_line);
  }
}
function drawAngle(p1, p2, p3, angle, color, isExteriorAngle) {
  if (isExteriorAngle && !useExteriorAngle) return;
  if (!isExteriorAngle && useExteriorAngle) return;
  var radius = 30;
  var startAngle = Math.atan2(p1.y - p2.y, p1.x - p2.x);
  var endAngle = Math.atan2(p3.y - p2.y, p3.x - p2.x);
  var start = {
    x: p2.x + radius * Math.cos(startAngle),
    y: p2.y + radius * Math.sin(startAngle)
  };
  var end = {
    x: p2.x + radius * Math.cos(endAngle),
    y: p2.y + radius * Math.sin(endAngle)
  };
  var sweepFlag = 1;
  if ((endAngle - startAngle + 2 * Math.PI) % (2 * Math.PI) > Math.PI) {
    sweepFlag = isExteriorAngle ? 1 : 0;
  } else {
    sweepFlag = isExteriorAngle ? 0 : 1;
  }
  var largeArcFlag = angle > Math.PI ? 1 : 0;
  var path = createSVGElement('path');
  var d = "M ".concat(start.x, " ").concat(start.y, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArcFlag, " ").concat(sweepFlag, " ").concat(end.x, " ").concat(end.y, " L ").concat(p2.x, " ").concat(p2.y, " Z");
  path.setAttribute('d', d);
  path.setAttribute('fill', "rgba(".concat(color === 'red' ? '255,0,0' : '0,0,255', ", 0.2)"));
  path.setAttribute('stroke', color);
  path.addEventListener('click', function (e) {
    e.stopPropagation();
    useExteriorAngle = !useExteriorAngle;
    updateAngle();
  });
  svg.appendChild(path);

  // const text = createSVGElement('text');
  // const labelRadius = 50;
  // const labelAngle = (startAngle + endAngle) / 2;
  // text.setAttribute('x', p2.x + labelRadius * Math.cos(labelAngle));
  // text.setAttribute('y', p2.y + labelRadius * Math.sin(labelAngle));
  // text.setAttribute('font-size', '14px');
  // text.setAttribute('fill', color);
  // text.setAttribute('text-anchor', 'middle');
  // text.textContent = `${(angle * 180 / Math.PI).toFixed(2)}°`;

  // svg.appendChild(text);
}

// Create save buttons
var savedAngles = Array(6).fill(null);
var _loop = function _loop(i) {
  var button = document.querySelectorAll('.angleCard');
  button[i].addEventListener('click', function (e) {
    e.stopPropagation();
    if (button[i].classList.contains('selected')) {
      button[i].classList.remove('selected');
      // showAllAngle();
    } else selectAngleButton(i);
  });
};
for (var i = 0; i < 6; i++) {
  _loop(i);
}

// Create update button
var updateButton = document.createElement('button');
updateButton.textContent = 'Update';
updateButton.style.position = 'absolute';
updateButton.style.right = '10px';
updateButton.style.bottom = '10px';
updateButton.addEventListener('click', function (e) {
  e.stopPropagation();
  saveAngle();
  saveMappingData();
  updateButton.textContent = 'saved';
  saveLocalData();
});
figure.appendChild(updateButton);
function loadAngleFromButtonContent(content) {
  // Parse the content and load the angle
  var pointIds = content.split(',').map(function (id) {
    return id.trim();
  });
  selectedPoints = pointIds.map(function (id) {
    if (['RH', 'IH', 'UV', 'DV', 'LH', 'OH'].includes(id)) {
      // For coordinate lines
      return {
        id: id,
        x: 0,
        y: 0
      }; // Coordinates will be set in updateAngle
    } else {
      return nodes.find(function (n) {
        return n.id === parseInt(id);
      });
    }
  });
  updateAngle();
  highlightSelectedNodes();
}

// Define angleData at the top level of your script
var angleData = Array(6).fill(null);
function saveAngle() {
  if (selectedPoints.length == 0) {
    updateButtonLabel(selectedButton, 'none');
    groups[selectedGroup].data["J".concat(selectedButton + 1)] = 'none';
    return;
  } else if (selectedPoints.length < 3) {
    alert('Please select at least three points or coordinate positions to save an angle.');
    return;
  }
  if (selectedButton === null) {
    alert('Please select an angle button to save the angle.');
    return;
  }
  var newAngleData = selectedPoints.map(function (p) {
    if (typeof p.id === 'string') {
      // For coordinate lines, store the line details
      return {
        id: p.id,
        x: p.x,
        y: p.y
      };
    }
    return p.id;
  });
  var angleDataString; // = (button2D.classList.contains('active') ? '2D' : '3D') + ',';
  angleDataString = newAngleData.map(function (p) {
    return _typeof(p) === 'object' ? p.id : p;
  }).join(',');
  if (groups.length > 0 && selectedGroup !== null) {
    // If groups exist and one is selected, save to the selected group
    groups[selectedGroup].data["J".concat(selectedButton + 1)].angles = angleDataString;
  } else {
    // If no groups exist or no group is selected, save to angleData
    angleData[selectedButton] = newAngleData;
  }
  updateButtonLabel(selectedButton, angleDataString);
}
function updateButtonLabel(index, angleData) {
  var button = document.querySelector(".angleCard:nth-of-type(".concat(index + 1, ")"));
  if (angleData === 'none') {
    button.querySelector('.angleCard-content').textContent = 'none';
  } else if (typeof angleData === 'string') {
    button.querySelector('.angleCard-content').textContent = angleData;
  } else if (Array.isArray(angleData)) {
    button.querySelector('.angleCard-content').textContent = angleData.map(function (p) {
      return _typeof(p) === 'object' ? p.id : p;
    }).join(',');
  } else {
    console.error('Unexpected angleData format:', angleData);
    button.querySelector('.angleCard-content').textContent = 'Error';
  }
}
function selectAngleButton(index) {
  updateButton.textContent = 'update';
  if (selectedButton !== null) {
    var prevButton = document.querySelector(".angleCard:nth-of-type(".concat(selectedButton + 1, ")"));
    prevButton.classList.remove('selected');
  }
  selectedButton = index;
  var button = document.querySelector(".angleCard:nth-of-type(".concat(index + 1, ")"));
  button.classList.add('selected');
  var currentAngleData;
  if (groups.length > 0 && selectedGroup !== null) {
    // If groups exist and one is selected, load from the selected group
    currentAngleData = groups[selectedGroup].data["J".concat(index + 1)].angles;
  } else {
    // If no groups exist or no group is selected, load from angleData
    currentAngleData = angleData[index];
  }
  if (currentAngleData) {
    if (typeof currentAngleData === 'string') {
      loadAngleFromButtonContent(currentAngleData);
    } else if (Array.isArray(currentAngleData)) {
      loadAngle(currentAngleData);
    } else {
      console.error('Unexpected angleData format:', currentAngleData);
      clearFigure();
    }
  } else {
    // Load angle data from button content if no data in groups or angleData
    var buttonContent = button.querySelector('.angleCard-content').textContent.trim();
    if (buttonContent !== 'none') {
      loadAngleFromButtonContent(buttonContent);
    } else {
      clearFigure(); // Clear the figure if content is 'none'
    }
  }
  updateMappingData(groups[selectedGroup].data["J".concat(index + 1)].mappingData);
}
function loadAngle(angleData) {
  selectedPoints = angleData.map(function (point) {
    if (_typeof(point) === 'object') {
      // For coordinate lines
      return point;
    } else {
      return nodes.find(function (n) {
        return n.id === point;
      });
    }
  });
  console.log(selectedPoints);
  updateAngle();
  highlightSelectedNodes();
}
function highlightSelectedNodes() {
  // Remove highlight from all nodes
  document.querySelectorAll('.node').forEach(function (node) {
    node.classList.remove('selected');
  });
  // Highlight selected nodes
  selectedPoints.forEach(function (point) {
    if (typeof point.id === 'number') {
      document.getElementById(point.id).classList.add('selected');
    }
  });
}

// Add click event to figure to deselect all nodes
figure.addEventListener('click', function () {
  clearFigure();
});
function clearFigure() {
  document.querySelectorAll('.node').forEach(function (node) {
    node.classList.remove('selected');
  });
  selectedPoints = [];
  useExteriorAngle = false;
  selectedCoordinateLine = null;
  showCoordinateSystem = false;
  updateAngle();
}
document.getElementById('addGroupBtn').addEventListener('click', addGroup);
window.groups = [];
window.selectedGroup = null;
window.groupNameSelected = 'default';
document.addEventListener('DOMContentLoaded', function () {
  initGroups();
});

// Define default values for each axis
var defaultAxisValues = {
  J1: {
    PL: -90,
    PR: 90,
    AL: -110,
    AR: 110,
    PHL: -90,
    PHR: 90,
    AHL: -110,
    AHR: 110
  },
  J2: {
    PL: 0,
    PR: 60,
    AL: -50,
    AR: 0,
    PHL: 0,
    PHR: 60,
    AHL: -50,
    AHR: 0
  },
  J3: {
    PL: 0,
    PR: 180,
    AL: -80,
    AR: 90,
    PHL: 0,
    PHR: 180,
    AHL: -80,
    AHR: 90
  },
  J4: {
    PL: 0,
    PR: 0,
    AL: 0,
    AR: 0,
    PHL: 0,
    PHR: 0,
    AHL: 0,
    AHR: 0
  },
  // J4 is always 0
  J5: {
    PL: 90,
    PR: 180,
    AL: -90,
    AR: 0,
    PHL: 90,
    PHR: 180,
    AHL: -90,
    AHR: 0
  },
  J6: {
    PL: 0,
    PR: 0,
    AL: 0,
    AR: 0,
    PHL: 0,
    PHR: 0,
    AHL: 0,
    AHR: 0
  } // J6 is always 0
};
var initGroups = function initGroups() {
  var defaultGroup = {
    name: 'default',
    data: {}
  };
  var angleCards = document.querySelectorAll('.angleCard.AC');
  angleCards.forEach(function (card, index) {
    var content = card.querySelector('.angleCard-content').textContent.trim();
    defaultGroup.data["J".concat(index + 1)] = {
      angles: content,
      mappingData: _objectSpread({}, defaultAxisValues["J".concat(index + 1)])
    };
  });
  groups.push(defaultGroup);
  updateGroups();
};
function addGroup() {
  var name = document.getElementById('newGroupName').value.trim();
  if (name === '') {
    name = 'default';
  }
  var groupData = {};
  for (var _i = 1; _i <= 6; _i++) {
    var cardContent = document.querySelector(".angleCard:nth-of-type(".concat(_i, ") .angleCard-content")).textContent;
    groupData["J".concat(_i)] = {
      angles: cardContent,
      mappingData: _objectSpread({}, defaultAxisValues["J".concat(_i)])
    };
  }
  groups.push({
    name: name,
    data: groupData
  });
  updateGroups();
  document.getElementById('newGroupName').value = '';
}
window.updateGroups = function () {
  var groupsContainer = document.getElementById('groups-container');
  groupsContainer.innerHTML = '';
  groups.forEach(function (group, index) {
    var card = document.createElement('div');
    card.className = 'angleCard group-card';
    card.innerHTML = "\n        <div class=\"angleCard-label\">G".concat(index + 1, "</div>\n        <div class=\"angleCard-content\">").concat(group.name, "</div>\n        ").concat(index !== 0 ? '<span class="delete-group">X</span>' : '', "\n      ");
    card.addEventListener('click', function (e) {
      if (!e.target.classList.contains('delete-group')) {
        selectGroup(index);
      }
    });
    if (index !== 0) {
      var deleteBtn = card.querySelector('.delete-group');
      var clickTimer = null;
      var clickCount = 0;
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        clickCount++;
        if (clickCount === 1) {
          clickTimer = setTimeout(function () {
            if (clickCount === 1) {
              // Single click
              if (confirm("\u78BA\u5B9A\u8981\u522A\u9664\u7FA4\u7D44 \"".concat(group.name, "\" \u55CE\uFF1F"))) {
                deleteGroup(index);
              }
            }
            clickCount = 0;
          }, 300); // Adjust this delay as needed
        } else if (clickCount === 2) {
          // Double click
          clearTimeout(clickTimer);
          deleteGroup(index);
          clickCount = 0;
        }
      });
    }
    enableGroupNameEdit(card, index);
    groupsContainer.appendChild(card);
  });
  if (groups.length === 1) {
    selectGroup(0);
  } else {
    selectGroup(selectedGroup);
  }
  saveLocalData();
};
function deleteGroup(index) {
  if (index === 0) {
    alert("無法刪除預設群組。");
    return;
  }
  groups.splice(index, 1);
  if (selectedGroup === index) {
    selectedGroup--;
  }
  updateGroups();
}
window.selectGroup = function (index) {
  if (selectedGroup !== null) {
    var prevGroupCard = document.querySelector("#groups-container .angleCard:nth-child(".concat(selectedGroup + 1, ")"));
    prevGroupCard.classList.remove('selected');
  }
  selectedGroup = index;
  var group = groups[index];
  var groupCard = document.querySelector("#groups-container .angleCard:nth-child(".concat(index + 1, ")"));
  groupCard.classList.add('selected');
  groupNameSelected = group.name;
  if (group && group.data) {
    for (var _i2 = 1; _i2 <= 6; _i2++) {
      var card = document.querySelector(".angleCard:nth-of-type(".concat(_i2, ")"));
      var content = group.data["J".concat(_i2)].angles || 'none';
      card.querySelector('.angleCard-content').textContent = content;
    }
    // Update mappingData for the selected joint (assuming we're working with J1)
    updateMappingData(group.data.J1.mappingData);
  }
  selectAngleButton(0);
};
window.updateMappingData = function (data) {
  if (!data) return;
  postureSlider.setBounds(data.PL, data.PR);
  postureSlider.setValues([data.PHL, data.PHR]);
  armSlider.setBounds(data.AL, data.AR);
  armSlider.setValues([data.AHL, data.AHR]);
};
window.saveMappingData = function () {
  if (selectedGroup === null || !groups[selectedGroup]) return;
  var currentJoint = "J".concat(selectedButton + 1);
  var currentData = groups[selectedGroup].data[currentJoint].mappingData;
  currentData.PL = postureSlider.leftBound;
  currentData.PR = postureSlider.rightBound;
  currentData.AL = armSlider.leftBound;
  currentData.AR = armSlider.rightBound;
  currentData.PHL = postureSlider.output[0];
  currentData.PHR = postureSlider.output[1];
  currentData.AHL = armSlider.output[0];
  currentData.AHR = armSlider.output[1];
  console.log("Mapping data saved for ".concat(currentJoint, " in group ").concat(selectedGroup));
};
window.resetMappingData = function () {
  if (selectedGroup === null || !groups[selectedGroup]) return;
  var currentJoint = "J".concat(selectedButton + 1);
  var currentData = groups[selectedGroup].data[currentJoint].mappingData;
  Object.assign(currentData, defaultAxisValues.posture, defaultAxisValues.arm);
  updateSliders(currentData);
  console.log("Mapping data reset to default for ".concat(currentJoint, " in group ").concat(selectedGroup));
};
function enableGroupNameEdit(card, groupIndex) {
  var contentDiv = card.querySelector('.angleCard-content');
  card.addEventListener('dblclick', function (e) {
    if (e.target === contentDiv) {
      var currentName = contentDiv.textContent;
      var input = document.createElement('input');
      input.value = currentName;
      input.className = 'edit-group-name';
      input.style.width = '100%';
      input.style.boxSizing = 'border-box';
      input.style.padding = '8px 8px 8px 0';
      input.style.border = 'none';
      input.style.backgroundColor = 'transparent';
      input.style.font = 'inherit';
      contentDiv.textContent = '';
      contentDiv.appendChild(input);
      input.focus();
      input.addEventListener('blur', finishEdit);
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          finishEdit();
        }
      });
      function finishEdit() {
        var newName = input.value.trim() || 'default';
        groups[groupIndex].name = newName;
        contentDiv.textContent = newName;
        updateGroups();
      }
    }
  });
}
var NumericRangeSlider = /*#__PURE__*/function () {
  function NumericRangeSlider(container, options) {
    _classCallCheck(this, NumericRangeSlider);
    this.container = document.getElementById(container);
    this.leftInput = this.container.previousElementSibling;
    this.rightInput = this.container.nextElementSibling;
    this.leftBound = options.leftBound;
    this.rightBound = options.rightBound;
    this.values = options.values || [this.leftBound, this.rightBound];
    this.step = options.step || 1;
    this.onChange = options.onChange || function () {};
    this.dragging = null;
    this.output = options.values || [this.leftBound, this.rightBound];
    this.init();
  }
  return _createClass(NumericRangeSlider, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.range = document.createElement('div');
      this.range.className = 'slider-range';
      this.container.appendChild(this.range);
      this.handles = this.values.map(function (value, index) {
        var handle = document.createElement('div');
        handle.className = 'slider-handle';
        handle.setAttribute('data-index', index);
        var label = document.createElement('div');
        label.className = 'slider-label';
        handle.appendChild(label);
        _this.container.appendChild(handle);
        handle.addEventListener('mousedown', _this.startDragging.bind(_this));
        return handle;
      });
      this.leftInput.addEventListener('change', this.updateFromInput.bind(this));
      this.rightInput.addEventListener('change', this.updateFromInput.bind(this));
      this.updateHandles();
    }
  }, {
    key: "startDragging",
    value: function startDragging(e) {
      e.preventDefault();
      this.dragging = parseInt(e.target.getAttribute('data-index'));
      document.addEventListener('mousemove', this.drag.bind(this));
      document.addEventListener('mouseup', this.stopDragging.bind(this));
    }
  }, {
    key: "stopDragging",
    value: function stopDragging() {
      this.dragging = null;
      document.removeEventListener('mousemove', this.drag.bind(this));
      document.removeEventListener('mouseup', this.stopDragging.bind(this));
    }
  }, {
    key: "drag",
    value: function drag(e) {
      if (this.dragging === null) return;
      var rect = this.container.getBoundingClientRect();
      var position = (e.clientX - rect.left) / rect.width;
      position = Math.max(0, Math.min(1, position));
      var value = this.leftBound + (this.rightBound - this.leftBound) * position;
      var snappedValue = Math.round(value / this.step) * this.step;
      if (this.leftBound <= this.rightBound) this.values[this.dragging] = Math.max(this.leftBound, Math.min(this.rightBound, snappedValue));else this.values[this.dragging] = Math.max(this.rightBound, Math.min(this.leftBound, snappedValue));
      this.updateHandles();
      this.onChange(this.values);
    }
  }, {
    key: "updateFromInput",
    value: function updateFromInput() {
      var leftOrigin = this.leftBound;
      var rightOrigin = this.rightBound;
      this.leftBound = parseFloat(this.leftInput.value);
      this.rightBound = parseFloat(this.rightInput.value);
      if ((rightOrigin - leftOrigin) * (this.rightBound - this.leftBound) < 0) this.values = [this.leftBound, this.rightBound];else {
        var minor, major;
        if (this.leftBound <= this.rightBound) {
          minor = this.leftBound;
          major = this.rightBound;
        } else {
          minor = this.rightBound;
          major = this.leftBound;
        }
        if (this.values[0] < minor) this.values[0] = minor;
        if (this.values[0] > major) this.values[0] = major;
        if (this.values[1] < minor) this.values[1] = minor;
        if (this.values[1] > major) this.values[1] = major;
      }
      this.updateHandles();
      this.onChange(this.values);
    }
  }, {
    key: "updateHandles",
    value: function updateHandles() {
      var _this2 = this;
      var leftPosition = (this.values[0] - this.leftBound) / (this.rightBound - this.leftBound);
      var rightPosition = (this.values[1] - this.leftBound) / (this.rightBound - this.leftBound);
      this.handles.forEach(function (handle, index) {
        var position = index === 0 ? leftPosition : rightPosition;
        handle.style.left = "".concat(position * 100, "%");
        handle.querySelector('.slider-label').textContent = _this2.values[index];
      });
      this.range.style.left = "".concat(Math.min(leftPosition, rightPosition) * 100, "%");
      this.range.style.right = "".concat((1 - Math.max(leftPosition, rightPosition)) * 100, "%");
      if (this.values[0] > this.values[1] && this.leftBound <= this.rightBound || this.values[0] <= this.values[1] && this.leftBound > this.rightBound) this.output = [this.values[1], this.values[0]];else this.output = this.values;
      // console.log(this.output);
    }
  }, {
    key: "setBounds",
    value: function setBounds(left, right) {
      this.leftBound = left;
      this.rightBound = right;
      this.leftInput.value = left;
      this.rightInput.value = right;
      this.updateHandles();
    }
  }, {
    key: "setValues",
    value: function setValues(values) {
      var _this3 = this;
      this.values = values.map(function (value) {
        return Math.max(Math.min(_this3.leftBound, _this3.rightBound), Math.min(Math.max(_this3.leftBound, _this3.rightBound), value));
      });
      this.updateHandles();
    }
  }]);
}(); // Initialize sliders
var postureSlider = new NumericRangeSlider('postureSlider', {
  leftBound: 0,
  rightBound: 360,
  values: [0, 360],
  step: 1
});
var armSlider = new NumericRangeSlider('armSlider', {
  leftBound: 0,
  rightBound: 360,
  values: [0, 360],
  step: 1
});
var buttonSlider = document.querySelector('.button-23d-slider');
var button2D = document.getElementById('button2D');
var button3D = document.getElementById('button3D');
function toggleButton(e, button) {
  e.stopPropagation();
  if (!button.classList.contains('active')) {
    button2D.classList.toggle('active');
    button3D.classList.toggle('active');
    buttonSlider.style.transform = button === button2D ? 'translateY(0)' : 'translateY(40px)';
  }
}
button2D.addEventListener('click', function (e) {
  return toggleButton(e, button2D);
});
button3D.addEventListener('click', function (e) {
  return toggleButton(e, button3D);
});

// Set initial state to 3D
buttonSlider.style.transform = 'translateY(40px)';
},{}]},{},["EwPg"], null)
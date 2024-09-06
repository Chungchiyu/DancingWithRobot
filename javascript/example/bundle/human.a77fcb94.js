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

// Initial draw of the dashed circle
drawDashedCircle();

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
    if (selectedPoints.length >= 3) {
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
function drawDashedCircle() {
  var circle = createSVGElement('circle');
  circle.setAttribute('cx', '150');
  circle.setAttribute('cy', '40');
  circle.setAttribute('r', '35');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', 'black');
  circle.setAttribute('stroke-width', '2');
  circle.setAttribute('stroke-dasharray', '5,5');
  svg.appendChild(circle);
}
function drawCoordinateSystem(x, y) {
  var size = 50;
  var angles = [0, -Math.PI / 4, -Math.PI / 2, Math.PI / 2, Math.PI, 3 * Math.PI / 4];
  var labels = ['RH', 'IH', 'UV', 'DV', 'LH', 'OH'];
  angles.forEach(function (angle, index) {
    var line = createSVGElement('line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x + size * Math.cos(angle));
    line.setAttribute('y2', y + size * Math.sin(angle));
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '5,5');
    line.setAttribute('data-label', labels[index]);
    line.style.transition = 'all 0.3s ease';
    var hitBox = createSVGElement('line');
    hitBox.setAttribute('x1', x);
    hitBox.setAttribute('y1', y);
    hitBox.setAttribute('x2', x + size * Math.cos(angle));
    hitBox.setAttribute('y2', y + size * Math.sin(angle));
    hitBox.setAttribute('stroke', 'transparent');
    hitBox.setAttribute('stroke-width', '3');
    var label = createSVGElement('text');
    label.setAttribute('x', x + (size + 10) * Math.cos(angle));
    label.setAttribute('y', y + (size + 10) * Math.sin(angle));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.textContent = labels[index];
    label.style.opacity = '0';
    hitBox.addEventListener('mouseover', function () {
      line.setAttribute('stroke', 'red');
      line.setAttribute('stroke-width', '2');
      label.style.opacity = '1';
    });
    hitBox.addEventListener('mouseout', function () {
      if (selectedCoordinateLine !== line) {
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '1');
      }
      label.style.opacity = '0';
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
  }
  if (selectedPoints.length >= 2) {
    var _selectedPoints5 = selectedPoints,
      _selectedPoints6 = _slicedToArray(_selectedPoints5, 2),
      _p3 = _selectedPoints6[0],
      _p4 = _selectedPoints6[1];
    drawCoordinateSystem(_p4.x, _p4.y);

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
  drawDashedCircle();
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
updateButton.addEventListener('click', saveAngle);
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
    return;
  } else if (selectedPoints.length !== 3) {
    alert('Please select three points or coordinate positions to save an angle.');
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
  var angleDataString = newAngleData.map(function (p) {
    return _typeof(p) === 'object' ? p.id : p;
  }).join(',');
  if (groups.length > 0 && selectedGroup !== null) {
    // If groups exist and one is selected, save to the selected group
    groups[selectedGroup].data["J".concat(selectedButton + 1)] = angleDataString;
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
    currentAngleData = groups[selectedGroup].data["J".concat(index + 1)];
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
var selectedGroup = null;
document.addEventListener('DOMContentLoaded', function () {
  var defaultGroup = {
    name: 'default',
    data: {}
  };
  var angleCards = document.querySelectorAll('.angleCard');
  angleCards.forEach(function (card, index) {
    var content = card.querySelector('.angleCard-content').textContent.trim();
    defaultGroup.data["J".concat(index + 1)] = content;
  });
  groups.push(defaultGroup);
  updateGroups();
});
function addGroup() {
  var name = document.getElementById('newGroupName').value.trim();
  if (name === '') {
    name = 'default';
  }

  // Collect data from J1~J6
  var groupData = {};
  for (var _i = 1; _i <= 6; _i++) {
    var cardContent = document.querySelector(".angleCard:nth-of-type(".concat(_i, ") .angleCard-content")).textContent;
    groupData["J".concat(_i)] = cardContent;
  }
  groups.push({
    name: name,
    data: groupData
  });
  updateGroups();
  document.getElementById('newGroupName').value = '';
  // Clear angleData when a group is added
  angleData = Array(6).fill(null);
}
function updateGroups() {
  var groupsContainer = document.getElementById('groups-container');
  groupsContainer.innerHTML = ''; // Clear existing groups
  groups.forEach(function (group, index) {
    var card = document.createElement('div');
    card.className = 'angleCard';
    card.innerHTML = "\n            <div class=\"angleCard-label\">G".concat(index + 1, "</div>\n            <div class=\"angleCard-content\">").concat(group.name, "</div>\n        ");
    card.addEventListener('click', function () {
      return selectGroup(index);
    });
    groupsContainer.appendChild(card);
  });
}
function selectGroup(index) {
  if (selectedGroup === index) {
    // If the same group is clicked again, deselect it
    var groupCard = document.querySelector("#groups-container .angleCard:nth-child(".concat(index + 1, ")"));
    groupCard.classList.remove('selected');
    selectedGroup = null;
    // Load data from angleData
    for (var _i2 = 1; _i2 <= 6; _i2++) {
      var card = document.querySelector(".angleCard:nth-of-type(".concat(_i2, ")"));
      var content = angleData[_i2 - 1] ? angleData[_i2 - 1].map(function (p) {
        return _typeof(p) === 'object' ? p.id : p;
      }).join(',') : 'none';
      card.querySelector('.angleCard-content').textContent = content;
    }
  } else {
    // Deselect previously selected group
    if (selectedGroup !== null) {
      var prevGroupCard = document.querySelector("#groups-container .angleCard:nth-child(".concat(selectedGroup + 1, ")"));
      prevGroupCard.classList.remove('selected');
    }
    selectedGroup = index;
    var group = groups[index];
    var _groupCard = document.querySelector("#groups-container .angleCard:nth-child(".concat(index + 1, ")"));
    _groupCard.classList.add('selected');
    if (group && group.data) {
      // Update J1~J6 angleCards with the group data
      for (var _i3 = 1; _i3 <= 6; _i3++) {
        var _card = document.querySelector(".angleCard:nth-of-type(".concat(_i3, ")"));
        var _content = group.data["J".concat(_i3)] || 'none';
        _card.querySelector('.angleCard-content').textContent = _content;
      }
    }
  }
}
},{}]},{},["EwPg"], null)
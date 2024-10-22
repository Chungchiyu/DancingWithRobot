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
})({"gGTM":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var editor = document.getElementById('editor');
var lineNumbers = document.querySelector('.line-numbers');
var showEditorBtn = document.getElementById('showEditor');
var editorContainer = document.getElementById('editorContainer');
var editorHeader = document.getElementById('editorHeader');
var downloadBtn = document.getElementById('code-download');
function updateLineNumbers() {
  var lines = editor.value.split('\n');
  lineNumbers.innerHTML = lines.map(function (_, index) {
    return index + 1;
  }).join('<br>');
}
editor.addEventListener('input', updateLineNumbers);
editor.addEventListener('scroll', function () {
  lineNumbers.scrollTop = editor.scrollTop;
});
showEditorBtn.addEventListener('click', function () {
  updateEditorWithJointsData(window.jointsData);
  editorContainer.classList.add('expanded');
  showEditorBtn.style.display = 'none';
});
editorHeader.addEventListener('click', function (e) {
  if (e.target === editorHeader) {
    editorContainer.classList.remove('expanded');
    showEditorBtn.style.display = 'block';
  }
});
downloadBtn.addEventListener('click', function () {
  var text = editor.value;
  var blob = new Blob([text], {
    type: 'text/plain'
  });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'code.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
editor.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key === '/') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    var lines = this.value.split('\n');
    var startLine = this.value.substr(0, start).split('\n').length - 1;
    var endLine = this.value.substr(0, end).split('\n').length - 1;
    for (var i = startLine; i <= endLine; i++) {
      if (lines[i].startsWith('// ')) {
        lines[i] = lines[i].substr(3);
      } else {
        lines[i] = '// ' + lines[i];
      }
    }
    this.value = lines.join('\n');
    updateLineNumbers();
  }
});
var isResizing = false;
var currentHandle = null;
var resizeHandles = document.querySelectorAll('.resize-handle');
resizeHandles.forEach(function (handle) {
  handle.addEventListener('mousedown', initResize);
});
function initResize(e) {
  isResizing = true;
  currentHandle = e.target.classList;
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
  e.preventDefault();
}
function resize(e) {
  if (!isResizing) return;
  var container = editorContainer;
  var clientX = e.clientX,
    clientY = e.clientY;
  var _container$getBoundin = container.getBoundingClientRect(),
    left = _container$getBoundin.left,
    top = _container$getBoundin.top,
    width = _container$getBoundin.width,
    height = _container$getBoundin.height;
  if (currentHandle.contains('right') || currentHandle.contains('corner')) {
    var newWidth = Math.max(245, clientX - left);
    container.style.width = "".concat(newWidth, "px");
  }
  if (currentHandle.contains('top') || currentHandle.contains('corner')) {
    var newHeight = Math.max(420, height - (clientY - top));
    var newTop = Math.min(container.offsetTop + (clientY - top), container.offsetTop + height - 420);
    container.style.height = "".concat(newHeight, "px");
    container.style.top = "".concat(newTop, "px");
  }
  updateLineNumbers();
}
function stopResize() {
  isResizing = false;
  currentHandle = null;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
}
updateLineNumbers();
function updateEditorWithJointsData(jointsData) {
  if (jointsData.length > 0) {
    var formattedData = jointsData.map(function (frame, index) {
      var angles = [frame.angles.J1 || 0, frame.angles.J2 || 0, frame.angles.J3 || 0, frame.angles.J4 || 0, frame.angles.J5 || 0, frame.angles.J6 || 0];
      var point = "E6AXIS P".concat(index, "={A1 ").concat(angles[0], ",A2 ").concat(angles[1], ",A3 ").concat(angles[2], ",A4 ").concat(angles[3], ",A5 ").concat(angles[4], ",A6 ").concat(angles[5], "}\n");
      var run = "PTP P".concat(index, " CONT=60% Vel=100% Acc=100%");
      return point + run;
    }).join('\n');
    editor.value = formattedData;
    updateLineNumbers();
  }
}
function setupJointsDataProxy() {
  var handler = {
    set: function set(target, property, value) {
      target[property] = value;
      if (Array.isArray(target)) {
        updateEditorWithJointsData(target);
      }
      return true;
    }
  };
  window.jointsData = new Proxy(window.jointsData || [], handler);
}
window.addEventListener('load', setupJointsDataProxy);
function exportAndDownload() {
  var jsonData = {
    groups: groups,
    jointsData: jointsData
  };
  console.log(jointsData);
  var jsonString = JSON.stringify(jsonData, null, 2);

  // Download JSON
  downloadFile(jsonString, 'generated_data.json', 'application/json');

  // Download Excel
  var workbook = XLSX.utils.book_new();

  // Process groups data
  // const groupsSheet = XLSX.utils.json_to_sheet(processGroupsData(groups));
  // XLSX.utils.book_append_sheet(workbook, groupsSheet, "Groups");

  // Process jointsData
  var jointsDataSheet = XLSX.utils.json_to_sheet(processJointsData(jointsData));
  XLSX.utils.book_append_sheet(workbook, jointsDataSheet, "JointsData");
  var excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });
  downloadFile(excelBuffer, 'generated_data.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}
function processGroupsData(groups) {
  var processedGroups = [];
  groups.forEach(function (group) {
    var groupData = group.data;
    for (var _i = 0, _Object$entries = Object.entries(groupData); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        jointName = _Object$entries$_i[0],
        jointData = _Object$entries$_i[1];
      var row = _objectSpread({
        group_name: group.name,
        joint_name: jointName,
        angles: jointData.angles
      }, jointData.mappingData);
      processedGroups.push(row);
    }
  });
  return processedGroups;
}
function processJointsData(jointsData) {
  return jointsData.map(function (frame) {
    var processedFrame = {
      time: frame.time,
      group: frame.group
    };
    for (var _i2 = 0, _Object$entries2 = Object.entries(frame.angles); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        jointName = _Object$entries2$_i[0],
        angle = _Object$entries2$_i[1];
      processedFrame["".concat(jointName)] = angle;
    }
    return processedFrame;
  });
}
function downloadFile(content, fileName, mimeType) {
  var blob = new Blob([content], {
    type: mimeType
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get references to the DOM elements
var fileInput = document.getElementById('fileInput');
var output = document.getElementById('output');
var clearBtn = document.querySelector(".clearBtn");

// Add event listener for file selection
fileInput.addEventListener('change', handleFileSelect);
clearBtn.addEventListener('click', function () {
  fileInput.value = '';
});
function handleFileSelect(event) {
  var file = event.target.files[0];
  if (file) {
    // Create a new FileReader instance
    var reader = new FileReader();

    // Set up the FileReader onload event handler
    reader.onload = function (e) {
      try {
        // Parse the file contents as JSON
        var jsonData = JSON.parse(e.target.result);
        window.groups = jsonData.groups;
        window.jointsData = jsonData.jointsData;
        window.updateGroups();
        for (var i = 0; i < window.jointsData.length; i++) {
          window.addFrameCard(i);
        }
        // You can perform further operations with jsonData here
        console.log('Successfully imported JSON data:', jsonData);
      } catch (error) {
        // Handle JSON parsing errors
        output.textContent = 'Error parsing JSON: ' + error.message;
        console.error('Error parsing JSON:', error);
      }
    };

    // Set up the FileReader onerror event handler
    reader.onerror = function (e) {
      output.textContent = 'Error reading file: ' + e.target.error;
      console.error('Error reading file:', e.target.error);
    };

    // Read the file as text
    reader.readAsText(file);
  } else {
    output.textContent = 'No file selected';
  }
}
document.getElementById('jsonEXBtn').addEventListener('click', exportAndDownload);
},{}]},{},["gGTM"], null)
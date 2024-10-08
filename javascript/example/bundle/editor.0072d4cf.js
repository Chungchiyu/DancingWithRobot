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
function exportAndDownload() {
  var jsonData = {
    groups: groups,
    jointsData: jointsData
  };
  console.log(jointsData);
  var jsonString = JSON.stringify(jsonData, null, 2);
  var blob = new Blob([jsonString], {
    type: 'application/json'
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'generated_data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get references to the DOM elements
var fileInput = document.getElementById('fileInput');
var output = document.getElementById('output');

// Add event listener for file selection
fileInput.addEventListener('change', handleFileSelect);
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
const editor = document.getElementById('editor');
const lineNumbers = document.querySelector('.line-numbers');
const showEditorBtn = document.getElementById('showEditor');
const editorContainer = document.getElementById('editorContainer');
const editorHeader = document.getElementById('editorHeader');
const downloadBtn = document.getElementById('code-download');

function updateLineNumbers() {
    const lines = editor.value.split('\n');
    lineNumbers.innerHTML = lines.map((_, index) => index + 1).join('<br>');
}

editor.addEventListener('input', updateLineNumbers);
editor.addEventListener('scroll', () => {
    lineNumbers.scrollTop = editor.scrollTop;
});

showEditorBtn.addEventListener('click', () => {
    editorContainer.classList.add('expanded');
    showEditorBtn.style.display = 'none';
});

editorHeader.addEventListener('click', (e) => {
    if (e.target === editorHeader) {
        editorContainer.classList.remove('expanded');
        showEditorBtn.style.display = 'block';
    }
});

downloadBtn.addEventListener('click', () => {
    const text = editor.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

editor.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const lines = this.value.split('\n');
        let startLine = this.value.substr(0, start).split('\n').length - 1;
        let endLine = this.value.substr(0, end).split('\n').length - 1;

        for (let i = startLine; i <= endLine; i++) {
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

let isResizing = false;
let currentHandle = null;

const resizeHandles = document.querySelectorAll('.resize-handle');

resizeHandles.forEach(handle => {
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

    const container = editorContainer;
    const { clientX, clientY } = e;
    const { left, top, width, height } = container.getBoundingClientRect();

    if (currentHandle.contains('right') || currentHandle.contains('corner')) {
        const newWidth = Math.max(245, clientX - left);
        container.style.width = `${newWidth}px`;
    }

    if (currentHandle.contains('top') || currentHandle.contains('corner')) {
        const newHeight = Math.max(420, height - (clientY - top));
        const newTop = Math.min(container.offsetTop + (clientY - top), container.offsetTop + height - 420);
        container.style.height = `${newHeight}px`;
        container.style.top = `${newTop}px`;
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
    const jsonData = { groups, jointsData };
    console.log(jointsData);
    const jsonString = JSON.stringify(jsonData, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



// Get references to the DOM elements
const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');

// Add event listener for file selection
fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Create a new FileReader instance
        const reader = new FileReader();
        
        // Set up the FileReader onload event handler
        reader.onload = function(e) {
            try {
                // Parse the file contents as JSON
                const jsonData = JSON.parse(e.target.result);
                
                window.groups = jsonData.groups;
                window.jointsData = jsonData.jointsData;
                
                window.updateGroups();
                for (let i = 0; i < window.jointsData.length; i++) {
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
        reader.onerror = function(e) {
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
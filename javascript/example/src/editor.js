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
    updateEditorWithJointsData(window.jointsData);
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

function updateEditorWithJointsData(jointsData) {
    if (jointsData.length > 0) {
        const formattedData = jointsData.map((frame, index) => {
            const angles = [
                frame.angles.J1 || 0,
                frame.angles.J2 || 0,
                frame.angles.J3 || 0,
                frame.angles.J4 || 0,
                frame.angles.J5 || 0,
                frame.angles.J6 || 0
            ];
            
            const point = `E6AXIS P${index}={A1 ${angles[0]},A2 ${angles[1]},A3 ${angles[2]},A4 ${angles[3]},A5 ${angles[4]},A6 ${angles[5]}}\n`;
            let run = ``;
            if (index > 0) {
                let duration = Math.round((jointsData[index].time - jointsData[index-1].time) * 1000);
                run = `PTP_TIME P${index} CONT TIME=${duration} msec Acc=100% TOOL[0] BASE[0]`;
            } else {
                run = `PTP P${index} CONT=60% Vel=100% Acc=100%`;
            }
            return point + run
        }).join('\n');

        editor.value = formattedData;
        updateLineNumbers();
    }
}

function setupJointsDataProxy() {
    const handler = {
        set(target, property, value) {
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
    const jsonData = { groups, jointsData };
    console.log(jointsData);
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Download JSON
    downloadFile(jsonString, 'generated_data.json', 'application/json');

    // Download Excel
    const workbook = XLSX.utils.book_new();
    
    // Process groups data
    // const groupsSheet = XLSX.utils.json_to_sheet(processGroupsData(groups));
    // XLSX.utils.book_append_sheet(workbook, groupsSheet, "Groups");
    
    // Process jointsData
    const jointsDataSheet = XLSX.utils.json_to_sheet(processJointsData(jointsData));
    XLSX.utils.book_append_sheet(workbook, jointsDataSheet, "JointsData");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    downloadFile(excelBuffer, 'generated_data.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}

function processGroupsData(groups) {
    const processedGroups = [];
    groups.forEach(group => {
        const groupData = group.data;
        for (const [jointName, jointData] of Object.entries(groupData)) {
            const row = {
                group_name: group.name,
                joint_name: jointName,
                angles: jointData.angles,
                ...jointData.mappingData
            };
            processedGroups.push(row);
        }
    });
    return processedGroups;
}

function processJointsData(jointsData) {
    return jointsData.map(frame => {
        const processedFrame = {
            time: frame.time,
            group: frame.group
        };
        for (const [jointName, angle] of Object.entries(frame.angles)) {
            processedFrame[`${jointName}`] = angle;
        }
        return processedFrame;
    });
}

function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// Get references to the DOM elements
const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
const clearBtn = document.querySelector(".clearBtn");

// Add event listener for file selection
fileInput.addEventListener('change', handleFileSelect);
clearBtn.addEventListener('click', () => { fileInput.value = ''; });

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
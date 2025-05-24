const editor = document.getElementById('editor');
const lineNumbers = document.querySelector('.line-numbers');
const showEditorBtn = document.getElementById('showEditor');
const editorContainer = document.getElementById('editorContainer');
const editorHeader = document.getElementById('editorHeader');
const downloadBtn = document.getElementById('code-download');
const simLoading = document.getElementById('sim-loading');

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
    adjustEditorToContentWidth();
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
    const filename = `${exportBtn.dataset.filename}_code.hrb` || 'code.hrb';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

function adjustEditorToContentWidth() {
    // 創建測量用元素
    const measurer = document.createElement('span');
    measurer.style.visibility = 'hidden';
    measurer.style.position = 'absolute';
    measurer.style.whiteSpace = 'pre';  // 保持空格
    measurer.style.font = getComputedStyle(editor).font;
    document.body.appendChild(measurer);
    
    // 計算最長行寬度
    let maxWidth = 0;
    editor.value.split('\n').forEach(line => {
        measurer.textContent = line;
        maxWidth = Math.max(maxWidth, measurer.offsetWidth);
    });
    
    // 清理測量元素
    document.body.removeChild(measurer);
    
    // 計算總寬度（加上行號寬度和一些邊距）
    const lineNumbersWidth = 40;  // 行號欄寬度
    const padding = 40;  // 額外邊距
    
    // 設置新寬度（確保在合理範圍內）
    let newWidth = maxWidth + lineNumbersWidth + padding;
    newWidth = Math.max(245, Math.min(newWidth, window.innerWidth * 0.9));
    editorContainer.style.width = `${newWidth}px`;
}

// 更新內容後也調整寬度
// function updateEditorWithJointsData(jointsData) {
//     if (jointsData.length > 0) {
//         // 現有的格式化代碼...
        
//         editor.value = formattedData;
//         updateLineNumbers();
        
//         // 如果編輯器已展開，調整寬度
//         if (editorContainer.classList.contains('expanded')) {
//             adjustEditorToContentWidth();
//         }
//     }
// }

// 輸入時也調整寬度
editor.addEventListener('input', () => {
    updateLineNumbers();
    if (editorContainer.classList.contains('expanded')) {
        adjustEditorToContentWidth();
    }
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
            if (lines[i].startsWith('; ')) {
                lines[i] = lines[i].substr(3);
            } else {
                lines[i] = '; ' + lines[i];
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
            
            const comment = `; <Pose ${index}>\n`;
            const point = `E6AXIS P${index}={A1 ${angles[0]},A2 ${angles[1]},A3 ${angles[2]},A4 ${angles[3]},A5 ${angles[4]},A6 ${angles[5]}}\n`;
            let run = ``;
            if (index > 0) {
                let duration = Math.round((jointsData[index].time - jointsData[index-1].time) * 1000);
                run = `PTP_TIME P${index} FINE=1 TIME=${duration} msec Acc=100% TOOL[0] BASE[0]`;
            } else {
                run = `PTP P${index} FINE=1 Vel=10% Acc=100%`;
            }
            return comment + point + run + `\n`
        }).join('\n');

        const file_head = `;Version:310\n;[Point&S]\n;[Point&E]\n;[Program&SV2]\n`;
        const file_end = `;[Program&E]\n`;

        editor.value = file_head + formattedData + file_end;
        updateLineNumbers();
        
        if (editorContainer.classList.contains('expanded')) {
            adjustEditorToContentWidth();
        }
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

const exportBtn = document.getElementById('jsonEXBtn');
const filenameInputContainer = document.getElementById('filenameInputContainer');
const filenameInput = document.getElementById('filenameInput');

let hideTimeout;

exportBtn.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout); // 清除任何正在等待的淡出計時器
    setTimeout(() => {
        filenameInputContainer.classList.add('visible');
        filenameInput.focus();
    }, 500); // 等待 0.1 秒後淡入
});

exportBtn.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        filenameInputContainer.classList.remove('visible');
        filenameInput.blur();
    }, 500); // 等待 0.5 秒後淡出
});

filenameInputContainer.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout); // 滑鼠進入時取消淡出計時器
});

filenameInputContainer.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        filenameInputContainer.classList.remove('visible');
    }, 500); // 滑鼠離開時重新啟動淡出計時器
});

filenameInput.addEventListener('input', () => {
    const customFilename = filenameInput.value.trim();
    if (customFilename) {
        exportBtn.dataset.filename = customFilename;
    } else {
        exportBtn.dataset.filename = 'joints_data';
    }
});

function exportAndDownload() {
    const jsonData = { groups, jointsData };
    const jsonString = JSON.stringify(jsonData, null, 2);

    const filename = filenameInput.value.trim() || 'joints_data';
    downloadFile(jsonString, `${filename}.json`, 'application/json');

    // Export xlsx file
    // const workbook = XLSX.utils.book_new();
    // const jointsDataSheet = XLSX.utils.json_to_sheet(processJointsData(jointsData));
    // XLSX.utils.book_append_sheet(workbook, jointsDataSheet, "JointsData");

    // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // downloadFile(excelBuffer, `${filename}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
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
fileInput.addEventListener('change', (e) => {
    simLoading.classList.remove('hidden'); // 立即移除 hidden 類

    // 使用 requestAnimationFrame 確保渲染完成後再執行後續操作
    requestAnimationFrame(() => {
        handleFileSelect(e);
    });
});

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
                output.textContent = file.name;
                filenameInput.value = file.name.replace('.json', '');
                console.log('Successfully imported JSON data:', jsonData);
            } catch (error) {
                // Handle JSON parsing errors
                output.textContent = 'Error parsing JSON: ' + error.message;
                console.error('Error parsing JSON:', error);
            } finally {
                setTimeout(() => {
                    simLoading.classList.add('hidden');
                }, 10);
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

const figure = document.getElementById('figure');
const svg = document.getElementById('svgLayer');
const nodes = [
    { id: 0, x: 150, y: 50 },
    { id: 1, x: 158, y: 30 }, { id: 2, x: 165, y: 30 }, { id: 3, x: 172, y: 30 },
    { id: 4, x: 142, y: 30 }, { id: 5, x: 135, y: 30 }, { id: 6, x: 128, y: 30 },
    { id: 7, x: 185, y: 40 }, { id: 8, x: 115, y: 40 },
    { id: 9, x: 160, y: 70 }, { id: 10, x: 140, y: 70 },
    { id: 11, x: 200, y: 105 }, { id: 12, x: 100, y: 105 },
    { id: 13, x: 225, y: 130 }, { id: 14, x: 75, y: 130 },
    { id: 15, x: 250, y: 115 }, { id: 16, x: 50, y: 115 },
    { id: 17, x: 270, y: 117 }, { id: 18, x: 30, y: 117 },
    { id: 19, x: 263, y: 97 }, { id: 20, x: 37, y: 97 },
    { id: 21, x: 247, y: 102 }, { id: 22, x: 53, y: 102 },
    { id: 23, x: 185, y: 200 }, { id: 24, x: 115, y: 200 },
    { id: 25, x: 195, y: 290 }, { id: 26, x: 105, y: 290 },
    { id: 27, x: 185, y: 380 }, { id: 28, x: 115, y: 380 },
    { id: 29, x: 175, y: 400 }, { id: 30, x: 125, y: 400 },
    { id: 31, x: 220, y: 405 }, { id: 32, x: 80, y: 405 }
];
const connections = [
    [0, 2], [0, 5], [7, 2], [8, 5], [9, 10], [11, 12], [13, 11],
    [14, 12], [15, 13], [16, 14], [16, 20], [17, 15], [18, 16],
    [19, 17], [15, 19], [20, 18], [21, 15], [22, 16], [23, 11],
    [24, 12], [24, 23], [25, 23], [26, 24], [27, 25], [28, 26],
    [29, 27], [30, 28], [31, 29], [32, 30], [28, 32], [27, 31]
];
let selectedPoints = [];
let useExteriorAngle = false;
let selectedCoordinateLine = null;
let showCoordinateSystem = false;
let selectedButton = null;

// Initial draw of the dashed ellipse
drawDashedEllipse();

// Modify the CSS for the SVG layer to ensure it's always on top
svg.style.zIndex = '9999';

// Create nodes and connections
nodes.forEach(createNode);
connections.forEach(([startId, endId]) => {
    const start = nodes.find(n => n.id === startId);
    const end = nodes.find(n => n.id === endId);
    createLine(start, end);
});

function createNode(node) {
    const element = document.createElement('div');
    element.className = 'node';
    element.setAttribute('id', node.id);
    element.style.left = `${node.x - 5}px`;
    element.style.top = `${node.y - 5}px`;
    element.textContent = node.id;
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        selectNode(node, element);
    });
    figure.appendChild(element);
}

function createLine(start, end) {
    const line = document.createElement('div');
    line.className = 'line';
    const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    line.style.width = `${length}px`;
    line.style.left = `${start.x}px`;
    line.style.top = `${start.y}px`;
    line.style.transform = `rotate(${angle}rad)`;
    figure.appendChild(line);
}

function selectNode(node, element) {
    const index = selectedPoints.findIndex(p => p.id === node.id);
    if (index !== -1) {
        selectedPoints.splice(index, 1);
        element.classList.remove('selected');
    } else {
        if (selectedPoints.length >= 3) {
            const removedNode = selectedPoints.shift();
            document.querySelector(`.node:nth-child(${removedNode.id + 1})`).classList.remove('selected');
        }
        selectedPoints.push(node);
        element.classList.add('selected');
    }
    showCoordinateSystem = selectedPoints.length === 2;
    updateAngle();
}

function calculateAngle(p1, p2, p3) {
    const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
    const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    const v1Mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const v2Mag = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    const cosAngle = dotProduct / (v1Mag * v2Mag);
    const clampedCosAngle = Math.max(-1, Math.min(1, cosAngle));
    return Math.acos(clampedCosAngle);
}

function createSVGElement(type) {
    return document.createElementNS("http://www.w3.org/2000/svg", type);
}

function drawDashedEllipse() {
    const ellipse = createSVGElement('ellipse');
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
    const size = 50;
    const angles = [0, -Math.PI / 4, -Math.PI / 2, Math.PI / 2, Math.PI, 3 * Math.PI / 4];
    const labels = ['RH', 'IH', 'UV', 'DV', 'LH', 'OH'];

    // Create a map of virtual points
    const virtualPoints = {};
    labels.forEach((label, index) => {
        virtualPoints[label] = {
            x: x + size * Math.cos(angles[index]),
            y: y + size * Math.sin(angles[index]),
            id: label
        };
    });

    // Check if we need to use a virtual point
    if (selectedPoints.length === 3 && typeof selectedPoints[2].id === 'string') {
        const virtualLabel = selectedPoints[2].id;
        if (virtualPoints[virtualLabel]) {
            selectedPoints[2] = virtualPoints[virtualLabel];
        }
    }

    angles.forEach((angle, index) => {
        const line = createSVGElement('line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x + size * Math.cos(angle));
        line.setAttribute('y2', y + size * Math.sin(angle));
        line.setAttribute('stroke', 'green');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,5');
        line.setAttribute('data-label', labels[index]);
        line.style.transition = 'all 0.3s ease';

        const hitBox = createSVGElement('line');
        hitBox.setAttribute('x1', x);
        hitBox.setAttribute('y1', y);
        hitBox.setAttribute('x2', x + size * Math.cos(angle));
        hitBox.setAttribute('y2', y + size * Math.sin(angle));
        hitBox.setAttribute('stroke', 'transparent');
        hitBox.setAttribute('stroke-width', '10');

        const label = createSVGElement('text');
        label.setAttribute('x', x + (size + 10) * Math.cos(angle));
        label.setAttribute('y', y + (size + 10) * Math.sin(angle));
        label.setAttribute('fill', 'green');
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.textContent = labels[index];
        label.style.opacity = '1';

        hitBox.addEventListener('mouseover', () => {
            line.setAttribute('stroke', 'red');
            line.setAttribute('stroke-width', '2');
            // label.style.opacity = '1';
        });

        hitBox.addEventListener('mouseout', () => {
            if (selectedCoordinateLine !== line) {
                line.setAttribute('stroke', 'green');
                line.setAttribute('stroke-width', '2');
            }
            // label.style.opacity = '0';
        });

        hitBox.addEventListener('click', (e) => {
            e.stopPropagation();
            if (selectedCoordinateLine) {
                selectedCoordinateLine.setAttribute('stroke', 'black');
                selectedCoordinateLine.setAttribute('stroke-width', '1');
            }
            line.setAttribute('stroke', 'blue');
            line.setAttribute('stroke-width', '2');
            selectedCoordinateLine = line;

            const endX = parseFloat(line.getAttribute('x2'));
            const endY = parseFloat(line.getAttribute('y2'));
            const virtualPoint = { x: endX, y: endY, id: labels[index] };
            selectNode(virtualPoint, { classList: { add: () => { }, remove: () => { } } });
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
        const [p1, p2] = selectedPoints;
        const line = createSVGElement('line');
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
            selectedPoints.forEach(point => {
                if (typeof point.id === 'string') {
                    const coordinateLine = svg.querySelector(`line[data-label="${point.id}"]`);
                    if (coordinateLine) {
                        coordinateLine.setAttribute('stroke', 'blue');
                        coordinateLine.setAttribute('stroke-width', '2');
                    }
                }
            });
        }
    }

    if (selectedPoints.length === 3) {
        const [p1, p2, p3] = selectedPoints;
        const line2 = createSVGElement('line');
        line2.setAttribute('x1', p2.x);
        line2.setAttribute('y1', p2.y);
        line2.setAttribute('x2', p3.x);
        line2.setAttribute('y2', p3.y);
        line2.setAttribute('stroke', 'blue');
        line2.setAttribute('stroke-width', '6');
        svg.appendChild(line2);

        const interiorAngle = calculateAngle(p1, p2, p3);
        const exteriorAngle = 2 * Math.PI - interiorAngle;
        drawAngle(p1, p2, p3, interiorAngle, 'red', false);
        drawAngle(p1, p2, p3, exteriorAngle, 'blue', true);
    }
}

function drawAngle(p1, p2, p3, angle, color, isExteriorAngle) {
    if (isExteriorAngle && !useExteriorAngle) return;
    if (!isExteriorAngle && useExteriorAngle) return;

    const radius = 30;
    const startAngle = Math.atan2(p1.y - p2.y, p1.x - p2.x);
    const endAngle = Math.atan2(p3.y - p2.y, p3.x - p2.x);

    const start = {
        x: p2.x + radius * Math.cos(startAngle),
        y: p2.y + radius * Math.sin(startAngle)
    };
    const end = {
        x: p2.x + radius * Math.cos(endAngle),
        y: p2.y + radius * Math.sin(endAngle)
    };

    let sweepFlag = 1;
    if ((endAngle - startAngle + 2 * Math.PI) % (2 * Math.PI) > Math.PI) {
        sweepFlag = isExteriorAngle ? 1 : 0;
    } else {
        sweepFlag = isExteriorAngle ? 0 : 1;
    }

    const largeArcFlag = angle > Math.PI ? 1 : 0;
    const path = createSVGElement('path');
    const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y} L ${p2.x} ${p2.y} Z`;
    path.setAttribute('d', d);
    path.setAttribute('fill', `rgba(${color === 'red' ? '255,0,0' : '0,0,255'}, 0.2)`);
    path.setAttribute('stroke', color);

    path.addEventListener('click', (e) => {
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
const savedAngles = Array(6).fill(null);
for (let i = 0; i < 6; i++) {
    const button = document.querySelectorAll('.angleCard');
    button[i].addEventListener('click', (e) => {
        e.stopPropagation();
        if (button[i].classList.contains('selected')) {
            button[i].classList.remove('selected');
            // showAllAngle();
        }
        else
            selectAngleButton(i);
    });
}

// Create update button
const updateButton = document.createElement('button');
updateButton.textContent = 'Update';
updateButton.style.position = 'absolute';
updateButton.style.right = '10px';
updateButton.style.bottom = '10px';
updateButton.addEventListener('click', (e) => {
    e.stopPropagation();
    saveAngle();
    saveMappingData();
    updateButton.textContent = 'saved';
    saveLocalData();
});
figure.appendChild(updateButton);

function loadAngleFromButtonContent(content) {
    // Parse the content and load the angle
    const pointIds = content.split(',').map(id => id.trim());
    selectedPoints = pointIds.map(id => {
        if (['RH', 'IH', 'UV', 'DV', 'LH', 'OH'].includes(id)) {
            // For coordinate lines
            return { id: id, x: 0, y: 0 }; // Coordinates will be set in updateAngle
        } else {
            return nodes.find(n => n.id === parseInt(id));
        }
    });
    updateAngle();
    highlightSelectedNodes();
}

// Define angleData at the top level of your script
let angleData = Array(6).fill(null);

function saveAngle() {
    if (selectedPoints.length == 0) {
        updateButtonLabel(selectedButton, 'none');
        groups[selectedGroup].data[`J${selectedButton + 1}`] = 'none';
        return;
    } else if (selectedPoints.length !== 3) {
        alert('Please select three points or coordinate positions to save an angle.');
        return;
    }
    if (selectedButton === null) {
        alert('Please select an angle button to save the angle.');
        return;
    }
    const newAngleData = selectedPoints.map(p => {
        if (typeof p.id === 'string') {
            // For coordinate lines, store the line details
            return { id: p.id, x: p.x, y: p.y };
        }
        return p.id;
    });

    const angleDataString = newAngleData.map(p => typeof p === 'object' ? p.id : p).join(',');

    if (groups.length > 0 && selectedGroup !== null) {
        // If groups exist and one is selected, save to the selected group
        groups[selectedGroup].data[`J${selectedButton + 1}`].angles = angleDataString;
    } else {
        // If no groups exist or no group is selected, save to angleData
        angleData[selectedButton] = newAngleData;
    }

    updateButtonLabel(selectedButton, angleDataString);
}

function updateButtonLabel(index, angleData) {
    const button = document.querySelector(`.angleCard:nth-of-type(${index + 1})`);
    if (angleData === 'none') {
        button.querySelector('.angleCard-content').textContent = 'none';
    } else if (typeof angleData === 'string') {
        button.querySelector('.angleCard-content').textContent = angleData;
    } else if (Array.isArray(angleData)) {
        button.querySelector('.angleCard-content').textContent = angleData.map(p => typeof p === 'object' ? p.id : p).join(',');
    } else {
        console.error('Unexpected angleData format:', angleData);
        button.querySelector('.angleCard-content').textContent = 'Error';
    }
}

function selectAngleButton(index) {
    updateButton.textContent = 'update';
    if (selectedButton !== null) {
        const prevButton = document.querySelector(`.angleCard:nth-of-type(${selectedButton + 1})`);
        prevButton.classList.remove('selected');
    }
    selectedButton = index;
    const button = document.querySelector(`.angleCard:nth-of-type(${index + 1})`);
    button.classList.add('selected');

    let currentAngleData;
    if (groups.length > 0 && selectedGroup !== null) {
        // If groups exist and one is selected, load from the selected group
        currentAngleData = groups[selectedGroup].data[`J${index + 1}`].angles;
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
        const buttonContent = button.querySelector('.angleCard-content').textContent.trim();
        if (buttonContent !== 'none') {
            loadAngleFromButtonContent(buttonContent);
        } else {
            clearFigure(); // Clear the figure if content is 'none'
        }
    }

    updateMappingData(groups[selectedGroup].data[`J${index + 1}`].mappingData);
}

function loadAngle(angleData) {
    selectedPoints = angleData.map(point => {
        if (typeof point === 'object') {
            // For coordinate lines
            return point;
        } else {
            return nodes.find(n => n.id === point);
        }
    });
    updateAngle();
    highlightSelectedNodes();
}

function highlightSelectedNodes() {
    // Remove highlight from all nodes
    document.querySelectorAll('.node').forEach(node => {
        node.classList.remove('selected');
    });
    // Highlight selected nodes
    selectedPoints.forEach(point => {
        if (typeof point.id === 'number') {
            document.getElementById(point.id).classList.add('selected');
        }
    });
}

// Add click event to figure to deselect all nodes
figure.addEventListener('click', () => {
    clearFigure();
});

function clearFigure() {
    document.querySelectorAll('.node').forEach(node => {
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

document.addEventListener('DOMContentLoaded', () => {
    initGroups();
});

// Define default values for each axis
const defaultAxisValues = {
    J1: { PL: -90, PR: 90, AL: -110, AR: 110, PHL: -90, PHR: 90, AHL: -110, AHR: 110 },
    J2: { PL: 0, PR: 60, AL: -50, AR: 0, PHL: 0, PHR: 60, AHL: -50, AHR: 0 },
    J3: { PL: 0, PR: 180, AL: -80, AR: 90, PHL: 0, PHR: 180, AHL: -80, AHR: 90 },
    J4: { PL: 0, PR: 0, AL: 0, AR: 0, PHL: 0, PHR: 0, AHL: 0, AHR: 0 }, // J4 is always 0
    J5: { PL: 90, PR: 180, AL: -90, AR: 0, PHL: 90, PHR: 180, AHL: -90, AHR: 0 },
    J6: { PL: 0, PR: 0, AL: 0, AR: 0, PHL: 0, PHR: 0, AHL: 0, AHR: 0 }  // J6 is always 0
};

const initGroups = () => {
    const defaultGroup = { name: 'default', data: {} };
    const angleCards = document.querySelectorAll('.angleCard.AC');
    angleCards.forEach((card, index) => {
        const content = card.querySelector('.angleCard-content').textContent.trim();
        defaultGroup.data[`J${index + 1}`] = {
            angles: content,
            mappingData: { ...defaultAxisValues[`J${index + 1}`] }
        };
    });
    groups.push(defaultGroup);
    updateGroups();
}

function addGroup() {
    let name = document.getElementById('newGroupName').value.trim();
    if (name === '') {
        name = 'default';
    }

    const groupData = {};
    for (let i = 1; i <= 6; i++) {
        const cardContent = document.querySelector(`.angleCard:nth-of-type(${i}) .angleCard-content`).textContent;
        groupData[`J${i}`] = {
            angles: cardContent,
            mappingData: { ...defaultAxisValues.posture, ...defaultAxisValues.arm }
        };
    }

    groups.push({ name, data: groupData });
    updateGroups();
    document.getElementById('newGroupName').value = '';
}

window.updateGroups = function () {
    const groupsContainer = document.getElementById('groups-container');
    groupsContainer.innerHTML = '';
    groups.forEach((group, index) => {
        const card = document.createElement('div');
        card.className = 'angleCard group-card';
        card.innerHTML = `
        <div class="angleCard-label">G${index + 1}</div>
        <div class="angleCard-content">${group.name}</div>
        ${index !== 0 ? '<span class="delete-group">X</span>' : ''}
      `;
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-group')) {
                selectGroup(index);
            }
        });

        if (index !== 0) {
            const deleteBtn = card.querySelector('.delete-group');
            let clickTimer = null;
            let clickCount = 0;

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clickCount++;

                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        if (clickCount === 1) {
                            // Single click
                            if (confirm(`確定要刪除群組 "${group.name}" 嗎？`)) {
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
}

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

window.selectGroup = (index) => {
    if (selectedGroup !== null) {
        const prevGroupCard = document.querySelector(`#groups-container .angleCard:nth-child(${selectedGroup + 1})`);
        prevGroupCard.classList.remove('selected');
    }
    selectedGroup = index;
    const group = groups[index];
    const groupCard = document.querySelector(`#groups-container .angleCard:nth-child(${index + 1})`);
    groupCard.classList.add('selected');
    groupNameSelected = group.name;

    if (group && group.data) {
        for (let i = 1; i <= 6; i++) {
            const card = document.querySelector(`.angleCard:nth-of-type(${i})`);
            const content = group.data[`J${i}`].angles || 'none';
            card.querySelector('.angleCard-content').textContent = content;
        }
        // Update mappingData for the selected joint (assuming we're working with J1)
        updateMappingData(group.data.J1.mappingData);
    }
    selectAngleButton(0);
}

window.updateMappingData = (data) => {
    if (!data) return;

    postureSlider.setBounds(data.PL, data.PR);
    postureSlider.setValues([data.PHL, data.PHR]);

    armSlider.setBounds(data.AL, data.AR);
    armSlider.setValues([data.AHL, data.AHR]);
}

window.saveMappingData = () => {
    if (selectedGroup === null || !groups[selectedGroup]) return;
    
    const currentJoint = `J${selectedButton + 1}`;
    const currentData = groups[selectedGroup].data[currentJoint].mappingData;

    currentData.PL = postureSlider.leftBound;
    currentData.PR = postureSlider.rightBound;
    currentData.AL = armSlider.leftBound;
    currentData.AR = armSlider.rightBound;
    currentData.PHL = postureSlider.output[0];
    currentData.PHR = postureSlider.output[1];
    currentData.AHL = armSlider.output[0];
    currentData.AHR = armSlider.output[1];

    console.log(`Mapping data saved for ${currentJoint} in group ${selectedGroup}`);
}

window.resetMappingData = () => {
    if (selectedGroup === null || !groups[selectedGroup]) return;

    const currentJoint = `J${selectedButton + 1}`;
    const currentData = groups[selectedGroup].data[currentJoint].mappingData;

    Object.assign(currentData, defaultAxisValues.posture, defaultAxisValues.arm);

    updateSliders(currentData);
    console.log(`Mapping data reset to default for ${currentJoint} in group ${selectedGroup}`);
}

function enableGroupNameEdit(card, groupIndex) {
    const contentDiv = card.querySelector('.angleCard-content');

    card.addEventListener('dblclick', (e) => {
        if (e.target === contentDiv) {
            const currentName = contentDiv.textContent;
            const input = document.createElement('input');
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
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    finishEdit();
                }
            });

            function finishEdit() {
                const newName = input.value.trim() || 'default';
                groups[groupIndex].name = newName;
                contentDiv.textContent = newName;
                updateGroups();
            }
        }
    });
}

class NumericRangeSlider {
    constructor(container, options) {
        this.container = document.getElementById(container);
        this.leftInput = this.container.previousElementSibling;
        this.rightInput = this.container.nextElementSibling;
        this.leftBound = options.leftBound;
        this.rightBound = options.rightBound;
        this.values = options.values || [this.leftBound, this.rightBound];
        this.step = options.step || 1;
        this.onChange = options.onChange || (() => { });
        this.dragging = null;
        this.output = options.values || [this.leftBound, this.rightBound];

        this.init();
    }

    init() {
        this.range = document.createElement('div');
        this.range.className = 'slider-range';
        this.container.appendChild(this.range);

        this.handles = this.values.map((value, index) => {
            const handle = document.createElement('div');
            handle.className = 'slider-handle';
            handle.setAttribute('data-index', index);

            const label = document.createElement('div');
            label.className = 'slider-label';

            handle.appendChild(label);
            this.container.appendChild(handle);

            handle.addEventListener('mousedown', this.startDragging.bind(this));
            return handle;
        });

        this.leftInput.addEventListener('change', this.updateFromInput.bind(this));
        this.rightInput.addEventListener('change', this.updateFromInput.bind(this));

        this.updateHandles();
    }

    startDragging(e) {
        e.preventDefault();
        this.dragging = parseInt(e.target.getAttribute('data-index'));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));
    }

    stopDragging() {
        this.dragging = null;
        document.removeEventListener('mousemove', this.drag.bind(this));
        document.removeEventListener('mouseup', this.stopDragging.bind(this));
    }

    drag(e) {
        if (this.dragging === null) return;

        const rect = this.container.getBoundingClientRect();
        let position = (e.clientX - rect.left) / rect.width;
        position = Math.max(0, Math.min(1, position));

        const value = this.leftBound + (this.rightBound - this.leftBound) * position;
        const snappedValue = Math.round(value / this.step) * this.step;

        if (this.leftBound <= this.rightBound)
            this.values[this.dragging] = Math.max(this.leftBound, Math.min(this.rightBound, snappedValue));
        else
            this.values[this.dragging] = Math.max(this.rightBound, Math.min(this.leftBound, snappedValue));
        this.updateHandles();
        this.onChange(this.values);
    }

    updateFromInput() {
        const leftOrigin = this.leftBound;
        const rightOrigin = this.rightBound;
        this.leftBound = parseFloat(this.leftInput.value);
        this.rightBound = parseFloat(this.rightInput.value);
        if ((rightOrigin - leftOrigin) * (this.rightBound - this.leftBound) < 0)
            this.values = [this.leftBound, this.rightBound];
        else {
            let minor, major;
            if (this.leftBound <= this.rightBound) {
                minor = this.leftBound;
                major = this.rightBound;
            } else {
                minor = this.rightBound;
                major = this.leftBound
            }
            if (this.values[0] < minor)
                this.values[0] = minor;
            if (this.values[0] > major)
                this.values[0] = major;
            if (this.values[1] < minor)
                this.values[1] = minor;
            if (this.values[1] > major)
                this.values[1] = major;
        }
        this.updateHandles();
        this.onChange(this.values);
    }

    updateHandles() {
        const leftPosition = (this.values[0] - this.leftBound) / (this.rightBound - this.leftBound);
        const rightPosition = (this.values[1] - this.leftBound) / (this.rightBound - this.leftBound);

        this.handles.forEach((handle, index) => {
            const position = index === 0 ? leftPosition : rightPosition;
            handle.style.left = `${position * 100}%`;
            handle.querySelector('.slider-label').textContent = this.values[index];
        });

        this.range.style.left = `${Math.min(leftPosition, rightPosition) * 100}%`;
        this.range.style.right = `${(1 - Math.max(leftPosition, rightPosition)) * 100}%`;
        
        if (this.values[0] > this.values[1] && this.leftBound <= this.rightBound ||
            this.values[0] <= this.values[1] && this.leftBound > this.rightBound)
            this.output = [this.values[1], this.values[0]];
        else
            this.output = this.values;
        // console.log(this.output);
    }

    setBounds(left, right) {
        this.leftBound = left;
        this.rightBound = right;
        this.leftInput.value = left;
        this.rightInput.value = right;
        this.updateHandles();
    }

    setValues(values) {
        this.values = values.map(value => Math.max(Math.min(this.leftBound, this.rightBound), Math.min(Math.max(this.leftBound, this.rightBound), value)));
        this.updateHandles();
    }
}

// Initialize sliders
const postureSlider = new NumericRangeSlider('postureSlider', {
    leftBound: 0,
    rightBound: 360,
    values: [0, 360],
    step: 1
});

const armSlider = new NumericRangeSlider('armSlider', {
    leftBound: 0,
    rightBound: 360,
    values: [0, 360],
    step: 1
});
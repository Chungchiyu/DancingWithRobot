/* globals */
import * as THREE from 'three';
import { registerDragEvents } from './dragAndDrop.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import URDFManipulator from '../../src/urdf-manipulator-element.js';
import URDFCollisionViewer from '../../src/urdf-collisionViewer-element.js';

import Sortable, { Swap } from 'sortablejs';

Sortable.mount(new Swap());

customElements.define('urdf-viewer', URDFManipulator);

window.viewer = document.querySelector('urdf-viewer');
// viewer.toggleCollisionVisualization(true);

// Cache DOM elements
const elements = {
    limitsToggle: document.getElementById('ignore-joint-limits'),
    collisionToggle: document.getElementById('collision-toggle'),
    radiansToggle: document.getElementById('radians-toggle'),
    upSelect: document.getElementById('up-select'),
    sliderList: document.querySelector('#controls ul'),
    controlsel: document.getElementById('controls'),
    controlsToggle: document.getElementById('toggle-controls'),
    animToggle: document.getElementById('do-animate'),
    isLoop: document.getElementById('is-loop'),
    cardContainer: document.getElementById('poseCard-container'),
    progressContainer: document.getElementById('progress-container'),
    copyBtn: document.querySelector(".copyBtn"),
    refreshBtn: document.querySelector('.refreshBtn'),
    clearBtn: document.querySelector(".clearBtn"),
    homeBtn: document.querySelector('.homeBtn'),
    fixCamBtn: document.querySelector('.fixCamBtn'),
    waitBtn: document.querySelector('.waitBtn'),
    vidTime: document.getElementById('vidTime')
};

// Constants
const DEG2RAD = Math.PI / 180;
const RAD2DEG = 1 / DEG2RAD;

// State management
const state = {
    loop: false,
    sliders: {},
    jointsDataSet: [],
    startTime: 0,
    originalNoAutoRecenter: null
};

// Helper functions
const setColor = (color) => {
    document.body.style.backgroundColor = color;
    viewer.highlightColor = '#' + (new THREE.Color(0xE05749)).lerp(new THREE.Color(color), 0.35).getHexString();
};

const capture = () => {
    viewer.renderer.render(viewer.scene, viewer.camera);
    return viewer.renderer.domElement.toDataURL();
};

// Event listeners
elements.isLoop.addEventListener('click', () => {
    elements.isLoop.classList.toggle('checked');
    state.loop = elements.isLoop.classList.contains('checked');
});

elements.controlsToggle.addEventListener('click', () => elements.controlsel.classList.toggle('hidden'));

viewer.addEventListener('urdf-change', () => {
    Object.values(state.sliders).forEach(sl => sl.remove());
    state.sliders = {};
});

viewer.addEventListener('ignore-limits-change', () => {
    Object.values(state.sliders).forEach(sl => sl.update());
});

viewer.addEventListener('angle-change', e => {
    if (state.sliders[e.detail]) state.sliders[e.detail].update();
});

viewer.addEventListener('joint-mouseover', e => {
    const j = document.querySelector(`li[joint-name="${e.detail}"]`);
    if (j) j.setAttribute('robot-hovered', true);
});

viewer.addEventListener('joint-mouseout', e => {
    const j = document.querySelector(`li[joint-name="${e.detail}"]`);
    if (j) j.removeAttribute('robot-hovered');
});

viewer.addEventListener('manipulate-start', e => {
    const j = document.querySelector(`li[joint-name="${e.detail}"]`);
    if (j) {
        j.scrollIntoView({ block: 'nearest' });
        window.scrollTo(0, 0);
    }

    state.originalNoAutoRecenter = viewer.noAutoRecenter;
    viewer.noAutoRecenter = true;
});

viewer.addEventListener('manipulate-end', () => {
    viewer.noAutoRecenter = state.originalNoAutoRecenter;
});

viewer.addEventListener('urdf-processed', () => {
    const r = viewer.robot;
    Object.keys(r.joints)
        .sort((a, b) => {
            const da = a.split(/[^\d]+/g).filter(v => !!v).pop();
            const db = b.split(/[^\d]+/g).filter(v => !!v).pop();

            if (da !== undefined && db !== undefined) {
                const delta = parseFloat(da) - parseFloat(db);
                if (delta !== 0) return delta;
            }

            if (a > b) return 1;
            if (b > a) return -1;
            return 0;
        })
        .map(key => r.joints[key])
        .forEach(joint => {
            const li = document.createElement('li');
            li.innerHTML = `
        <span title="${joint.name}">${joint.name}</span>
        <input type="range" value="0" step="0.0001"/>
        <input type="number" step="0.1" />
      `;
            li.setAttribute('joint-type', joint.jointType);
            li.setAttribute('joint-name', joint.name);

            elements.sliderList.appendChild(li);

            const slider = li.querySelector('input[type="range"]');
            const input = li.querySelector('input[type="number"]');
            li.update = () => {
                const degMultiplier = RAD2DEG;
                let angle = joint.angle;

                if (joint.jointType === 'revolute' || joint.jointType === 'continuous') {
                    angle *= degMultiplier;
                }

                if (Math.abs(angle) > 1) {
                    angle = angle.toFixed(1);
                } else {
                    angle = angle.toPrecision(2);
                }

                input.value = parseFloat(angle);
                slider.value = joint.angle;

                if (viewer.ignoreLimits || joint.jointType === 'continuous') {
                    slider.min = -6.28;
                    slider.max = 6.28;
                    input.min = -6.28 * degMultiplier;
                    input.max = 6.28 * degMultiplier;
                } else {
                    slider.min = joint.limit.lower;
                    slider.max = joint.limit.upper;
                    input.min = joint.limit.lower * degMultiplier;
                    input.max = joint.limit.upper * degMultiplier;
                }
            };

            if (!['continuous', 'prismatic', 'revolute'].includes(joint.jointType)) {
                li.update = () => { };
                input.remove();
                slider.remove();
            }

            slider.addEventListener('input', () => {
                viewer.setJointValue(joint.name, slider.value);
                elements.animToggle.classList.remove('checked');
                li.update();
            });

            input.addEventListener('change', () => {
                viewer.setJointValue(joint.name, input.value * DEG2RAD);
                elements.animToggle.classList.remove('checked');
                li.update();
            });

            li.update();
            state.sliders[joint.name] = li;
        });
});

window.vidTimeProxy = new Proxy({ value: vidTime }, {
    set(target, prop, newValue) {
        if (prop === 'value') {
        console.log(`vidTime changed to: ${newValue}`);
        video.currentTime = newValue;
        }
        target[prop] = newValue;
        return true;
    }
});

// Animation functions
const updateArmPosition = () => {
    const currentTime = (Date.now() - state.startTime) / 1e3;

    console.log(currentTime);

    for (let i = 0; i < window.jointsData.length - 1; i++) {
        if (currentTime >= window.jointsData[i].time && currentTime < window.jointsData[i + 1].time) {
            highlightCard(elements.cardContainer.childNodes[i], false);
            const t1 = window.jointsData[i].time;
            const t2 = window.jointsData[i + 1].time;
            const a1 = window.jointsData[i].angles;
            const a2 = window.jointsData[i + 1].angles;

            const interpolatedAngles = {};
            for (const jointName in a1) {
                if (a2.hasOwnProperty(jointName)) {
                    const angle1 = a1[jointName];
                    const angle2 = a2[jointName];
                    interpolatedAngles[jointName] = angle1 + (angle2 - angle1) * (currentTime - t1) / (t2 - t1);
                }
            }

            for (const jointName in interpolatedAngles) {
                const joint_name = jointName.replace('J', 'joint_');
                viewer.setJointValue(joint_name, interpolatedAngles[jointName] * DEG2RAD);
            }

            break;
        }
    }

    if (window.jointsData.length > 0) {
        if (currentTime > window.jointsData[window.jointsData.length - 1].time) {
            highlightCard(elements.cardContainer.childNodes[window.jointsData.length - 1], false);
            if (state.loop) {
                vidTimeProxy.value = window.jointsData[0].time;
                state.startTime = Date.now() - vidTimeProxy.value * 1e3;
            } else {
                elements.animToggle.classList.toggle('checked');
                if (!window.isWebcamActive) 
                    video.pause();
            }
        }
    }
};

const updateLoop = () => {
    if (elements.animToggle.classList.contains('checked')) {
        updateArmPosition();
        
    }
    requestAnimationFrame(updateLoop);
    // viewer.update();
};

// Initialize
document.addEventListener('WebComponentsReady', () => {
    viewer.loadMeshFunc = (path, manager, done) => {
        const ext = path.split(/\./g).pop().toLowerCase();
        switch (ext) {
            case 'gltf':
            case 'glb':
                new GLTFLoader(manager).load(
                    path,
                    result => done(result.scene),
                    null,
                    err => done(null, err),
                );
                break;
            case 'obj':
                new OBJLoader(manager).load(
                    path,
                    result => done(result),
                    null,
                    err => done(null, err),
                );
                break;
            case 'dae':
                new ColladaLoader(manager).load(
                    path,
                    result => done(result.scene),
                    null,
                    err => done(null, err),
                );
                break;
            case 'stl':
                new STLLoader(manager).load(
                    path,
                    result => {
                        const material = new THREE.MeshPhongMaterial();
                        const mesh = new THREE.Mesh(result, material);
                        done(mesh);
                    },
                    null,
                    err => done(null, err),
                );
                break;
        }
    };

    document.querySelector('li[urdf]').dispatchEvent(new Event('click'));

    if (/javascript\/example\/bundle/i.test(window.location)) {
        viewer.package = '../../../urdf';
    }

    elements.animToggle.addEventListener('click', () => {
        elements.animToggle.classList.toggle('checked');
        if (elements.animToggle.classList.contains('checked')) {
            if (!window.isWebcamActive) {
                video.play();
                vidTimeProxy.value = video.currentTime;
            }
            state.startTime = Date.now() - vidTimeProxy.value * 1e3;
            window.linkRobot.classList.remove('checked');
        } else {
            if (!window.isWebcamActive)
                video.pause();
        }
    });

    viewer.addEventListener('manipulate-start', () => elements.animToggle.classList.remove('checked'));
    viewer.addEventListener('urdf-processed', updateArmPosition);
    updateLoop();
    viewer.camera.position.set(0, 1, -2.5);
    viewer.noAutoRecenter = true;
});

// Update card content function
function updateCardContent(card, data, index, updateImg = true) {
    // console.log(data);
    card.querySelector('.angles').innerHTML =
        Object.entries(data.angles)
            .map(([joint, angle]) => `<div>${angle == null ? 'NAN' : angle.toFixed(1)}</div>`)
            .join('');
    if (updateImg)
        card.querySelector('img').src = captureRobotImage(data.angles);
    card.querySelector('.number').textContent = index + 1;
    card.querySelector('#group-card').textContent = data.group;
    card.querySelector('input').value = data.time;
}

const captureRobotImage = (angles) => {
    Object.entries(angles).forEach(([joint, angle]) => {
        const joint_name = joint.replace('J', 'joint_');
        viewer.setJointValue(joint_name, angle * DEG2RAD);
    });
    return capture();
};

window.updateMarkers = () => {
    // Remove all existing markers
    const existingMarkers = progressContainer.querySelectorAll('.progress-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers based on the current order of cards
    const cards = Array.from(elements.cardContainer.children);
    cards.forEach((card, index) => {
        const time = parseFloat(card.querySelector('input').value);
        addMarkerToProgressBar(time);
    });
}

// Function to update joints data
function updateJointsData(index, updates) {
    if (index < 0 || index >= window.jointsData.length) {
        console.error('Invalid index');
        return;
    }
    // console.log("index",index);
    let updatedData = { ...window.jointsData[index], ...updates };

    // Remove old data from the array
    window.jointsData.splice(index, 1);


    // Find new insertion position
    let insertIndex = window.jointsData.findIndex(data => data.time > updatedData.time);
    if (insertIndex === -1) {
        insertIndex = window.jointsData.length;
    }

    // Insert updated data
    window.jointsData.splice(insertIndex, 0, updatedData);

    // Update all card contents
    // updateAllCardContents();
    // Simulate continuous mouse drag
    swapCardsWithAnimation(index, insertIndex);
    // console.log(index, insertIndex)
    updateMarkers();
    saveLocalData();
}

function swapCardsWithAnimation(oldIndex, newIndex) {
    const cards = elements.cardContainer.children;
    const card = cards[oldIndex];

    // If the card position hasn't changed, no animation is needed
    if (oldIndex === newIndex) {
        updateCardContent(card, window.jointsData[oldIndex], oldIndex, false);
        return;
    }

    // Set initial position
    card.style.transition = 'none';
    card.style.transform = 'translateY(0)';

    // Force reflow
    card.offsetHeight;

    // Add transition effect
    card.style.transition = 'transform 0.15s ease-in-out';

    // Calculate displacement distance
    const displacement = (newIndex - oldIndex) * card.offsetHeight;
    card.style.transform = `translateY(${displacement}px)`;

    console.log(oldIndex, newIndex);

    // Reorder DOM after animation ends
    setTimeout(() => {
        card.style.transition = 'none';
        card.style.transform = '';

        // Insert the card at the new position
        if (newIndex >= elements.cardContainer.children.length-1) {
            elements.cardContainer.appendChild(card);
        } else {
            elements.cardContainer.insertBefore(card,cards[newIndex]);
        }

        // Update all card contents
        updateAllCardContents();
        highlightCard(cards[newIndex]);
    }, 150); // Same as transition time
}

// Function to update all card contents
function updateAllCardContents() {
    const cards = Array.from(elements.cardContainer.children);
    cards.forEach((card, index) => {
        updateCardContent(card, window.jointsData[index], index, false);
    });
}

const addFrameCard = (index) => {
    const cardData = window.jointsData[index];
    const card = document.createElement('div');
    card.className = 'ui-element';
    card.innerHTML = `
        <div class="angles"></div>
        <div class="icon">
            <img alt="Icon">
        </div>
        <div class="duration">
            <div class="number"></div>
            <div id="group-card"></div>
            <input value="">
            <button class="duration-btn">s</button>
        </div>
        <button class="close">X</button>
    `;

    updateCardContent(card, cardData, index);

    card.querySelector('.close').addEventListener('click', (event) => {
        event.stopPropagation();
        const currentIndex = Array.from(elements.cardContainer.children).indexOf(card);
        if (card.classList.contains('highlighted')) {
            if (currentIndex != 0)
                highlightCard(card.previousElementSibling);
            else if (elements.cardContainer.childNodes.length > 1)
                highlightCard(card.nextElementSibling);
        }
        window.jointsData.splice(currentIndex, 1);
        elements.cardContainer.removeChild(card);
        const marker = elements.progressContainer.querySelectorAll('.progress-marker');
        elements.progressContainer.removeChild(marker[currentIndex]);

        updateCardNumbers();
        // console.log(window.jointsData);
    });

    card.querySelector('input').addEventListener('click', (event) => {
        event.target.select();
    });

    card.querySelector('input').addEventListener('blur', (event) => {
        const newTime = parseFloat(event.target.value);
        const currentIndex = Array.from(elements.cardContainer.children).indexOf(card);
        vidTimeProxy.value = newTime;
        updateJointsData(currentIndex, { time: newTime });
    });
    

    card.querySelector('input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // const newTime = parseFloat(event.target.value);
            // const currentIndex = Array.from(elements.cardContainer.children).indexOf(card);
            // updateJointsData(currentIndex, { time: newTime });
            event.target.blur();    // use blur to ativate time change, if using above lines will trigger double blur
        }
    });

    card.querySelector('.duration-btn').addEventListener('click', function (event) {
        event.stopPropagation();
        this.textContent = this.textContent === 's' ? 'deg/s' : 's';
    });

    card.addEventListener('click', () => {
        highlightCard(card);
    });

    let insertIndex = findInsertIndex(cardData.time);
    if (insertIndex === elements.cardContainer.children.length) {
        elements.cardContainer.appendChild(card);
    } else {
        elements.cardContainer.insertBefore(card, elements.cardContainer.children[insertIndex]);
    }

    updateCardNumbers();
    highlightCard(card, false);
    updateMarkers();
    saveLocalData();

    return card;
};

const findInsertIndex = (time) => {
    return Array.from(elements.cardContainer.children)
        .findIndex(card => parseFloat(card.querySelector('input').value) > time);
};

const updateCardNumbers = () => {
    elements.cardContainer.childNodes.forEach((card, index) => {
        if (card.querySelector('.number')) {
            card.querySelector('.number').textContent = index + 1;
        }
    });
};

const highlightCard = (card, updateVidTime = true) => {
    const index = Array.from(card.parentNode.children).indexOf(card);
    const cardData = window.jointsData[index];
    if (updateVidTime)
        vidTimeProxy.value = parseFloat(card.querySelector('input').value);
    Object.entries(cardData.angles).forEach(([joint, angle]) => {
        const joint_name = joint.replace('J', 'joint_');
        viewer.setJointValue(joint_name, angle * DEG2RAD);
    });
    elements.cardContainer.childNodes.forEach(child => child.classList.remove('highlighted'));
    card.classList.add('highlighted');
};

elements.copyBtn.addEventListener('click', () => {
    let jointAngles = Object.fromEntries(
        Object.keys(viewer.robot.joints)
            .slice(0, 6)
            .map((key, index) => {
                let angleInDegrees = viewer.robot.joints[key].angle * RAD2DEG;
                let formattedAngle = angleInDegrees.toFixed(1);
                return [`J${index + 1}`, formattedAngle.endsWith('.0') ? parseInt(angleInDegrees) : parseFloat(formattedAngle)];
            })
    );

    const newCardData = {
        time: Math.round(vidTimeProxy.value * 100) / 100,
        group: window.groupNameSelected,
        angles: jointAngles
    };

    let inserted = false;
    let i = 0;
    for (; i < window.jointsData.length; i++) {
        if (newCardData.time < window.jointsData[i].time) {
            window.jointsData.splice(i, 0, newCardData);
            inserted = true;
            break;
        }
    }

    if (!inserted) {
        window.jointsData.push(newCardData);
    }

    addMarkerToProgressBar(newCardData.time);
    addFrameCard(i);
});

elements.refreshBtn.addEventListener('click', () => {
    updateCardNumbers();
    const card = elements.cardContainer.querySelector('.highlighted');
    const index = Array.from(card.parentNode.children).indexOf(card);

    let jointAngles = Object.fromEntries(
        Object.keys(viewer.robot.joints)
            .slice(0, 6)
            .map((key, index) => {
                let angleInDegrees = viewer.robot.joints[key].angle * RAD2DEG;
                let formattedAngle = angleInDegrees.toFixed(1);
                return [`J${index + 1}`, formattedAngle.endsWith('.0') ? parseInt(angleInDegrees) : parseFloat(formattedAngle)];
            })
    );

    const time = card.querySelector('input').value;
    const group = card.querySelector('#group-card').textContent;
    updateCardContent(card, { time: time, angles: jointAngles, group: group }, index);
    window.jointsData[index].angles = jointAngles;
});

// Initialize Sortable with swap option
document.addEventListener('DOMContentLoaded', () => {
    new Sortable(elements.cardContainer, {
        animation: 150, // Animation time (ms)
        filter: 'input, .close, .duration-btn',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        preventOnFilter: false,
        onEnd: (evt) => {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            const item = window.jointsData.splice(oldIndex, 1)[0];
            window.jointsData.splice(newIndex, 0, item);

            // console.log(window.jointsData);
        }
    });
});

elements.clearBtn.addEventListener('click', () => {
    clearALLCards();
});

window.clearALLCards = () => {
    elements.cardContainer.innerHTML = "";
    elements.animToggle.classList.remove('checked');
    elements.progressContainer.querySelectorAll('.progress-marker').forEach(mark => mark.remove());
    window.jointsData = [];
    window.selectGroup(0);
    window.groups.splice(1, window.groups.length - 1);
    window.updateGroups();
}

elements.homeBtn.addEventListener('click', () => {
    var joint = new Array(6).fill(0);
    for (let angle in joint)
        viewer.setJointValue(`joint_${parseInt(angle) + 1}`, joint[angle]);
    viewer.camera.position.set(0, 1, -2.5);
});

// Start the animation loop
updateLoop();

// Update URDF options list
const updateList = () => {
    document.querySelectorAll('#urdf-options li[urdf]').forEach(el => {
        el.addEventListener('click', e => {
            const urdf = e.target.getAttribute('urdf');
            const color = e.target.getAttribute('color');

            viewer.up = '+Z';
            elements.upSelect.value = viewer.up;
            viewer.urdf = urdf;
            setColor(color);
        });
    });
};

updateList();

// Make window.addFrameCard available globally
window.addFrameCard = addFrameCard;

// Global variable to track if local storage is enabled
window.isLocalStorageEnabled = false;

// Function to save jointsData to localStorage
window.saveLocalData = () => {
    if (!isLocalStorageEnabled) return;

    try {
        localStorage.setItem('jointsData', JSON.stringify(window.jointsData));
        localStorage.setItem('groups', JSON.stringify(window.groups));
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Function to load jointsData from localStorage
function loadLocalData() {
    if (!isLocalStorageEnabled) return;

    try {
        const jointsData = localStorage.getItem('jointsData');
        const groups = localStorage.getItem('groups');
        if (jointsData && groups) {
            window.jointsData = JSON.parse(jointsData);
            window.groups = JSON.parse(groups);
            console.log('Data loaded successfully');
            return true;
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
    return false;
}

// Function to apply loaded data to the UI
function applyLoadedData() {
    if (loadLocalData()) {
        // Clear existing cards
        elements.cardContainer.innerHTML = '';

        // Recreate cards based on loaded data
        window.jointsData.forEach((data, index) => {
            window.addFrameCard(index);
        });

        window.updateGroups();

        console.log('Loaded data applied to UI');
    } else {
        console.log('No saved data found or error in loading');
    }
}

// Call applyLoadedData when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(applyLoadedData, 3000);
});

// Add event listeners to save data after relevant actions
elements.copyBtn.addEventListener('click', saveLocalData);
elements.refreshBtn.addEventListener('click', saveLocalData);
elements.clearBtn.addEventListener('click', saveLocalData);

// Function to handle storage toggle change
function handleStorageToggle(event) {
    isLocalStorageEnabled = event.target.checked;
    localStorage.setItem('storageEnabled', isLocalStorageEnabled);

    if (isLocalStorageEnabled) {
        saveLocalData(); // Save current data immediately when enabled
    } else {
        localStorage.removeItem('jointsData'); // Clear saved data when disabled
        localStorage.removeItem('groups'); // Clear saved data when disabled
    }
}

// Initialize storage toggle state
document.addEventListener('DOMContentLoaded', () => {
    const storageToggle = document.getElementById('enable-storage');
    isLocalStorageEnabled = localStorage.getItem('storageEnabled') === 'true';
    storageToggle.checked = isLocalStorageEnabled;

    storageToggle.addEventListener('change', handleStorageToggle);

    if (isLocalStorageEnabled) {
        applyLoadedData();
    }
});

elements.fixCamBtn.addEventListener('click', () => {
    elements.fixCamBtn.classList.toggle('active');
    if (elements.fixCamBtn.classList.contains('active')) {
        elements.fixCamBtn.style.color = 'red';
        viewer.getControls.enableRotate = false;
    } else {
        elements.fixCamBtn.style.color = 'black';
        viewer.getControls.enableRotate = true;
    }
});

let videoVolume = 1;

// keyboard functions
function handleKeyPress(event) {
    const editor = document.getElementById('editor');
    if (!editor.onfocus) {
        document.addEventListener('keyup', function(event) {
            
            if (event.key === 'Delete') {
                const card = elements.cardContainer.querySelector('.highlighted');
                if (card) {
                    const index = Array.from(elements.cardContainer.children).indexOf(card);
                    if (index != 0)
                        highlightCard(card.previousElementSibling);
                    else if (elements.cardContainer.childNodes.length > 1)
                        highlightCard(card.nextElementSibling);
                    window.jointsData.splice(index, 1);
                    elements.cardContainer.removeChild(card);
                    const marker = elements.progressContainer.querySelectorAll('.progress-marker');
                    elements.progressContainer.removeChild(marker[index]);

                    updateCardNumbers();
                }
            }

            if (event.key === 'ArrowUp') {
                const card = elements.cardContainer.querySelector('.highlighted');
                if (card.previousElementSibling)
                    highlightCard(card.previousElementSibling);

            } else if (event.key === 'ArrowDown') {
                const card = elements.cardContainer.querySelector('.highlighted');
                if (card.nextElementSibling)
                    highlightCard(card.nextElementSibling);
            }


            if (event.key === 'm') {
                if (video.volume != 0) {
                    video.volume = 0;
                }
                else {
                    video.volume = videoVolume;
                }
            }

            if (event.key === '+') {
                video.volume += 0.1;
                videoVolume = video.volume;
            } else if (event.key === '-') {
                video.volume -= 0.1;
                videoVolume = video.volume;
            }

            if (event.key === ' ') {
                if (video.paused)
                    video.play();
                else
                    video.pause();
            }

            if (event.key === 'p') {
                elements.animToggle.classList.toggle('checked');
                if (elements.animToggle.classList.contains('checked')) {
                    state.startTime = Date.now() - vidTimeProxy.value * 1e3;
                    video.play();
                    window.linkRobot.classList.remove('checked');
                } else {
                    video.pause();
                }
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft')
                vidTimeProxy.value -= 0.1;
            else if (event.key === 'ArrowRight')
                vidTimeProxy.value += 0.1;
        });
    }
}
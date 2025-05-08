window.video = document.getElementById('video');
const canvas = document.getElementById('canvas');
window.progressContainer = document.getElementById('progress-container');
const progressFilled = document.getElementById('progress-filled');
const progressThumb = document.getElementById('progress-thumb');
const loading = document.querySelector('.loading');
const fileInput = document.getElementById('file-input');
const selectVideoButton = document.getElementById('select-video');
// const playPauseButton = document.getElementById('play-pause');
const restartButton = document.getElementById('restart');
const closeButton = document.getElementById('close-button');
const poseButton = document.getElementById('pose-button');
const leftSide = document.getElementById('left-side');
const rightSide = document.getElementById('right-side');
const handle = document.querySelector('.divider');
const poseDetectToggle = document.getElementById('poseDetect');
window.linkRobot = document.getElementById('link-robot');
const DEG2RAD = Math.PI / 180;

let poseNetLoaded = false;
let lastPoses = [];
let lastPoseAngles;
let videoAspectRatio = 16 / 9;
let lowResCanvas;
let lowResolution = 720;

document.addEventListener('DOMContentLoaded', () => {
  LoadMediaPipe();
  periodicPoseEstimation();
});

let model;
let detector;

async function initPoseDetector() {
  model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'mediapipe',
    modelType: 'full',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
    enableSmoothing: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  };
  return await poseDetection.createDetector(model, detectorConfig);
}

async function detectPose(detector, video) {
  return await detector.estimatePoses(video, {
    flipHorizontal: isFlipped
  });
}

async function LoadMediaPipe() {
  try {
    detector = await initPoseDetector();
    console.log('MediaPipe loaded successfully');
    poseNetLoaded = true;
  } catch (err) {
    console.error('Error loading the MediaPipe model', err);
  }
}

video.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(video.duration);
  videoAspectRatio = video.videoWidth / video.videoHeight;
  resizeCanvas();
  createLowResCanvas();
});

video.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('mousedown', startProgressDrag);
selectVideoButton.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', loadVideo);
// playPauseButton.addEventListener('click', playPause);
restartButton.addEventListener('click', restart);
closeButton.addEventListener('click', () => {
  if (isWebcamActive)
    stopWebcam();
  else
    closeVideo();
});

poseDetectToggle.addEventListener('click', () => {
  poseDetectToggle.classList.toggle('checked');
  if (poseDetectToggle.classList.contains('checked')) {
    canvas.style.display = '';
    captureDataButton.classList.add('active');
    estimatePoses();
  } else {
    canvas.style.display = 'none';
    captureDataButton.classList.remove('active');
  }
});

linkRobot.addEventListener('click', () => {
  linkRobot.classList.toggle('checked');
  estimatePoses();
});

function createLowResCanvas() {
  lowResCanvas = document.createElement('canvas');
  const aspectRatio = video.videoWidth / video.videoHeight;
  lowResCanvas.width = lowResolution;
  lowResCanvas.height = Math.round(lowResolution / aspectRatio);
}

function resizeCanvas() {
  const containerRect = leftSide.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  let canvasWidth, canvasHeight;

  // video height reach containerHeight limit
  if (containerWidth / containerHeight > videoAspectRatio) {
    canvasHeight = containerHeight;
    canvasWidth = canvasHeight * videoAspectRatio;
  } 
  // video width reach containerWidth limit
  else {
    canvasWidth = containerWidth;
    canvasHeight = canvasWidth / videoAspectRatio;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // canvas.style.position = 'absolute';
  canvas.style.top = `${(containerHeight - canvasHeight) / 2}px`;
  canvas.style.left = `${(containerWidth - canvasWidth) / 2}px`;

  if (lastPoses.length > 0) {
    drawPoses(lastPoses);
  }
}

function drawPoses(poses) {
  lastPoses = poses;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scaleX = canvas.width / video.videoWidth;
  const scaleY = canvas.height / video.videoHeight;

  const minDimension = Math.min(canvas.width, canvas.height);
  const keyPointRadius = minDimension * 0.008;
  const lineWidth = minDimension * 0.005;

  if (poses.length > 0) {
    const pose = poses[0];

    poses.forEach(pose => {

      const connections = poseDetection.util.getAdjacentPairs(model);
      connections.forEach(([i, j]) => {
        const kp1 = pose.keypoints[i];
        const kp2 = pose.keypoints[j];
        if (kp1.score > 0.3 && kp2.score > 0.3) {
          ctx.beginPath();
          ctx.moveTo(kp1.x * scaleX, kp1.y * scaleY);
          ctx.lineTo(kp2.x * scaleX, kp2.y * scaleY);
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      });

      pose.keypoints.forEach((keypoint, index) => {
        const noDraw = index < 10 && index != 2 && index != 5 && index != 9 && index != 10;
        if (keypoint.score > 0.3 && !noDraw) {
          ctx.beginPath();
          ctx.arc(keypoint.x * scaleX, keypoint.y * scaleY, keyPointRadius, 0, 2 * Math.PI);
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.strokeStyle = 'yellow'
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    const angles = calculateAllAngles(pose.keypoints3D, window.groupNameSelected);

    const remapAngles = angleMapping(angles, window.groups[window.selectedGroup].data);
    lastPoseAngles = remapAngles;

    displayAngles(ctx, angles);

    if (linkRobot.classList.contains('checked')) {
      Object.keys(window.viewer.robot.joints).slice(0, 6).map((jointName, index) => {
          if (!window.lockJoints[index].classList.contains('locked'))
            window.viewer.setJointValue(jointName, Object.entries(remapAngles)[index][1] * DEG2RAD);
      });
    }
  }

  // console.log('estimation');

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

function angleMapping(angles, groupData) {
  let angleOut = {};

  for (let i = 1; i <= 6; i++) {
    const joint = `J${i}`;
    const angle = angles[joint];
    // console.log(groupData[joint])
    const mappingData = groupData[joint].mappingData;

    if (angle !== undefined && !isNaN(angle)) {
      // Clamp the angle to the range defined in mappingData
      let clampedAngle = Math.max(mappingData.PL, Math.min(mappingData.PR, angle));

      // Map the angle using the values from mappingData
      angleOut[joint] = map(angle, mappingData.PL, mappingData.PR, mappingData.AHL, mappingData.AHR);

      if (angleOut[joint] === undefined || isNaN(angleOut[joint]))
        angleOut[joint] = 0;
    } else {
      // If angle is undefined or NaN, use a default value or skip
      angleOut[joint] = 0; // or any other default value
    }
    angleOut[joint] = Math.round(angleOut[joint] * 10) / 10;
  }
  // console.log(angleOut);
  return angleOut;
}

function map(input, in_min, in_max, out_min, out_max) {
  return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function calculateAllAngles(keypoints3D, groupName = "default") {
  const angles = {};
  const group = window.groups.find(g => g.name === groupName);
  if (!group || !group.data) {
    console.error('Group not found or group data is empty');
    return angles;
  }
  Object.entries(group.data).forEach(([key, value]) => {
    if (value == 'none')
      return;
    const points = value.angles.split(',').map(id => id.trim());
    const points_mirrorred = mirrorPoints(points);
    // console.log('points', points, points_mirrorred);

    if (points.length === 3 || points.length === 4) {
      if (points.length === 3) {
        const [a, b, c] = points.map(i => {
          if (["OH", "DV", "RH", "IH", "UV", "LH"].includes(i)) return i;
          return keypoints3D[parseInt(i)] || { x: 0, y: 0, z: 0, score: 0 };
        });
        // if (value.isMirror) {
          const [a1, b1, c1] = points_mirrorred.map(i => {
            if (["OH", "DV", "RH", "IH", "UV", "LH"].includes(i)) return i;
            return keypoints3D[parseInt(i)] || { x: 0, y: 0, z: 0, score: 0 };
          });
        // }
        if ((a.score > 0.2 && b.score > 0.2) || typeof c === 'string') {
          if (value.isMirror) {
            const angle1 = calculateAngle(a, b, c, undefined, value.is3D);
            const angle2 = calculateAngle(a1, b1, c1, undefined, value.is3D);
            angles[key] = compareAngleSize(angle1, angle2);
          } else {
            angles[key] = calculateAngle(a, b, c, undefined, value.is3D);
          }
        } else {
          // console.warn(`Low confidence for angle ${key}, skipping calculation`);
        }
      } else if (points.length === 4) {
        // Handle 4-point case
        const [a, b, c, d] = points.map(i => keypoints3D[parseInt(i)] || { x: 0, y: 0, z: 0, score: 0 });
        const [a1, b1, c1, d1] = points.map(i => keypoints3D[parseInt(i)] || { x: 0, y: 0, z: 0, score: 0 });
      
        if (a.score > 0.2 && b.score > 0.2 && c.score > 0.2 && d.score > 0.2) {
          if (value.isMirror) {
            const angle1 = calculateAngle(a, b, c, d);
            const angle2 = calculateAngle(a1, b1, c1, d1);
            angles[key] = compareAngleSize(angle1, angle2);
          } else {
            angles[key] = calculateAngle(a, b, c, d);
          }
        } else {
          // console.warn(`Low confidence for angle ${key}, skipping calculation`);
        }
      }
    } else {
      // console.warn(`Invalid number of points for angle ${key}, expected 3 or 4 but got ${points.length}`);
    }
  });
  return angles;
}

function calculateAngle(A, B, C, D, is3D) {
  if (D === undefined) {
    // Check if we're dealing with 2D or 3D calculation
    const withCoord = typeof C === 'string';
    is3D = is3D || withCoord;

    // Vector from B to A
    const BA = { x: A.x - B.x, y: A.y - B.y, z: is3D ? (A.z || 0) - (B.z || 0) : 0 };
    // Vector from B to C
    let BC = { x: C.x - B.x, y: C.y - B.y, z: is3D ? (C.z || 0) - (B.z || 0) : 0 };

    if (withCoord) {
      switch (C) {
        case "OH": BC = { x: 0, y: 0, z: -1 }; break;
        case "DV": BC = { x: 0, y: -1, z: 0 }; break;
        case "RH": BC = { x: 1, y: 0, z: 0 }; break;
        case "IH": BC = { x: 0, y: 0, z: 1 }; break;
        case "UV": BC = { x: 0, y: 1, z: 0 }; break;
        case "LH": BC = { x: -1, y: 0, z: 0 }; break;
        default: throw new Error(`Unknown axis: ${C}`);
      }
    }

    if (is3D) {
      // 3D calculation
      const angle = calculateAngleBetweenVectors(BA, BC);
      const cross = crossProduct(BA, BC);
      const dot = dotProduct(cross, { x: 0, y: 1, z: 0 }); // Assuming Y is up
      return dot < 0 ? -angle : angle;
    } else {
      // 2D calculation
      return calculateAngle2D(BA, BC);
    }
  } else {
    // 4-point calculation
    // Vector from A to B
    const AB = { x: B.x - A.x, y: B.y - A.y, z: B.z - A.z };
    // Vector from C to D
    const CD = { x: D.x - C.x, y: D.y - C.y, z: D.z - C.z };

    // Calculate angle between AB and CD vectors
    const dotProduct = AB.x * CD.x + AB.y * CD.y + AB.z * CD.z;
    const magnitudeAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y + AB.z * AB.z);
    const magnitudeCD = Math.sqrt(CD.x * CD.x + CD.y * CD.y + CD.z * CD.z);

    const angle = Math.acos(dotProduct / (magnitudeAB * magnitudeCD));
    return angle * (180 / Math.PI); // Convert to degrees
  }
}

function calculateAngle2D(v1, v2) {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const det = v1.x * v2.y - v1.y * v2.x;
  const angle = Math.atan2(det, dot) * (180 / Math.PI);
  return Math.abs(angle); // Always return positive angle for 2D
}

function compareAngleSize(angle1, angle2) {
  if (angle1 > angle2) {
    return angle1;
  } else {
    return angle2;
  }
}

function calculateAngleBetweenVectors(v1, v2) {
  // Calculate dot product
  const dotProduct = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

  // Calculate magnitudes
  const magnitudeV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
  const magnitudeV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);

  // Calculate angle
  const angle = Math.acos(dotProduct / (magnitudeV1 * magnitudeV2));
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

  let y = 0.07 * canvas.height;
  const text = `Group: ${window.groupNameSelected}`;
  context.strokeText(text, 10, y);
  context.fillText(text, 10, y);
  y += 20;
  for (const [name, angle] of Object.entries(angles)) {
    const text = `A${name[1]}: ${angle.toFixed(1)}°`;
    context.strokeText(text, 10, y);
    context.fillText(text, 10, y);
    y += 20;
  }

  // Right side display
  y = 0.07 * canvas.height;
  const groupText = `Projections`;
  const groupTextWidth = context.measureText(groupText).width;

  context.strokeText(groupText, canvas.width - groupTextWidth - 10, y);
  context.fillText(groupText, canvas.width - groupTextWidth - 10, y);
  y += 20;

  for (const [name, angle] of Object.entries(lastPoseAngles)) {
    const text = `${name}: ${angle.toFixed(1)}°`;
    const textWidth = context.measureText(text).width;
    context.strokeText(text, canvas.width - textWidth - 10, y);
    context.fillText(text, canvas.width - textWidth - 10, y);
    y += 20;
  }

}

let isVideoLoaded = false;

async function loadVideo(event) {
  const file = event.target.files[0];
  if (file) {
    video.src = URL.createObjectURL(file);
    isVideoLoaded = true;
    loading.style.display = 'block';
    canvas.style.display = 'none';
    selectVideoButton.style.display = 'none';
    await video.play();
    video.pause();
    await generateThumbnails();
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
    window.updateMarkers();
  }
}

window.isWebcamActive = false;
let webcamStream = null;
const webcamButton = document.getElementById('cam-button');

// Add webcam button event listener
webcamButton.addEventListener('click', toggleWebcam);

// Add webcam function
async function toggleWebcam() {
  if (!isWebcamActive) {
    try {
      // Activate webcam
      webcamStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      video.srcObject = webcamStream;
      video.play();

      // Update UI
      selectVideoButton.style.display = 'none';
      closeButton.style.display = 'flex';
      poseButton.style.display = 'flex';
      canvas.style.display = 'block';
      video.style.display = 'block';
      document.querySelector('.controls').style.display = 'flex';
      webcamButton.classList.add('active');

      isWebcamActive = true;

      // Set video ratio
      // video.addEventListener('loadedmetadata', () => {
      //   videoAspectRatio = video.videoWidth / video.videoHeight;
      //   resizeCanvas();
      //   createLowResCanvas();
      // }, { once: true });

      document.querySelector('.time-container').style.display = 'none';
      document.querySelector('.progress-container').style.display = 'none';

    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Unable to access webcam');
    }
  } else {
    // Stop webcam
    stopWebcam();
  }
}

function stopWebcam() {
  if (webcamStream) {
    webcamStream.getTracks().forEach(track => track.stop());
    webcamStream = null;
  }

  // Reset video source
  video.srcObject = null;
  isWebcamActive = false;

  document.querySelector('.time-container').style.display = '';
  document.querySelector('.progress-container').style.display = '';

  // Reset UI
  webcamButton.classList.remove('active');

  if (isFlipped) {
    video.classList.remove('flipped');
    // canvas.classList.remove('flipped');
    flipButton.classList.remove('active');
    isFlipped = false;
  }

  if (!isVideoLoaded) {
    closeVideo();
  }
}

const flipButton = document.getElementById('flip-button');
let isFlipped = false;

flipButton.addEventListener('click', toggleFlip);

async function toggleFlip() {
  isFlipped = !isFlipped;

  console.log('isFlipped', isFlipped);

  if (isFlipped) {
    video.classList.add('flipped');
    // canvas.classList.add('flipped');
    flipButton.classList.add('active');
  } else {
    video.classList.remove('flipped');
    // canvas.classList.remove('flipped');
    flipButton.classList.remove('active');
  }

  detector = await initPoseDetector();

  drawPoses(lastPoses);
}

const playPauseAnimation = document.getElementById('play-pause-animation');

canvas.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);

function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseAnimation.className = 'play-pause-animation play';
  } else {
    video.pause();
    playPauseAnimation.className = 'play-pause-animation pause';
    estimatePoses();
  }

  playPauseAnimation.style.display = 'block';
  setTimeout(() => {
    playPauseAnimation.style.display = 'none';
  }, 1000);
}

function restart() {
  vidTimeProxy.value = 0;
  video.play();
  requestAnimationFrame(estimatePoses);
}

const captureDataButton = document.getElementById('capture-data');
window.jointsData = [];

captureDataButton.addEventListener('click', () => {
  if (captureDataButton.classList.contains('active'))
    captureData(lastPoseAngles);
});

window.captureData = (poseAngles) => {
  const currentTime = Math.round(video.currentTime * 100) / 100;
  const newData = { time: currentTime, group: window.groupNameSelected, angles: { ...poseAngles } };

  let inserted = false;
  let i = 0;
  for (; i < window.jointsData.length; i++) {
    if (currentTime < window.jointsData[i].time) {
      window.jointsData.splice(i, 0, newData);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    window.jointsData.push(newData);
  }

  addMarkerToProgressBar(currentTime);
  window.addFrameCard(i);
}

window.addMarkerToProgressBar = (time) => {
  const progress = (time / video.duration) * 99 + 1;
  const marker = document.createElement('div');
  marker.className = 'progress-marker';
  progressContainer.appendChild(marker);
  marker.style.left = `calc(${progress}% - ${marker.clientWidth / 2}px)`;
  marker.addEventListener('click', (event) => {
    marker.addEventListener('mousedown', (event) => {
      event.stopPropagation();
    });
    event.stopPropagation();
    vidTimeProxy.value = time;
    updateProgress();
  });
}

function updateProgress() {
  const progress = (video.currentTime / video.duration) * 99 + 1;
  let thickness = progressThumb.clientWidth;
  progressFilled.style.width = `calc(${progress}% - ${thickness / 2}px)`;
  progressThumb.style.left = `calc(${progress}% - ${thickness / 2}px)`;
  if (poseDetectToggle.classList.contains('checked') || video.paused)
    estimatePoses();
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
  const rect = progressContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;
  const newTime = (x / width) * video.duration;
  vidTimeProxy.value = newTime;
  estimatePoses();
}

async function generateThumbnails() {
  const duration = video.duration;
  const thumbnailCount = 20;
  const thumbnailCanvas = document.createElement('canvas');
  const context = thumbnailCanvas.getContext('2d');

  thumbnailCanvas.width = 160;
  thumbnailCanvas.height = 90;

  for (let i = 0; i < thumbnailCount; i++) {
    const thumbnailTime = (i / thumbnailCount) * duration;
    await setVideoCurrentTime(video, thumbnailTime);

    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'progress-thumbnail';
    thumbnailDiv.style.display = 'none';
    progressContainer.insertBefore(thumbnailDiv, progressFilled);

    context.drawImage(video, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
    thumbnailDiv.style.backgroundImage = `url(${thumbnailCanvas.toDataURL()})`;
  }

  loading.style.display = 'none';
  const thumbnails = document.querySelectorAll('.progress-thumbnail');
  thumbnails.forEach(thumbnail => thumbnail.style.display = 'block');

  vidTimeProxy.value = 0;
  
}

async function setVideoCurrentTime(video, time) {
  return new Promise(resolve => {
    vidTimeProxy.value = time;
    video.addEventListener('seeked', resolve, { once: true });
  });
}

function closeVideo() {
  video.pause();
  video.src = '';
  isVideoLoaded = false;
  selectVideoButton.style.display = 'flex';
  canvas.style.display = 'none';
  video.style.display = 'none';
  document.querySelector('.controls').style.display = 'none';
  closeButton.style.display = 'none';
  poseButton.style.display = 'none';
  document.querySelector('.modal').style.display = '';
  const thumbnails = document.querySelectorAll('.progress-thumbnail');
  thumbnails.forEach(thumbnail => thumbnail.remove());
  progressContainer.querySelectorAll('.progress-marker').forEach(mark => mark.remove());
}

let isDragging = false;

handle.addEventListener('mousedown', (event) => {
  isDragging = true;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.body.style.userSelect = 'none';
});

function onDrag(event) {
  if (!isDragging) return;

  const containerRect = document.querySelector('.container').getBoundingClientRect();
  const newWidth = event.clientX - containerRect.left;

  if (newWidth > 400 && newWidth < containerRect.width - 400) {
    leftSide.style.width = `${newWidth}px`;
    rightSide.style.width = `${containerRect.width - newWidth}px`;
    resizeCanvas();
  }
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.userSelect = '';
}

window.addEventListener('resize', () => {
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

let lastProcessedTime = 0;
const processingInterval = 10;

let estimationCount = 0;
const maxEstimations = 5;

const updatePose = document.getElementById('update-pose');
updatePose.addEventListener('click', () => {
  estimatePoses(true);
});

async function estimatePoses(refresh) {
  if (poseDetectToggle.classList.contains('checked') && video.readyState >= 2 && poseNetLoaded || refresh) {
    const currentTime = video.currentTime;
    if (currentTime !== lastProcessedTime || refresh) {
      lastProcessedTime = currentTime;
      const poses = await detectPose(detector, video);
      drawPoses(poses);
    }
  }
}

function periodicPoseEstimation() {
  if (poseDetectToggle.classList.contains('checked') && !video.paused) {
    estimatePoses();
  }
  setTimeout(periodicPoseEstimation, processingInterval);
}

poseButton.addEventListener('click', () => {
  const poseList = document.querySelectorAll('.field');
  poseList.forEach((e, index) => {
    e.innerHTML = `${angleDefinitions[index].name}: ${angleDefinitions[index].points}`;
  });

  document.querySelector('.modal').style.zIndex = '1000';
  document.querySelector('.modal').classList.toggle('show');
  document.querySelector('.overlay').classList.toggle('show');
});
document.querySelector('.overlay').addEventListener('click', () => {
  document.querySelector('.modal').classList.remove('show');
  document.querySelector('.overlay').classList.remove('show');
  setTimeout(() => {
    document.querySelector('.modal').style.zIndex = '-1';
  }, 500);
});

// Video Controls with Time Display
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

video.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(video.currentTime);
  updateProgress();
  if (video.paused) {
    estimatePoses();
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

document.addEventListener('keyup', function (event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    if (poseDetectToggle.classList.contains('checked'))
      captureData(lastPoseAngles);
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Tab') {
    event.preventDefault();
  }
});

const autoCaptureButton = document.getElementById('scatter-data');

// Create interval settings that appear on hover
const intervalSettings = document.createElement('div');
intervalSettings.className = 'interval-settings';
intervalSettings.innerHTML = `
  <label for="capture-interval">Interval (sec):</label>
  <input type="number" id="capture-interval" min="0.01" max="10" value="1">
`;
intervalSettings.style.display = 'none';
document.querySelector('.controls').appendChild(intervalSettings);

// Add CSS for components
const style = document.createElement('style');
style.textContent = `
.interval-settings {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 5px;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.interval-settings.visible {
  opacity: 1;
  pointer-events: auto;
}

.interval-settings input {
  -webkit-appearance: none;
  width: 30px;
  margin-left: 5px;
  padding: 2px 5px;
}

#capture-interval::-webkit-outer-spin-button,
#capture-interval::-webkit-inner-spin-button {
  -webkit-appearance: none; /* 隱藏 WebKit 瀏覽器中的上下按鈕 */
  -moz-appearance: textfield; /* 隱藏 Firefox 中的上下按鈕 */
  appearance: none; /* 標準屬性，適用於支持的瀏覽器 */
}

.progress-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.progress-message {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
}

.cancel-button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.cancel-button:hover {
  background-color: #cc0000;
}
`;
document.head.appendChild(style);

// Setup hover behavior with timers
let hideTimeout, showTimeout;

// Show settings on hover
autoCaptureButton.addEventListener('mouseenter', () => {
  showTimeout = setTimeout(() => {
      intervalSettings.classList.add('visible');
  }, 200); // 0.2s delay
  clearTimeout(hideTimeout);
});

// Setup hover detection for both elements
autoCaptureButton.addEventListener('mouseleave', () => {
  clearTimeout(hideTimeout);
  clearTimeout(showTimeout);
  hideTimeout = setTimeout(() => {
    if (!isHovering(intervalSettings)) {
      intervalSettings.classList.remove('visible');
    }
  }, 500); // 0.5s delay
});

intervalSettings.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout);
});

intervalSettings.addEventListener('mouseleave', () => {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    if (!isHovering(autoCaptureButton)) {
      intervalSettings.classList.remove('visible');
    }
  }, 500); // 0.5秒延遲
});

// Helper function to check if element is being hovered
function isHovering(element) {
  return element.matches(':hover');
}

// Show/hide interval settings on hover
autoCaptureButton.addEventListener('mouseenter', () => {
  intervalSettings.style.display = 'block';
});

// Track if capturing is in progress and create cancel handler
let isCapturing = false;
let shouldCancel = false;

// Add the auto capture functionality
autoCaptureButton.addEventListener('click', () => {
  // Check if already capturing
  if (isCapturing) {
    return;
  }

  // Check if the pose detection is enabled
  if (!poseDetectToggle.classList.contains('checked')) {
    alert('Please enable pose detection before capturing');
    return;
  }

  // Get interval value
  const interval = parseFloat(document.getElementById('capture-interval').value);
  if (isNaN(interval) || interval <= 0) {
    alert('Please enter a valid interval value');
    return;
  }

  // Check if there are existing captures and confirm before clearing
  if (window.jointsData && window.jointsData.length > 0) {
    if (confirm(`There are already ${window.jointsData.length} captured points. Do you want to clear the existing captures and continue? Clicking "OK" will clear all existing captures.`)) {
      // Clear ALL cards and data
      window.clearALLCards();
    } else {
      // User cancelled, return without capturing
      return;
    }
  }

  // Pause video during the process
  video.pause();

  // Create a progress indicator with cancel button
  const progressOverlay = document.createElement('div');
  progressOverlay.className = 'progress-overlay';
  progressOverlay.innerHTML = `
    <div class="progress-message">Scattering Data... <span id="progress-percent">0%</span></div>
    <button id="cancel-capturing" class="cancel-button">Cancel</button>
  `;
  document.body.appendChild(progressOverlay);

  // Add cancel button handler
  document.getElementById('cancel-capturing').addEventListener('click', () => {
    shouldCancel = true;
  });

  // Start the auto capturing process
  isCapturing = true;
  shouldCancel = false;
  autoCaptureProcess(interval);
});

// Function to automatically capture data throughout the video
async function autoCaptureProcess(interval) {
  try {
    // Clear existing markers if needed
    progressContainer.querySelectorAll('.progress-marker').forEach(mark => mark.remove());

    // Clear existing data
    window.jointsData = [];

    // Get video duration
    const duration = video.duration;
    const totalFrames = Math.floor(duration / interval);
    let processedFrames = 0;

    // Process each frame
    for (let time = 0; time <= duration; time += interval) {
      // Check if user wants to cancel
      if (shouldCancel) {
        break;
      }

      // Set video to specific time
      await setVideoCurrentTime(video, time);

      // Estimate poses for current frame
      await estimatePoses(true);

      // capture data if pose detection is valid
      if (lastPoseAngles && Object.keys(lastPoseAngles).length > 0) {
        window.captureData(lastPoseAngles);
      }

      // Update progress
      processedFrames++;
      let percentage = Math.floor((processedFrames / totalFrames) * 100);
      if (percentage > 100) percentage = 100;
      const progressElement = document.getElementById('progress-percent');
      if (progressElement) {
        progressElement.textContent = `${percentage}%`;
      }

      // Small delay to allow UI updates
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Show completion message
    if (!shouldCancel) {
      alert(`Finished capturing ${window.jointsData.length} poses!`);
    } else {
      alert(`Cancelled! ${window.jointsData.length} poses captured.`);
    }

  } catch (error) {
    console.error('An error occurred during the auto-capturing process:', error);
    alert('An error occurred during the capturing process. Please check the console for details.');
  } finally {
    // Always clean up
    isCapturing = false;
    shouldCancel = false;

    // Remove progress overlay
    const overlay = document.querySelector('.progress-overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }

    // Return to beginning of video
    vidTimeProxy.value = 0;
    

    // Call update for frame cards if that function exists
    if (typeof window.updateMarkers === 'function') {
      window.updateMarkers();
    }
  }
}

const symmetricPairs = [
  ["6", "3"], ["5", "2"], ["4", "1"], ["8", "7"], ["10", "9"], // head
  ["12", "11"],                      // shoulders
  ["14", "13"],                      // arm
  ["16", "15"], ["18", "17"], ["20", "19"], ["22", "21"], // hands
  ["24", "23"],                      // waist
  ["26", "25"],                      // thigh
  ["28", "27"],                      // legs
  ["32", "31"], ["30", "29"],        // feet
  ["RH", "LH"]
];

window.mirrorPoints = (points) => {
  return points.map(point => {
    for (const [a, b] of symmetricPairs) {
      if (point === a) return b;
      if (point === b) return a;
    }
    return point;
  });
}

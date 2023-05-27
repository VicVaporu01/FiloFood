let video = null;
let detector = null;
let detections = [];
let videoVisibility = true;
let detecting = false;

const videoAction = document.getElementById("videoAction");
const detectionAction = document.getElementById("detectionAction");

document.body.style.cursor = "wait";

function preload() {
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
}

function draw() {
  if (!video || !detecting) return;
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i]);
  }
}

function drawResult(object) {
  boundingBox(object);
  drawLabel(object);
}

function boundingBox(object) {
  stroke("blue");
  strokeWeight(6);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}
function drawLabel(object) {
  noStroke();
  fill("white");
  textSize(34);
  text(object.label, object.x + 15, object.y + 34);
}

let shouldPrintDetection = true;

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;

  if (detecting) {
    detect();
  }
  try {
    if (
      (detections[0].label === "person" || detections[0].label === "dog" || detections[0]==="cat") &&
      shouldPrintDetection
    ) {
      shouldPrintDetection = false;
      setTimeout(() => {
        console.log(detections);
        shouldPrintDetection = true;
        //sendCommandToParent("cambiar-valor-variable"); // Envia el mensaje al componente Angular
        sendDetectionDataToBackend(detections);
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  }
}

function sendDetectionDataToBackend(detections) {
  const token = localStorage.getItem("token"); // Obtén el token de autenticación desde donde lo tengas almacenado
  console.log("Token deste detection", token);
  fetch("http://localhost:3000/api/users/detection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado Authorization
    },
    body: JSON.stringify(detections),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos de detección enviados al backend:", data);
    })
    .catch((error) => {
      console.error("Error al enviar los datos de detección:", error);
    });
}

function detect() {
  detector.detect(video, onDetected);
}

function toggleVideo() {
  if (!video) return;
  if (videoVisibility) {
    video.hide();
    videoAction.innerText = "Activar Video";
  } else {
    video.show();
    videoAction.innerText = "Desactivar Video";
  }
  videoVisibility = !videoVisibility;
}

function toggleDetecting() {
  if (!video || !detector) return;
  if (!detecting) {
    detect();
    detectionAction.innerText = "Parar...";
  } else {
    detectionAction.innerText = "Detectar Objetos";
  }
  detecting = !detecting;
}

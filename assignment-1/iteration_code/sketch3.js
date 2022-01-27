// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
// https://editor.p5js.org/codingtrain/sketches/PoZXqbu4v

// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/na52YUQP1/';

let miles, bmoi, appai;

let a, b, c;

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
    createCanvas(840, 720);
    // Create the video
    video = createCapture(VIDEO);
    video.hide();
    // STEP 2: Start classifying
    classifyVideo();
    miles = loadImage('img/myles.jpg');
    bmoi = loadImage('img/bmo.jpg');
    appai = loadImage('img/appa.png');

    a = 157;
    b = 157;
    c = 157;

}

// STEP 2 classify the videeo!
function classifyVideo() {
    classifier.classify(video, gotResults);
}

function draw() {
    background(0);

    // Draw the video
    image(video, 0, 0);

    // STEP 4: Draw the label
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height - 16);

    // Pick an emoji, the "default" is train
    let emoji = "🐗";
    if (label == "appa") {
        a = 157;
        b = 157;
        c = 255;
    } else if (label == "bmo") {
        a = 157;
        b = 255;
        c = 157;
    } else if (label == "Spiderman") {
        a = 255;
        b = 157;
        c = 157;
    }

    // Draw the emoji
    textSize(256);


    tint(255, a);
    image(miles, 0, 0, 250, 200);
    tint(255);
    tint(255, b);
    image(bmoi, 250, 0, 250, 200);
    tint(255);
    tint(255, c);
    image(appai, 500, 0, 250, 200);
    tint(255);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
    // Something went wrong!
    if (error) {
        console.error(error);
        return;
    }
    // Store the label and classify again!
    label = results[0].label;
    classifyVideo();
}

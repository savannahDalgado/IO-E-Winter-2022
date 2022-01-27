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

let r, g, b;

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
    createCanvas(640, 520);
    // Create the video
    video = createCapture(VIDEO);
    video.hide();
    // STEP 2: Start classifying
    classifyVideo();

    r = 0;
    b = 0;
    g = 0;
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
    if (label == "boar") {
        b++;
    } else if (label == "bmo") {
        g++;
    } else if (label == "Spiderman") {
        r++;
    }

    // Draw the emoji
    textSize(256);


    fill(r, g, b);
    ellipse(200, 200, 300, 300);
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

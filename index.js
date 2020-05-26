

var model = undefined;
const classifierElement = document.getElementById('classifier');
const loaderElement = document.getElementById('loader');

async function initialize() {

    model = await tf.loadLayersModel('model/model.json');
    classifierElement.style.display = 'block';
    loaderElement.style.display = 'none';

    document.getElementById('predict').addEventListener('click', () => predict());

}

async function predict () {

alert("submitted");
    const imageElement = document.getElementById('img');
    let tensorImg = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([64, 64]).toFloat().expandDims();
    prediction = await model.predict(tensorImg).data();

    if (prediction[0] == 0) {

        alert("You weared mask!");

    } else if (prediction[0] == 1) {

        alert("You dint near mask!");

    } else {
        alert("Hummm... a weird error occurred.");
    }

}

function changeImage() {
    var imageDisplay = document.getElementById('img');
    var uploadedImage = document.getElementById('my-file-selector').files[0];
    imageDisplay.src = URL.createObjectURL(uploadedImage);
}

initialize();

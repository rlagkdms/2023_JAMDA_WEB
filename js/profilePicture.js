
function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}

window.addEventListener("DOMContentLoaded", function () {
  var image = document.getElementById("image");
  var button = document.getElementById("button");
  var result = document.getElementById("result");
  var croppable = false;
  var cropper = new Cropper(image, {
    viewMode: 3,
    aspectRatio: 1 / 1,
    center: false,
    guides: false,
    movable: false,
    rotable: false,
    cropBoxResizable: false,
    data: {
      width: 500,
      height: 500,
    },
    ready: function () {
      croppable = true;
    },
  });

  button.onclick = function () {
    var croppedCanvas;
    var roundedCanvas;
    var roundedImage;

    if (!croppable) {
      return;
    }

    // Crop
    croppedCanvas = cropper.getCroppedCanvas();

    // Round
    roundedCanvas = getRoundedCanvas(croppedCanvas);

    // Show
    roundedImage = document.createElement("img");
    roundedImage.src = roundedCanvas.toDataURL();
    result.innerHTML = "";
    result.appendChild(roundedImage);
  };
});

window.addEventListener("DOMContentLoaded", function () {
  // 이전 페이지에서 전달받은 이미지 URL 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const imageUrl = urlParams.get("image");
  console.log(imageUrl);

  // 이미지 넣기 
  const imageContainer = document.getElementById("image");
  if (imageUrl) {
    imageContainer.src =`${imageUrl}`;
  } else {
    imageContainer.textContent = "이미지를 전달받지 못했습니다.";
  }
});
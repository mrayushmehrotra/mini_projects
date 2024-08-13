const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxIndex: 381,
};

let imagesLoaded = 0;
const images = [];

function preloadImages() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./frames/frame_${i}.jpg`;
    const img = new Image();
    img.src = imageUrl;
    img.onerror = () => {
      console.error(`Failed to load image at ${imageUrl}`);
    };

    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(Index) {
  if (Index >= 0 && Index <= frames.maxIndex) {
    const img = images[Index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = Index;
  }
}

function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      scrub: true, // Can be true or false instead of a numeric value for simpler cases.
      markers: true,
      pin: true,
    },
  });

  tl.to(frames, {
    currentIndex: frames.maxIndex,
    onUpdate: function () {
      console.log("Current Frame Index: ", frames.currentIndex);
      loadImage(Math.floor(frames.currentIndex));
    },
  });
}

preloadImages();

'use strict';

function Image(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Image.all.push(this);
}

Image.totalClicks = 0;
Image.all = [];
Image.wasShown = [];
Image.beingShown = [];
Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Creates all the images and pushes them into the Images.all array
for (var i = 0; i < Image.allNames.length; i++) {
  new Image(Image.allNames[i]);
}

Image.imgElOne = document.getElementById('image_one');
Image.imgElTwo = document.getElementById('image_two');
Image.imgElThree = document.getElementById('image_three');
Image.tableEl = document.getElementById('results');

// Render function for the three image slots
function renderThreeImages() {
  for (var j = 0; j < 3; j++) {
    var randomIndex = Math.floor(Math.random() * Image.all.length);
    while (Image.wasShown.indexOf(Image.all[randomIndex]) !== -1 || Image.beingShown.indexOf(Image.all[randomIndex]) !== -1) {
      randomIndex = Math.floor(Math.random() * Image.all.length);
    }
    Image.all[randomIndex].timesShown++;
    Image.beingShown[j] = (Image.all[randomIndex]);
  }
  Image.imgElOne.src = Image.beingShown[0].source;
  Image.imgElOne.style.width = '180px';
  Image.imgElTwo.src = Image.beingShown[1].source;
  Image.imgElTwo.style.width = '180px';
  Image.imgElThree.src = Image.beingShown[2].source;
  Image.imgElThree.style.width = '180px';
  console.table(Image.wasShown);
  console.table(Image.beingShown);
}

renderThreeImages();

// The eventHandler function
function eventHandler(e) {
  if (e.target === Image.imgElOne) {
    Image.beingShown[0].timesClicked++;
  } else if (e.target === Image.imgElTwo) {
    Image.beingShown[1].timesClicked++;
  } else if (e.target === Image.imgElThree) {
    Image.beingShown[2].timesClicked++;
  }
  Image.totalClicks++;
  if (Image.totalClicks === 25) {
    Image.imgElOne.removeEventListener('click', eventHandler);
    Image.imgElTwo.removeEventListener('click', eventHandler);
    Image.imgElThree.removeEventListener('click', eventHandler);

    // >>>>>>>>>>>>>>>>>>>> DISPLAY THE DATA <<<<<<<<<<<<<<<<<<<<<

  } else {
    for (var i = 0; i < 3; i++) {
      Image.wasShown[i] = Image.beingShown[i];
    }
    renderThreeImages();
  }
}


Image.imgElOne.addEventListener('click', eventHandler);
Image.imgElTwo.addEventListener('click', eventHandler);
Image.imgElThree.addEventListener('click', eventHandler);

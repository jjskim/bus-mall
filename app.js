'use strict';

function Product(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Product.all.push(this);
}

Product.totalClicks = 0;
Product.all = [];
Product.wasShown = [];
Product.beingShown = [];
Product.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Creates all the images and pushes them into the Images.all array
for (var i = 0; i < Product.allNames.length; i++) {
  new Product(Product.allNames[i]);
}

Product.imgElOne = document.getElementById('image_one');
Product.imgElTwo = document.getElementById('image_two');
Product.imgElThree = document.getElementById('image_three');
Product.tableEl = document.getElementById('results');

// Render function for the three image slots
function renderThreeImages() {
  for (var j = 0; j < 3; j++) {
    var randomIndex = Math.floor(Math.random() * Product.all.length);
    while (Product.wasShown.indexOf(Product.all[randomIndex]) !== -1 || Product.beingShown.indexOf(Product.all[randomIndex]) !== -1) {
      randomIndex = Math.floor(Math.random() * Product.all.length);
    }
    Product.all[randomIndex].timesShown++;
    Product.beingShown[j] = (Product.all[randomIndex]);
  }
  Product.imgElOne.src = Product.beingShown[0].source;
  Product.imgElOne.style.width = '180px';
  Product.imgElTwo.src = Product.beingShown[1].source;
  Product.imgElTwo.style.width = '180px';
  Product.imgElThree.src = Product.beingShown[2].source;
  Product.imgElThree.style.width = '180px';
  console.table(Product.wasShown);
  console.table(Product.beingShown);
}


// The eventHandler function
function eventHandler(e) {
  if (e.target === Product.imgElOne) {
    Product.beingShown[0].timesClicked++;
  } else if (e.target === Product.imgElTwo) {
    Product.beingShown[1].timesClicked++;
  } else if (e.target === Product.imgElThree) {
    Product.beingShown[2].timesClicked++;
  }
  Product.totalClicks++;
  if (Product.totalClicks === 25) {
    Product.imgElOne.removeEventListener('click', eventHandler);
    Product.imgElTwo.removeEventListener('click', eventHandler);
    Product.imgElThree.removeEventListener('click', eventHandler);

    // Make the header row
    var trEl = document.createElement('tr');

    var thEl = document.createElement('th');
    thEl.textContent = 'Product Name';
    trEl.appendChild(thEl);

    thEl = document.createElement('th');
    thEl.textContent = 'Times Chosen';
    trEl.appendChild(thEl);

    thEl = document.createElement('th');
    thEl.textContent = 'Times Shown';
    trEl.appendChild(thEl);

    thEl = document.createElement('th');
    thEl.textContent = 'Percentage of Times Chosen';
    trEl.appendChild(thEl);

    Product.tableEl.appendChild(trEl);

    // The data rows
    for (var i = 0; i < Product.all.length; i++) {
      trEl = document.createElement('tr');

      var tdEl = document.createElement('td');
      tdEl.textContent = Product.all[i].name;
      trEl.appendChild(tdEl);

      tdEl = document.createElement('td');
      tdEl.textContent = Product.all[i].timesClicked + ' time(s)';
      trEl.appendChild(tdEl);

      tdEl = document.createElement('td');
      tdEl.textContent = Product.all[i].timesShown + ' time(s)';
      trEl.appendChild(tdEl);

      tdEl = document.createElement('td');
      var percentageClicked;
      if (Product.all[i].timesShown > 0) {
        percentageClicked = Math.round(((Product.all[i].timesClicked / Product.all[i].timesShown) * 100)) + ' percent';
      } else {
        percentageClicked = '0 percent';
      }
      tdEl.textContent = percentageClicked;
      trEl.appendChild(tdEl);

      Product.tableEl.appendChild(trEl);
    }

    // >>>>>>>>>>>>>>>>>>>> DISPLAY THE DATA <<<<<<<<<<<<<<<<<<<<<

  } else {
    for (var j = 0; j < 3; j++) {
      Product.wasShown[j] = Product.beingShown[j];
    }
    renderThreeImages();
  }
}

// function makeTableRow() {
//   tdEl = document.createElement('td');
//   tdEl.textContent =
// }

// For the initial three images
renderThreeImages();

Product.imgElOne.addEventListener('click', eventHandler);
Product.imgElTwo.addEventListener('click', eventHandler);
Product.imgElThree.addEventListener('click', eventHandler);

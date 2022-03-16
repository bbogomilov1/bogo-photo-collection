"use strict";

//SELECTED ELEMENTS
const bag = document.querySelector(".bag");
const openBag = document.querySelector(".bag-icon");
const closeBag = document.querySelector(".close-bag");
const bagOverlay = document.querySelector(".bag-overlay");

const contentBagEl = document.querySelector(".bag-content");
const contentEl = document.querySelector(".bag-item");
const bagItemsCounter = document.querySelector(".bag-items");
const subtotalEl = document.querySelector(".footer");
const printBtns = document.querySelectorAll(".bag-btn");
const clearBagEl = document.querySelector(".clear-bag");

//PRINTS ARRAY
const options = {
  style: "currency",
  currency: "usd",
};

const prints = [
  {
    id: 0,
    name: "Victoria",
    price: 23.99,
    imgSrc: "print1.jpg",
  },
  {
    id: 1,
    name: "Angelica",
    price: 21.99,
    imgSrc: "print2.jpg",
  },
  {
    id: 2,
    name: "Hrisi",
    price: 25.99,
    imgSrc: "print3.jpg",
  },
  {
    id: 3,
    name: "Gabriella",
    price: 19.99,
    imgSrc: "print4.jpg",
  },
];

// OPEN BAG FUNCTION
const openBagFunc = function () {
  bagOverlay.classList.remove("hide-bag");
  bagOverlay.classList.add("show-bag");
  bag.classList.remove("hide-bag");
  bag.classList.add("show-bag");
};

// OPEN BAG ON CLICK
openBag.addEventListener("click", () => {
  openBagFunc();
});

// CLOSE BAG FUNCTION
const closeBagFunc = function () {
  bagOverlay.classList.remove("show-bag");
  bagOverlay.classList.add("hide-bag");
  bag.classList.remove("show-bag");
  bag.classList.add("hide-bag");
};

//CLOSE BAG ON CLICK + ESC
closeBag.addEventListener("click", () => {
  closeBagFunc();
});

bagOverlay.addEventListener("click", () => {
  closeBagFunc();
});

window.onkeydown = function (event) {
  if (event.keyCode == 27) {
    closeBagFunc();
  }
};

//ADD TO BAG
let bagArr = [];

const addToBag = function (id) {
  if (bagArr.some((item) => item.id === +id)) {
    changeCounter("plus", id);
  } else {
    let item = prints.find((print) => print.id === +id);
    bagArr.push({
      ...item,
      counter: 1,
    });
  }

  updateBag();
};

//UPDATE BAG
function updateBag() {
  renderBagItems();
  renderSubtotal();
}

//CALCULATE AND RENDER SUBTOTAL
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  bagArr.forEach((item) => {
    totalPrice += item.price * item.counter;
    totalItems += item.counter;
  });

  if (totalItems === 0) {
    bagItemsCounter.innerHTML = 0;
    subtotalEl.innerHTML = `
    <div class="footer">
      <div class="empty-bag">
        <img src="emptybag.png" ; />
      </div>
      <div class="bag-footer">
        <h3>is empty</h3>
      </div>
    </div>
    `;
  } else {
    subtotalEl.innerHTML = `
    <div class="footer-title">
      <h4>your total (${totalItems} ${totalItems === 1 ? "item" : "items"}): 
      </h4> 
      <h3>BGN <span class="bag-total">${totalPrice.toFixed(2)}</span></h3>
    </div>
    <button class="clear-bag" onclick="clearBagBtn()">clear bag</button>`;

    bagItemsCounter.innerHTML = `${totalItems}`;
  }
}

//RENDER BAG ITEMS
function renderBagItems() {
  contentBagEl.innerHTML = ""; //clear bag element

  bagArr.forEach((item) => {
    contentBagEl.innerHTML += `
      <div class="bag-item">
        <div class="img-and-name">
          <img src="${item.imgSrc}" alt="${item.name}" />
          <div class="bag-item-text">
            <h3>${item.name}</h3>
            <h4>${item.price}</h4>
            <span class="remove-item" onclick="removeItemFromBag(${item.id})">remove</span>
          </div>
        </div>
        <div class="bag-item-amount">
          <i class="fas fa-chevron-up" onclick="changeCounter('plus', ${item.id})"></i>
          <div class="item-amount">${item.counter}</div>
          <i class="fas fa-chevron-down" onclick="changeCounter('minus', ${item.id})"></i>
        </div>
      </div>`;
  });
}

//CHANGE COUNTER OF PRINTS IN THE BAG
function changeCounter(action, id) {
  bagArr = bagArr.map((item) => {
    let counter = item.counter;
    if (item.id === +id) {
      if (action === "minus" && counter > 1) {
        counter--;
      } else if (action === "plus") {
        counter++;
      }
    }
    return {
      ...item,
      counter,
    };
  });

  updateBag();
}

printBtns.forEach((print) =>
  print.addEventListener("click", () => {
    bagOverlay.classList.remove("hide-bag");
    bagOverlay.classList.add("show-bag");
    bag.classList.remove("hide-bag");
    bag.classList.add("show-bag");

    addToBag(print.id);
  })
);

//RENDER PRINTS INTO AN ARRAY
function renderPrints() {
  prints.forEach((print) => {
    contentBagEl.innerHTML += `

              <img src="${print.imgSrc}" alt="${print.name}" />
              <div class="bag-item-text">
                <h3>${print.name}</h3>
                <h4>${print.price}</h4>
                <span class="remove-item">remove</span>
              </div>
              <div class="bag-item-amount">
                <i class="fas fa-chevron-up"></i>
                <div class="item-amount">1</div>
                <i class="fas fa-chevron-down"></i>
              </div>`;
  });
}

//REMOVE ITEMS FROM BAG
function removeItemFromBag(id) {
  bagArr = bagArr.filter((item) => item.id !== id);

  updateBag();
}

function clearBagBtn() {
  subtotalEl.innerHTML = "<h3>is empty</h3>";

  bagArr.forEach((item) => {
    removeItemFromBag(item.id);
  });

  bagItemsCounter.innerHTML = 0;
}

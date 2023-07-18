// declare variables

const itemInput = document.getElementById("item-input");
const selectCategory = document.getElementById("select-category");
const updateBtn = document.getElementById("update-btn");
const quantInput = document.getElementById("quant-input");

// constructor (object) function
function CreateItem(name, category, quantity) {
  this.name = name;
  this.category = category;
  this.id = generateRandomId();
  this.quantity = quantity;
}

// SHOPPING ARRAY
let shoppingList = [];

// Categorized items object
let categorizedItems = {};

// EVENT LISTENER
updateBtn.addEventListener("click", function () {
  let itemName = itemInput.value;
  let categoryName = selectCategory.value;
  let quantResult = quantInput.value;
  // create NEW object
  let newItem = new CreateItem(itemName, categoryName, quantResult);
  // push newItem to the shoppingList Array
  shoppingList.push(newItem);
  clearValues();
  renderItems();
});

// MAP OVER ARRAY AND RENDER ITEMS
function renderItems() {
  // Clear existing items
  const shoppingListElement = document.getElementById("shopping-list");
  shoppingListElement.innerHTML = "";

  // Group items by category
  categorizedItems = {};

  shoppingList.forEach(function (item) {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });

  // Render items for each category
  for (let category in categorizedItems) {
    const categoryItems = categorizedItems[category];
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("cat-container");
    categoryContainer.innerHTML = `<h2 class="cat-header">${category}</h2>`;

    categoryItems.forEach(function (item) {
      const listItem = document.createElement("div");
      listItem.innerHTML = `
          <div class="item-container" id=${item.id}>
              <h3>${item.name}<span class="quant-span">x (${item.quantity})</span></h3> 
              <p>${item.category}</p>
              <button id=${item.id} class="remove-btn">remove</button>
          </div>
      `;
      categoryContainer.appendChild(listItem);
    });
    shoppingListElement.appendChild(categoryContainer);
  }

  // REMOVE ITEM BTN
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.removeEventListener("click", removeItem);
    button.addEventListener("click", removeItem);
  });
}

// CREATE RANDOM ID

const randomChars = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "+",
  "/",
  "@",
  ";",
  "-",
  ">",
  "<",
];

function removeItem(e) {
  // REMOVE ITEM FROM LIST
  const identItem = e.target.id;
  const findObject = shoppingList.findIndex((obj) => obj.id === identItem);
  if (findObject > -1) {
    shoppingList.splice(findObject, 1);
  }
  console.log("new", shoppingList);

  // RE-RENDER LIST
  renderItems();
}

// RANDOM ID FUNCTION

function generateRandomId() {
  let randomId = "";
  for (let i = 0; i < 8; i++) {
    let randomIndex = Math.floor(Math.random() * randomChars.length);
    randomId += randomChars[randomIndex];
  }
  return randomId;
}

// CLEAR VALUES FUNCTION

function clearValues() {
  itemInput.value = "";
  selectCategory.value = "";
  quantInput.value = "";
}

// Call renderItems initially
renderItems();

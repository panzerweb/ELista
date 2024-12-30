const parentList = document.getElementById("parent-column");
let totalAmount = document.getElementById('totalAmount'); // The span element of total amount

let priceArray = [];
let itemList = [];

// Load existing items from local storage when the page loads
window.onload = () => {
    const storedItems = JSON.parse(localStorage.getItem('shopping-list')) || [];
    itemList = storedItems;
    priceArray = storedItems.map(item => item.total); // Populate the price array
    renderAllItems(); // Render all items on page load
    updateTotalAmount(); // Update the total amount
};

// Press the Add button
function addItem() {
    let itemInput = document.getElementById("shop_item"); // The input for item name
    let priceInput = document.getElementById("shop_price"); // The input for item price
    let quantityInput = document.getElementById("shop_qty"); // The input for item quantity

    // Access input values
    let itemValue = itemInput.value.trim();
    let priceValue = parseFloat(priceInput.value);
    let qtyValue = parseInt(quantityInput.value);

    if (!itemValue || isNaN(priceValue) || isNaN(qtyValue) || qtyValue <= 0 || priceValue <= 0) {
        alert("Please provide valid inputs for all fields.");
        return;
    }

    let totalPrice = priceValue * qtyValue;

    let newShopItem = {
        name: itemValue,
        price: priceValue,
        qty: qtyValue,
        total: totalPrice,
    };

    // Add the new item to the list and local storage
    itemList.push(newShopItem);
    priceArray.push(totalPrice);
    localStorage.setItem('shopping-list', JSON.stringify(itemList));

    renderSingleItem(newShopItem); // Render only the new item
    updateTotalAmount(); // Update the total amount displayed

    // Clear input fields
    itemInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}

// Function to render all items from the list
function renderAllItems() {
    parentList.innerHTML = ""; // Clear the parent list
    itemList.forEach(item => {
        renderSingleItem(item);
    });
}

// Function to render a single item
function renderSingleItem(item) {
    let createItemDiv = document.createElement("div");
    createItemDiv.className = "d-flex justify-content-between gap-3 shadow p-3 border border-2 rounded-3";

    createItemDiv.innerHTML = `
        <div id="item-details">
            <h1>${item.name}</h1>
            <p>Price: Php ${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.qty}</p>
            <p>Total: Php ${item.total.toFixed(2)}</p>
        </div>
        <div class="align-self-center">
            <svg xmlns="http://www.w3.org/2000/svg" id="triggerId"
                style="cursor: pointer;"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" 
                width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>

            <div
                class="dropdown-menu dropdown-menu-start"
                aria-labelledby="triggerId"
            >
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item text-danger" href="#" onclick="deleteItem(${itemList.indexOf(item)})">Delete</a>
            </div>
        </div>
    `;

    parentList.appendChild(createItemDiv); // Add the item div to the parent list
}

// Function to update the total amount
function updateTotalAmount() {
    let sumOfPrices = priceArray.reduce((acc, currVal) => acc + currVal, 0);
    totalAmount.textContent = sumOfPrices.toFixed(2);
}

// Function to delete an item
function deleteItem(index) {
    priceArray.splice(index, 1); // Remove the total price of the item
    itemList.splice(index, 1); // Remove the item from the list
    localStorage.setItem('shopping-list', JSON.stringify(itemList)); // Update local storage
    renderAllItems(); // Re-render all items
    updateTotalAmount(); // Update the total amount displayed
}

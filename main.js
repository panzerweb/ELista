const add_item = document.getElementById("add_item");
const parentList = document.getElementById("parent-column");

//Press the Add button
add_item.addEventListener("click", function () {
    let itemInput = document.getElementById("shop_item"); // The input for item name
    let priceInput = document.getElementById("shop_price"); // The input for item price
    let quantityInput = document.getElementById("shop_qty"); // The input for item quantity
    

    // Create the parent Element as a div
    let createItemDiv = document.createElement("div");
    createItemDiv.className = "d-flex justify-content-between gap-3 shadow p-3 border border-2 rounded-3";

    // Add inner HTML for dropdown and placeholder for item details
    createItemDiv.innerHTML = `
        <div id="item-details"></div>
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
                <a class="dropdown-item text-danger" href="#" onclick="deleteItem()">Delete</a>
            </div>
        </div>
    `;

    // Access the "item-details" div after the parent div is created
    let parentDivElement = createItemDiv.querySelector("#item-details");

    // Access input values
    let itemValue = itemInput.value;
    let priceValue = parseFloat(priceInput.value);
    let qtyValue = parseInt(quantityInput.value);

    let totalPrice = priceValue * qtyValue; //Calculate Total Price

    // Create elements for name and price, and quantity
    let createName = document.createElement("h1");
    createName.textContent = `${itemValue}`;

    let createPrice = document.createElement("p");
    createPrice.textContent = `Price: Php ${totalPrice.toFixed(2)}`;

    let createQty = document.createElement("p");
    createQty.textContent = `Qty: ${qtyValue}`;

    // Append name and price to the item-details div
    parentDivElement.appendChild(createName);
    parentDivElement.appendChild(createPrice);
    parentDivElement.appendChild(createQty);

    // Append the parent div to the parent list
    parentList.appendChild(createItemDiv);
});

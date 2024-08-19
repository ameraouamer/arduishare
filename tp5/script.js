let products = [];

function addProduct() {
    const productName = document.getElementById("product-name").value.trim();
    const productQuantity = parseInt(document.getElementById("product-quantity").value);
    const productPrice = parseFloat(document.getElementById("product-price").value);

    if (productName === "" || isNaN(productQuantity) || isNaN(productPrice) || productQuantity <= 0 || productPrice <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    const product = {
        name: productName,
        quantity: productQuantity,
        price: productPrice
    };

    products.push(product);

    updateProductList();
    updateSummary();
    clearInputFields();
}

function updateProductList() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="product-details" id="details-${index}" onclick="editProduct(${index})">${product.name}, ${product.quantity}, ${product.price}</span>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="removeProduct(${index})">Remove</button>`;
        productList.appendChild(li);
    });
}

function updateSummary() {
    const totalProducts = products.length;
    const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
    const totalAmount = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

    document.getElementById("total-products").textContent = totalProducts;
    document.getElementById("total-quantity").textContent = totalQuantity;
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
}

function clearInputFields() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-price").value = "";
}

function clearEditProductFields(index) {
    const detailsElement = document.getElementById(`details-${index}`);
    const [productName, productQuantity, productPrice] = detailsElement.textContent.split(", ");

    detailsElement.innerHTML = `${productName}, ${productQuantity}, ${productPrice}`;

    // Remove the "Apply" button
    const li = detailsElement.parentElement;
    const applyButton = li.querySelector(".apply-button");
    applyButton.remove();
}

function editProduct(index) {
    const detailsElement = document.getElementById(`details-${index}`);
    const [productName, productQuantity, productPrice] = detailsElement.textContent.split(", ");

    detailsElement.innerHTML = `<input type="text" id="edit-details-${index}" value="${productName}, ${productQuantity}, ${productPrice}" onclick="event.stopPropagation();">`;

    // Add an "Apply" button for the user to confirm changes
    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";
    applyButton.className = "apply-button"; // Add a class for easier selection
    applyButton.onclick = function() {
        applyChanges(index);
    };

    // Replace the "Edit" button with the "Apply" button
    const li = detailsElement.parentElement;
    const editButton = li.querySelector("button");
    li.insertBefore(applyButton, editButton);
    editButton.style.display = "none"; // Hide the "Edit" button
}

function applyChanges(index) {
    const editedDetails = document.getElementById(`edit-details-${index}`).value.trim();
    const [newName, newQuantity, newPrice] = editedDetails.split(", ");

    if (newName === "" || isNaN(newQuantity) || isNaN(newPrice) || newQuantity <= 0 || newPrice <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    products[index].name = newName;
    products[index].quantity = parseInt(newQuantity);
    products[index].price = parseFloat(newPrice);

    updateProductList();
    updateSummary();
    clearEditProductFields(index);
}

function removeProduct(index) {
    const isConfirmed = confirm("Are you sure you want to remove this product?");
    if (isConfirmed) {
        products.splice(index, 1);
        updateProductList();
        updateSummary();
    }
}
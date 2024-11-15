// Get the parent container holding all product cards
const productCards = document.getElementById("product-cards");

// Function to update total price
function updateTotal() {
    const quantities = document.querySelectorAll(".qte");
    const prices = document.querySelectorAll(".price");

    let total = 0;
    quantities.forEach((qte, i) => {
        total += parseInt(qte.innerText) * parseFloat(prices[i].innerText);
    });

    document.querySelector(".totalprice").innerText = `$${total.toFixed(2)}`;
}

// Event delegation for actions
productCards.addEventListener("click", (e) => {
    const target = e.target;

    // Increment quantity
    if (target.classList.contains("fa-plus")) {
        const quantity = target.parentNode.querySelector(".qte"); // Find quantity in the same action section
        quantity.innerText = parseInt(quantity.innerText) + 1;
        updateTotal();
    }

    // Decrement quantity
    if (target.classList.contains("fa-minus")) {
        const quantity = target.parentNode.querySelector(".qte"); // Find quantity in the same action section
        if (parseInt(quantity.innerText) > 0) {
            quantity.innerText = parseInt(quantity.innerText) - 1;
            updateTotal();
        }
    }

    // Additional functionality: Toggle favorite
    if (target.classList.contains("fa-heart")) {
        target.style.color = target.style.color === "red" ? "black" : "red";
    }

    // Remove card
    if (target.classList.contains("fa-trash")) {
        const card = target.closest(".card");
        card.remove(); // Remove the entire card
        updateTotal();
    }

    // Add to cart
    if (target.classList.contains("add-to-cart")) {
        const card = target.closest(".card");
        const price = parseFloat(card.querySelector(".price").innerText);
        const quantity = parseInt(card.querySelector(".qte").innerText);

        if (quantity > 0) {
            totalItems += quantity;
            totalAmount += price * quantity;

            // Reset quantity on card
            card.querySelector(".qte").innerText = 0;

            updateCartSummary();
            updateTotal();
        } else {
            alert("Veuillez sélectionner une quantité avant d'ajouter au panier !");
        }
    }
});

// Update external cart summary
function updateCartSummary() {
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");

    cartItems.innerText = totalItems;
    cartTotal.innerText = `$${totalAmount.toFixed(2)}`;
}



// External cart summary variables
let totalItems = 0; // Total items in the cart
let totalAmount = 0; // Total price of items in the cart

// Function to update the external cart summary
function updateCartSummary() {
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");

    cartItems.innerText = totalItems;
    cartTotal.innerText = `$${totalAmount.toFixed(2)}`;
}

// Event listener for actions
productCards.addEventListener("click", (e) => {
    const target = e.target;

    // Add to cart
    if (target.classList.contains("add-to-cart")) {
        const card = target.closest(".card");
        const price = parseFloat(card.querySelector(".price").innerText);
        const quantity = parseInt(card.querySelector(".qte").innerText);

        if (quantity > 0) {
            // Update cart totals
            totalItems += quantity;
            totalAmount += price * quantity;

            // Reset card quantity
            card.querySelector(".qte").innerText = 0;

            // Update external cart and total price
            updateCartSummary();
            updateTotal();
        } else {
            alert("Veuillez sélectionner une quantité avant d'ajouter au panier !");
        }
    }

    // Remove card (adjust external cart)
    if (target.classList.contains("fa-trash")) {
        const card = target.closest(".card");
        const price = parseFloat(card.querySelector(".price").innerText);
        const quantity = parseInt(card.querySelector(".qte").innerText);

        // Adjust external cart totals
        totalItems -= quantity;
        totalAmount -= price * quantity;

        card.remove(); // Remove the card
        updateCartSummary();
        updateTotal();
    }
});

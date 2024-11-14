// Selecting necessary elements
// Collect all elements with specific icons into arrays to manage actions for each product card.
const favs = Array.from(document.querySelectorAll(".fa-heart"));   // Array of favorite icons (hearts) for each card
const deleteBtns = Array.from(document.querySelectorAll(".fa-trash")); // Array of delete icons (trash cans) for each card
const plusBtns = Array.from(document.querySelectorAll(".fa-plus"));  // Array of plus icons for increasing quantity
const minusBtns = Array.from(document.querySelectorAll(".fa-minus")); // Array of minus icons for decreasing quantity
const cards = Array.from(document.querySelectorAll(".card"));        // Array of product cards for removal or other actions

// Function to update total price
function updateTotal() {
    // Collect all quantity and price elements from the DOM
    let quantities = Array.from(document.querySelectorAll(".qte")); // Array of quantity displays for each card
    let prices = Array.from(document.querySelectorAll(".price"));   // Array of price displays for each card
    
    // Initialize total price to zero
    let total = 0;

    // Loop through each quantity, calculate the cost for each card, and add it to the total
    quantities.forEach((qte, i) => {
        total += parseInt(qte.innerHTML) * parseFloat(prices[i].innerHTML); // Calculate quantity * price for each product
    });

    // Update the total price display in the DOM
    document.querySelector(".totalprice").innerHTML = total;
}

// Toggle favorite color
// Adds click event to each favorite icon to toggle its color between red (favorite) and black (not favorite).
favs.forEach((fav) => {
    fav.addEventListener("click", () => {
        fav.style.color = fav.style.color !== "red" ? "red" : "black"; // If not red, make red; otherwise, make black
    });
});

// Remove card
// Adds click event to each delete button to remove the associated card from the DOM.
deleteBtns.forEach((deleteBtn, i) => {
    deleteBtn.addEventListener("click", () => {
        cards[i].remove();     // Remove the card element corresponding to the delete button
        updateTotal();         // Recalculate the total price after removing the card
    });
});

// Increment quantity
// Adds click event to each plus button to increase the quantity displayed and update the total price.
plusBtns.forEach((plus) => {
    plus.addEventListener("click", () => {
        plus.nextElementSibling.innerHTML++; // Increase the quantity number displayed next to the plus button
        updateTotal();                       // Recalculate the total price with the new quantity
    });
});

// Decrement quantity
// Adds click event to each minus button to decrease the quantity displayed, ensuring it doesn’t go below zero, and updates the total.
minusBtns.forEach((minus) => {
    minus.addEventListener("click", () => {
        if (minus.previousElementSibling.innerHTML > 0) { // Check if quantity is above zero
            minus.previousElementSibling.innerHTML--;    // Decrease quantity number displayed next to the minus button
            updateTotal();                               // Recalculate the total price with the new quantity
        }
    });
});

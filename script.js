// ------------------------------ FUNCTIONS SECTION ------------------------------ \\

// Function to check for card validity

let firstCard = null; // Variables to store card click events
let secondCard = null;

function cardMatching(card) {

    if (!firstCard) { // !null will return true, so the card clicked will become the first card
        firstCard = card;
        return;
    }
    
    secondCard = card; // Since firstCard now has data, !<value> will return false, so the second card clicked will become secondCard
    
    // Function will reset the first card if the same card is clicked twice
    if (card === firstCard) {
        console.log("The same card has been clicked! Please click different cards.");
        firstCard = null;
        return;
    }

    // Comparing data-values
    if (firstCard.dataset.value === secondCard.dataset.value) {
        console.log("It's a match!");
        // FOR ANDREW: After the cards flip, make them stay on the other side here
    } else {
        console.log("Not a match!")
        // FOR ANDREW: After the cards flip, make them go back to the other side here
    }

    firstCard = null; // Resetting the variables after each check
    secondCard = null;
}

// ------------------------------ CARD CLICK EVENT HANDLER ------------------------------ \\

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function(event) {
        event.preventDefault(); // Stops the browser from reloading each time a card is clicked
        console.log("A card was clicked!"); // Confirms a card was clicked

        // FOR ANDREW: You can add the card flipping animations here
        
        cardMatching(event.currentTarget); // The card clicked will become the argument for the function checking for matching cards
    })
})

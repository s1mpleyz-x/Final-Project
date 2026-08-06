// ------------------------------ ANIMATION FUNCTIONS ------------------------------ \\
 
// Function to flip cards back if they don't match
function flipBack(card1, card2) {
  // Add shake animation class
  card1.classList.add('no-match');
  card2.classList.add('no-match');
  
  // Wait 1 second, then remove the 'flipped' class
  setTimeout(() => {
    card1.classList.remove('flipped'); // Card flips back down
    card2.classList.remove('flipped'); // Card flips back down
    
    // Remove the shake animation class after it's done
    card1.classList.remove('no-match');
    card2.classList.remove('no-match');
  }, 1000); // 1000ms = 1 second
}
 
// Function to keep cards flipped if they match
function keepFlipped(card1, card2) {
  // Add 'matched' class to both cards
  // This keeps them flipped and adds a green glow effect (from CSS)
  card1.classList.add('matched');
  card2.classList.add('matched');
  
  // Disable clicking on matched cards
  card1.style.pointerEvents = 'none';
  card2.style.pointerEvents = 'none';
}
// ------------------------------ EVENT HANDLERS SECTION ------------------------------ \\
 
// Get all cards from the board
const cards = document.querySelectorAll('.card');
 
// Add click listener to each card
cards.forEach(card => {
  card.addEventListener('click', () => {
    // Check if card is already flipped or matched (to avoid double-clicking)
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
      return; // Do nothing if already flipped or matched
    }
    
    // ADD FLIP ANIMATION: Add 'flipped' class to show the logo
    card.classList.add('flipped');
    
    // Call the matching function to check if this card matches another
    cardMatching(card);
  });
});
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
        keepFlipped(firstCard, secondCard);
    } else {
        console.log("Not a match!")
        flipBack(firstCard, secondCard);
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

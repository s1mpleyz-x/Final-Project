<<<<<<< HEAD
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
=======
// ===== CREATING CARD STRUCTURE =====

// This function creates a single card with the 3D flip structure
function createCard(logo) {
  // Create the main card container
  const card = document.createElement('div');
  card.classList.add('card');
  
  // Create the inner wrapper (this is what will rotate)
  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');
  
  // Create the front face (the face-down side - stays blank/blue)
  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.textContent = '?'; // Or leave empty
  
  // Create the back face (the logo side - shows the image/emoji)
  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.textContent = logo; // The actual logo/emoji
  
  // Put front and back inside the inner wrapper
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  
  // Put the inner wrapper inside the main card
  card.appendChild(cardInner);
  
  // Return the finished card so we can add it to the board
  return card;
}

// Example: Create cards and add them to the board
const board = document.getElementById('board');
const logos = ['🦁', '🦁', '🦒', '🦒', '🐘', '🐘']; // Pairs of logos

logos.forEach(logo => {
  const card = createCard(logo);
  board.appendChild(card);
});


// ===== ANIMATION LOGIC =====

// Get all cards on the board
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
  });
});


// ===== WHEN CARDS DON'T MATCH =====

// Example: After user clicks 2 cards, check if they match
// If they DON'T match, run this:
function flipBack(card1, card2) {
  // Add shake animation class (optional)
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


// ===== WHEN CARDS MATCH =====

// Example: After user clicks 2 cards, check if they match
// If they DO match, run this:
function keepFlipped(card1, card2) {
  // Add 'matched' class to both cards
  // This keeps them flipped and adds a green glow effect (from CSS)
  card1.classList.add('matched');
  card2.classList.add('matched');
  
  // You can also disable clicking on matched cards
  card1.style.pointerEvents = 'none';
  card2.style.pointerEvents = 'none';
}


// ===== HOVER EFFECT =====

// The hover effect (slight scale up) is handled in CSS with :hover
// No JavaScript needed for that!


// ===== HOW TO USE THESE FUNCTIONS =====

/*
Example game flow:

1. User clicks card 1 → 'flipped' class added → card rotates to show logo
2. User clicks card 2 → 'flipped' class added → card rotates to show logo
3. Check if logos match:
   - If YES: call keepFlipped(card1, card2) → cards stay flipped with green glow
   - If NO: call flipBack(card1, card2) → cards shake and flip back after 1 sec

Your team's logic will check if logos match and call the right function.
*/
>>>>>>> 96a9247 (Add script.js with functional animated 3D flip structure)

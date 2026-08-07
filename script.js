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

  // NEW: Check if all cards are matched (game ended)
  checkIfGameEnded();
}
// ------------------------------ EVENT HANDLERS SECTION ------------------------------ \\

// Get all cards from the board
const cards = document.querySelectorAll('.card');
let moves = document.querySelector('#moves');
let finalMoves = document.querySelector('#finalMoves');
let moveCounter = 0;

// Add click listener to each card
cards.forEach(card => {
  card.addEventListener('click', () => {
    moveCounter++
    moves.textContent = moveCounter;
    finalMoves.textContent = moveCounter;
    // Check if card is already flipped or matched (to avoid double-clicking)
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
      return; // Do nothing if already flipped or matched
    }

    // ADD FLIP ANIMATION: Add 'flipped' class to show the logo
    card.classList.add('flipped');

    // Call the matching function to check if this card matches another
    cardMatching(card);
  })
});

// ------------------------------ ENDING SCREEN FUNCTIONS ------------------------------ \\

// Function to check if all cards are matched
function checkIfGameEnded() {
  const allCards = document.querySelectorAll('.card');
  const matchedCards = document.querySelectorAll('.card.matched');

  // If all cards are matched, show ending screen
  if (allCards.length === matchedCards.length) {
    moveCounter = 0;
    showEndingScreen();
  }
}

// Function to show the ending screen
function showEndingScreen() {
  const endingScreen = document.getElementById('endingScreen');
  const finalMoves = document.getElementById('finalMoves');

  // Display the current moves in the ending screen
  finalMoves.textContent = document.getElementById('moves').textContent;

  // Show the ending screen (remove hidden class)
  endingScreen.classList.remove('hidden');
}

// Function to hide the ending screen
function hideEndingScreen() {
  const endingScreen = document.getElementById('endingScreen');
  endingScreen.classList.add('hidden');
}


// ------------------------------ RESTART GAME FUNCTION ------------------------------ \\

function restartGame() {
  // Hide the ending screen
  hideEndingScreen();

  // Reset moves counter
  document.getElementById('moves').textContent = '0';
  moveCounter = 0;

  // Reset all cards - remove .flipped and .matched classes
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    card.classList.remove('flipped');
    card.classList.remove('matched');
    card.style.pointerEvents = 'auto'; // Re-enable clicking
  });

  // Reset matching variables
  firstCard = null;
  secondCard = null;
}


// ------------------------------ EVENT HANDLERS SECTION ------------------------------ \\

// Wait for HTML to load before running event listeners
document.addEventListener('DOMContentLoaded', () => {
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

  // Add click listener to restart button (header)
  document.getElementById('restartBtn').addEventListener('click', restartGame);

  // Add click listener to restart button (ending screen)
  document.getElementById('endingRestartBtn').addEventListener('click', restartGame);
});


// ------------------------------ MATCHING LOGIC SECTION ------------------------------ \\

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
    firstCard.classList.remove('flipped'); // Flip it back
    firstCard = null;
    return;
  }

  // Comparing data-values
  if (firstCard.dataset.value === secondCard.dataset.value) {
    console.log("It's a match!");
    // CARDS MATCH: Keep them flipped with green glow
    keepFlipped(firstCard, secondCard);
  } else {
    console.log("Not a match!")
    // CARDS DON'T MATCH: Flip them back after 1 second with shake animation
    flipBack(firstCard, secondCard);
  }

  firstCard = null; // Resetting the variables after each check
  secondCard = null;
}

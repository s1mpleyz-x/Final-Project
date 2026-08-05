// ------------------------------ CARD CLICK EVENT HANDLER ------------------------------ \\

const cards = document.querySelectorAll(".card");
const restartButton = document.getElementById("restartBtn");

cards.forEach(card => {
    card.addEventListener("click", function(event) {
        event.preventDefault(); // Stops the browser from reloading each time a card is clicked
        console.log("A card was clicked!"); // Confirms a card was clicked

        let cardClicked = event.currentTarget.id;
        console.log(cardClicked);
    })
})
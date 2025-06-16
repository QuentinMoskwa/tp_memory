const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstReturnedCard = null;
let secondReturnedCard = null;

// Card data -> name, image
cards = [
{ name: "repo1", image: "img/1.png" },
{ name: "repo2", image: "img/2.png" },
{ name: "repo3", image: "img/3.png" },
{ name: "repo4", image: "img/4.png" },
{ name: "repo5", image: "img/5.png" },
{ name: "repo6", image: "img/6.png" },
{ name: "repo7", image: "img/7.png" },
{ name: "repo8", image: "img/8.png" },
];

cards = cards.concat(cards);

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
    for (let card of cards) {
        const cardFront = document.createElement("div");
        cardFront.classList.add("card");
        cardFront.setAttribute("data-name", card.name);
        cardFront.innerHTML = `
        <div class="recto">
        <img class="front-image" src=${card.image} />
        </div>
        <div class="verso"></div>
        `;
        gridContainer.appendChild(cardFront);
        cardFront.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (this === firstReturnedCard) return;

    this.classList.add("flipped");

    if (!firstReturnedCard) {
        firstReturnedCard = this;
        return;
    }
    secondReturnedCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstReturnedCard.dataset.name === secondReturnedCard.dataset.name;
    
    if(isMatch) {
        firstReturnedCard.removeEventListener("click", flipCard);
        secondReturnedCard.removeEventListener("click", flipCard);
        firstReturnedCard = null;
        secondReturnedCard = null;
    }
    else {
        setTimeout(() => {
        firstReturnedCard.classList.remove("flipped");
        secondReturnedCard.classList.remove("flipped");
        firstReturnedCard = null;
        secondReturnedCard = null;
        }, 1000);
    }

}


function launchGame() {
    shuffleCards();
    generateCards();
}

launchGame();
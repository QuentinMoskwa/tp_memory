const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstReturnedCard = null;
let secondReturnedCard = null;
let lock = false;


fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    launchGame();
  });

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
        <img class="recto-image" src=${card.image} />
        </div>
        <div class="verso"></div>
        `;
        gridContainer.appendChild(cardFront);
        cardFront.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lock) return;
    if (this === firstReturnedCard) return;

    this.classList.add("flipped");

    if (!firstReturnedCard) {
        firstReturnedCard = this;
        return;
    }
    secondReturnedCard = this;

    lock = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstReturnedCard.dataset.name === secondReturnedCard.dataset.name;
    
    if(isMatch) {
        firstReturnedCard.removeEventListener("click", flipCard);
        secondReturnedCard.removeEventListener("click", flipCard);
        resetBoard();
    }
    else {
        setTimeout(() => {
        firstReturnedCard.classList.remove("flipped");
        secondReturnedCard.classList.remove("flipped");
        resetBoard();
        }, 1000);
    }

}

function resetBoard() {
    firstReturnedCard = null;
    secondReturnedCard = null;
    lock = false;
}


function launchGame() {
    shuffleCards();
    generateCards();
}

launchGame();
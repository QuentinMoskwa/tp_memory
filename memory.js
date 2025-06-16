const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstReturnedCard = null;
let secondReturnedCard = null;

// Card data -> name, image
cards = [
{ name: "repo1", image: "img/1.png" },
{ name: "repo2", image: "img/2.png" },
{ name: "repo3", image: "img/3.png" },
{ name: "repo4", image: "img/4.png" }
];



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
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    
    if(isMatch) {
    firstReturnedCard.removeEventListener("click", flipCard);
    secondReturnedCard.removeEventListener("click", flipCard);
    }
    else {
        setTimeout(() => {
        firstReturnedCard.classList.remove("flipped");
        secondReturnedCard.classList.remove("flipped");
        }, 1000);
    }
}

generateCards();
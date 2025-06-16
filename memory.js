const gridContainer = document.querySelector(".grid-container");
let cards = [];

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
    }
}

generateCards();
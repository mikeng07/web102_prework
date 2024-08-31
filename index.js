/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        // Step 1: Loop over each game in the array
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Step 2: Create a new div element for the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Step 3: Set the inner HTML of the div to display the game's info
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // Step 4: Append the newly created div to the games-container
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

// Step 1: Calculate total number of individual contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// Update the contributions card with the result
contributionsCard.innerHTML = totalContributions.toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
// Step 2: Calculate total amount of money pledged
const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Update the raised card with the result and format it as a currency
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
// Step 3: Display total number of games
const totalGames = GAMES_JSON.length;

// Update the games card with the total number of games
gamesCard.innerHTML = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

      // Use filter to get the unfunded games
      const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
      // Clear the current game list on the page
      deleteChildElements(gamesContainer);
  
      // Add the filtered games to the page
      addGamesToPage(unfundedGames);
    // use the function we previously created to add the unfunded games to the DOM
      console.log(unfundedGames.length)

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
     // Use filter to get the funded games
     const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    
     // Clear the current game list on the page
     deleteChildElements(gamesContainer);
 
     // Add the filtered games to the page
     addGamesToPage(fundedGames);
     console.log(fundedGames.length)
    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    // Clear the current game list on the page
    deleteChildElements(gamesContainer);

    // Add all the games to the page
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Add event listeners to the buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// Step 1: Count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
// Step 2: Create the template string
const summaryString = `A total of $${totalPledged.toLocaleString()} has been raised for ${GAMES_JSON.length} game${GAMES_JSON.length > 1 ? 's' : ''}. ${unfundedGamesCount} game${unfundedGamesCount === 1 ? ' remains' : 's remain'} unfunded.`;

// create a new DOM element containing the template string and append it to the description container
// Step 3: Create a new paragraph element and add it to the descriptionContainer
const summaryParagraph = document.createElement("p");
summaryParagraph.textContent = summaryString;
descriptionContainer.appendChild(summaryParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...rest] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = topGame.name;
firstGameContainer.appendChild(firstGameElement);
// do the same for the runner up item

const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
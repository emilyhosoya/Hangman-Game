//////////// GAME SETUP ////////////

// set alphabet as array
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

console.log("Valid alphabet letters: " + alphabet);


// create word list
var wordList = ["Arapahoe Basin", "Aspen Highlands", "Aspen Mountain", "Beaver Creek", "Breckenridge", "Buttermilk", "Chapman Hill Ski Area", "Copper Mountain", "Crested Butte", "Echo Mountain Park", "Eldora", "Hesperus Ski Area", "Howelsen Hill", "Kendall Mountain", "Keystone", "Loveland Basin", "Loveland Valley", "Monarch Mountain", "Powderhorn Resort", "Purgatory Resort", "Silverton Mountain", "Ski Cooper", "Ski Granby Ranch", "Snowmass", "Steamboat", "Sunlight", "Telluride", "Vail", "Winter Park", "Mary Jane", "Wolf Creek"];

console.log("All possible words: " + wordList);


// get random word
var randomWord = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();

console.log("A word picked at random: " + randomWord);

// turn randomword into an array
var randomLetters = randomWord.split('');

console.log("The random word's characters: " + randomLetters);

var randomBlanks = [];


// if an item matches an item in alphabet array, then add '_' to randomBlanks
// else if the character is a " ", add " " to randomBlanks

for (var i = 0; i < randomLetters.length; i++) {
    if (alphabet.indexOf(randomLetters[i]) !== -1) {
        randomBlanks.push("_");
    } else {
        randomBlanks.push(" ");
    }
    
}

console.log("The mysterious random word: " + randomBlanks);


var wins = 0;
var guessesLeft = 20;

console.log("You have " + wins + " wins and " + guessesLeft + " guesses left.");


var lettersGuessed = [];

console.log("The letters you have guessed are: " + lettersGuessed);





//////////// GAME PLAY ////////////

console.log("Type a letter to begin guessing!");

// store the indices of each matching letter
var matchingLetters = [];

document.onkeyup = function(event) {
    var currentGuess = event.key.toUpperCase();

    // make sure the player submits a letter
    function isValidGuess() {
        if (alphabet.indexOf(currentGuess) !== -1) {
            console.log("Your guess: " + currentGuess);
            isCorrectGuess();
        } else {
            console.log("That is not a letter!");
        }
    }

    // see if the letter is within the answer
    function isCorrectGuess() {
        
        // for each item in randomLetters, check if it matches currentGuess
        for (i = 0; i < randomLetters.length; i++)  {            
            if (currentGuess === randomLetters[i]) {    
            // store each matching letter's index from randomLetters in matchingLetters
            matchingLetters.push(randomLetters.indexOf(randomLetters[i]));
            // change items at indices in randomBlanks to values at same indicies in randomLetters
            randomBlanks[i] = randomLetters[i];
            } 
        }

        if (randomLetters.indexOf(currentGuess) !== -1) {
            console.log("Correct guess");
        } else {
            console.log("That letter is not part of the answer!");
            lettersGuessed.push(currentGuess);
            console.log("The letters you have guessed are: " + lettersGuessed);
        }

        guessesLeft--;
        console.log("You have " + guessesLeft + " guesses left.");
        console.log("The mysterious random word: " + randomBlanks);
    }

    isValidGuess();

    // if player guesses all letters, add 1 to wins
    if ((randomBlanks.indexOf("_") === -1) && (guessesLeft > 0)) {
        wins++;
        console.log("You win! Win count: " + wins + ". Press any key to play again.");
    } else if (guessesLeft === 0) {
        console.log("No win this time. Press any key to play again.");
    }

};



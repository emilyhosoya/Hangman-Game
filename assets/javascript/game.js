//////////// GAME SETUP ////////////

// set alphabet as array
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

console.log("Valid alphabet letters: " + alphabet);


// create word list
var wordList = ["Arapahoe Basin", "Aspen Highlands", "Aspen Mountain", "Beaver Creek", "Breckenridge", "Buttermilk", "Chapman Hill Ski Area", "Copper Mountain", "Crested Butte", "Echo Mountain Park", "Eldora", "Hesperus Ski Area", "Howelsen Hill", "Kendall Mountain", "Keystone", "Loveland Basin", "Loveland Valley", "Monarch Mountain", "Powderhorn Resort", "Purgatory Resort", "Silverton Mountain", "Ski Cooper", "Ski Granby Ranch", "Snowmass", "Steamboat", "Sunlight", "Telluride", "Vail", "Winter Park", "Mary Jane", "Wolf Creek"];

console.log("All possible words: " + wordList);

// wins
var wins = 0;

function showWins() {
    document.getElementById("wins").innerHTML = wins;
}

var guessesLeft = 10;

console.log("You have " + wins + " wins and " + guessesLeft + " guesses left.");

var randomBlanks = [];

function showGuessesLeft() {
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

function startGame() {

    randomBlanks = [];

    // get random word
    var randomWord = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();
    // TEST
    // var randomWord = "ABC";

    console.log("A word picked at random: " + randomWord);

    // turn randomword into an array
    var randomLetters = randomWord.split('');

    console.log("The random word's characters: " + randomLetters);

    

    function showRandomBlanks() {
        var randomBlankString = "";
        for (var i = 0; i < randomBlanks.length; i++) {
            randomBlankString += randomBlanks[i];
        }
        document.getElementById("letters").innerHTML = randomBlankString;
    }

    // if an item matches an item in alphabet array, then add '_' to randomBlanks
    // else if the character is a " ", add " " to randomBlanks
    for (var i = 0; i < randomLetters.length; i++) {
        if (alphabet.indexOf(randomLetters[i]) !== -1) {
            randomBlanks.push("_");
        } else {
            randomBlanks.push(" ");
        }
        showRandomBlanks();
    }

    console.log("The mysterious random word: " + randomBlanks);

var lettersGuessed = [];

console.log("The letters you have guessed are: " + lettersGuessed);

function showLettersGuessed() {
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed.toString();
}




//////////// GAME PLAY ////////////

console.log("Type a letter to begin guessing!");

// store the indices of each matching letter
var matchingLetters = [];

var currentGuess = "";

document.onkeyup = function(event) {
    currentGuess = event.key.toUpperCase();

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
            $("#letters").html(randomBlanks);
            }
        }

        if (((randomLetters.indexOf(currentGuess) !== -1) && (randomBlanks.indexOf(currentGuess) !== -1)) || (lettersGuessed.indexOf(currentGuess) !== -1)) {
            console.log("You've already guessed that letter!");      
        } else if (randomLetters.indexOf(currentGuess) !== -1) {
            console.log("Correct guess");
            createFirework(62,136,5,4,null,null,null,null,true,true);   
            guessesLeft--;     
        } else {
            console.log("That letter is not part of the answer!");
            lettersGuessed.push(currentGuess);
            console.log("The letters you have guessed are: " + lettersGuessed);
            guessesLeft--;
        }
        showLettersGuessed();

        
        console.log("You have " + guessesLeft + " guesses left.");
        console.log("The mysterious random word: " + randomBlanks);
    }

    showGuessesLeft();

    isValidGuess();

    // if player guesses all letters, add 1 to wins
    if ((randomBlanks.indexOf("_") === -1) && (guessesLeft > 0)) {
        wins++;
        showWins();
        console.log("You win! Win count: " + wins + ". Press any key to play again.");

        // a bunch of fireworks!
        var r = 4 + parseInt(Math.random()*16);
        for (var i=r; i--;) {
            setTimeout('createFirework(8,14,2,null,null,null,null,null,Math.random()>0.5,true)',(i+1) * (1+parseInt(Math.random()*1000)));
        };

        // set modal to say "You win! Play again?""
        document.getElementById("gameEndMessage").innerHTML = "<p class='lead'>You win! Play again?</p>";
        $('#gameEndModal').modal('show');

    // no more guesses left
    } else if (guessesLeft === 0) {
        console.log("No win this time. Press any key to play again.");
        // set modal to say "No win this time. Play again?""

        document.getElementById("gameEndMessage").innerHTML = "<p class='lead'>No win this time. Play again?</p>";
        $('#gameEndModal').modal('show');
    }

    // new game starts
    document.getElementById("newGameButton").onclick = function() {
        $('#gameEndModal').modal('hide');
        guessesLeft = 20;
        showGuessesLeft();
        lettersGuessed = [];
        showLettersGuessed();
        startGame();
    };
};
};

window.onload = function() {
    startGame();
    showWins();
    showGuessesLeft();
};


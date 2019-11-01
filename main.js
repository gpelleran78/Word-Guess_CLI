let inquirer = require("inquirer");
let Word = require("./Word.js");
let chalk = require("chalk");
let figlet = require("figlet");

let words = ["Jazz", "Rock", "Country", "Metal", "Classic", "Pop", "Rap", "Blues", "HipHop", "Disco", "Funk", "Techno"]

let guessesRemaining = 9;
let randomWord = " ";
let randomWordString = " ";
let currentWord = " ";
let wordGuessed = false;

figlet ("Hangman Game", function (err, data) {
    if (err) {
        console.log(chalk.red('Someting not right...'));
        console.dir(err);
        return;
    }
    console.log(data)
    console.log(chalk.blue("Welcome to the Hangman Game!"));
    console.log(chalk.blue("Theme is... Music Genre"));

    const howToPlay =
        chalk.bgYellow.gray.underline("==========================================================================================================" + "\r\n" +
        "How to play" + "\r\n" +
        "==========================================================================================================" + "\r\n" +
        "When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
        "Keep guessing letters. When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
        "If incorrect, the letter you guessed does not appear in the word." + "\r\n" +
        "For every incorrect guess, the number of guesses remaining decrease by 1." + "\r\n" +
        "If correct, the letter you guessed appears in the word." + "\r\n" +
        "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
        "If you run out of guesses before the entire word is revealed, you lose. Game over." + "\r\n" +
        "===========================================================================================================" + "\r\n" +
        "You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
        "===========================================================================================================")
    console.log(howToPlay);
    confirmStart();
});

function confirmStart() {
    inquirer.prompt([
        {
            type: "text",
            name: "playerName",
            message: "What is your name?"

        },
        {
            type: "confirm",
            name: "readyToPlay",
            message: "Are you Ready to play?",
            default: true,
        }
    ]).then(function (response) {
        if (response.readyToPlay) {
            console.log("Great! Welcome, " + response.playerName + ". Let's begin...");
            startGame();
        }
        else {
            console.log("Good bye, " + response.playerName + "! Come back soon.");
            return;
        }
    })
}

function startGame() {
    newWord();
    query();
}

let newWord = function () {
    randomWord = [Math.floor(Math.random() * words.length)];
    randomWordString = words[randomWord]
    currentWord = new Word(randomWordString);
    currentWord.wordDisplay();
    // console.log("\r")
};

function checked() {
    function guessedYes(letter) {
        return (letter.guessed === true)
    };

    let array = currentWord.letters;
    let test = array.every(guessedYes);

    if (test === true) {
        wordGuessed = true;
    }
}

function reset() {
    inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Would you like a new word?",
            choices: ["Yes", "No"]
        }
    ]).then(function (response) {
        if (response.continue === "Yes") {
            guessesRemaining = 9;
            wordGuessed = false;
            newWord();
            query();
        } else if (response.continue === "No") {
            console.log(chalk.magenta("See you next time!"));
        }
    })
}

let query = function () {
    checked();
    if (guessesRemaining > 0 && wordGuessed === false) {
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a Letter! "
            }
        ]).then(function (response) {
            if (randomWordString.indexOf(response.guess) !== -1) {
                currentWord.checked(response.guess);
                console.log(chalk.green("\nCORRECT!"))
                console.log("\nGuesses Remaining: " + guessesRemaining + "\n")
                currentWord.wordDisplay();
                // console.log("\r")
                query();
            }

            else if (randomWordString.indexOf(response.guess) === -1) {
                guessesRemaining--;
                console.log(chalk.red("\nINCORRECT!"));
                console.log("\nGuesses Remaining: " + guessesRemaining + "\n");
                currentWord.wordDisplay();
                // console.log("\r")
                query();
            }
        })
    }
    else if (guessesRemaining <= 0 && wordGuessed === false) {
        console.log(chalk.blue("Out of guesses!"));
        reset();
    }
    else if (guessesRemaining > 0 && wordGuessed === true) {
        console.log(chalk.cyan("You got it right!\n"));
        reset();
    }
}
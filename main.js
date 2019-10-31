const inquirer = require("inquirer");
const Word = require("./Word.js");
const Word = require("./letters.js");

let words = ["Jazz", "Rock", "Country", "Metal", "Classic", "Pop", "Rap", "Blues", "HipHop", "Disco", "Funck", "Techno"]

let guessesRemaining = 9;
let randomWord = " ";
let randomWordString = " ";
let currentWord = " ";
let wordGuessed = false;


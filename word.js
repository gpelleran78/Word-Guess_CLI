var Letters = require("./Letter.js");

var Word = function(word){
    this.letters = [];
    for (i in word){
        this.letters.push(new Letters(word[i]))
    };
    this.wordDisplay = function(){
        var display = [];
        for (i in this.letters){
            display.push(" " + this.letters[i].toString() + " ");
        }
        console.log(display.join(""));
    };
    this.checked = function(letter){
        for (i in this.letters){
            this.letters[i].guess(letter);
        }
    }
};

module.exports = Word;
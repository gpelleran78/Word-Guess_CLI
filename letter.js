let Letter = function(key){
    this.key = key;
    this.guessed = false;
    this.toString = function(){
        if (this.guessed === true) {
            display = this.key.toUpperCase();
            return display;
        } else if (this.guessed === false){
            display = "_"
            return display;
        }
    };
    this.guess = function(letter){
        if(letter === key){
            this.guessed = true;
        }
    };
};

module.exports = Letter;
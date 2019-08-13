$(document).ready(function() {
    var characters = [
        {
            name: "goku",
            image: "goku.jpg"
        },
        {
            name: "beerus",
            image: "beerus.jpg"
        },
        {
            name: "bulma",
            image: "bulma.jpg"
        },
        {
            name: "chichi",
            image: "chichi.jpg"
        },
        {
            name: "gohan",
            image: "gohan.jpeg"
        },
        {
            name: "goten",
            image: "goten.png"
        },
        {
            name: "trunks",
            image: "trunks.jpg"
        },
        {
            name: "vegeta",
            image: "vegeta.jpeg"
        },
        {
            name: "whis",
            image: "whis.jpeg"
        },
        {
            name: "zeno",
            image: "zeno.jpg"
        }
    ];
    var newWord = "";
    var wordLength = 0
    var input = [];
    var guess;
    var wrongLetters = [];
    var rightLetters = [];
    var wins = 0;
    var losses = 0;
    var remainingGuesses = 10;

    function startGame(){
        var randomWord = characters[Math.floor(Math.random() * characters.length)];
        newWord = randomWord.name;
        wordLength = newWord.length;
        console.log(`line 58 - random word: ${newWord}`);
        console.log(`line 59 - length of new word: ${wordLength}`);
        console.log(`line 60 - storeWord array: ${newWord}`);
        for(var i = 0; i < newWord.length; i++) {
            input.push(newWord[i].replace(/[a-z]/g, '_'));
        };
        console.log(`line 61 - input array, joined: ${input.join(" ")}`);
        $("#word").html(input.join(" "));
    }

    startGame();

    $(document).keyup(function(event) {
        guess = event.key
        console.log(guess);
        playerChoices(guess);
        playGame();
    })

    function playerChoices(letter) {
        var correctLetter = false;
        for(var i = 0; i < wordLength; i++) {
            if(letter === newWord[i]) {
                correctLetter = true;
            }

            if(correctLetter) {
                for(var i = 0; i < wordLength; i++) {
                    if(newWord[i] === letter) {
                        rightLetters[i] = letter;
                        console.log(`line 87 - rightLetters: ${rightLetters}`)
                    }
                }
            } else if (wrongLetters.includes(letter)){
                console.log("You have already guessed this letter");
            } else {
                wrongLetters.push(letter);
                remainingGuesses--;
            }
        }

    }

    function playGame() {
        $("#word").html(rightLetters.join(" "));
        $("#remainGuess").html(remainingGuesses);
        $("#wrong").html(wrongLetters.join(", "));
        console.log(`Correct guesses to string: ${rightLetters.join("")}, Current word: ${newWord}`);

        if(rightLetters.join("") === newWord) {
            wins++;
            $("#wins").html(wins);
        } else if(remainingGuesses === 0) {
            losses++;
            $("#losses").html(losses);
        }
    }

    
    
});
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
    var losingImage = { name: "losingImage", image: "game_over.png"}
    var newWord = "";
    var wordLength = 0
    var guess;
    var wrongLetters = [];
    var rightLetters = [];
    var wins = 0;
    var losses = 0;
    var remainingGuesses = 10;

    function startGame(){
        playerEntry();
        var randomWord = characters[Math.floor(Math.random() * characters.length)];
        newWord = randomWord.name;
        wordLength = newWord.length;
        console.log(`line 58 - random word: ${newWord}`);
        console.log(`line 59 - length of new word: ${wordLength}`);
        console.log(`line 60 - storeWord array: ${newWord}`);
        for(var i = 0; i < wordLength; i++) {
            rightLetters.push("_");
        };
        console.log(`line 61 - input array, joined: ${rightLetters.join(" ")}`);
        $("#word").html(rightLetters.join(" "));
    }

    startGame();

    function playerEntry() {
        $(document).keyup(function(event) {
            guess = event.key
            if(event.keyCode >= 65 && event.keyCode <= 90){
                console.log(guess);
                playerChoices(guess);
                playGame();
            } else {
                Swal.fire({
                    position: "top-center",
                    type: "warning",
                    title: "Entry must be a letter.",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        })
    }
    

    function playerChoices(letter) {
        var correctLetter = false;
        for(var i = 0; i < wordLength; i++) {
            if(letter === newWord[i]) {
                correctLetter = true;
            }
        }

            if(correctLetter) {
                for(var i = 0; i < wordLength; i++) {
                    if(newWord[i] === letter) {
                        rightLetters[i] = letter;
                        console.log(`line 87 - rightLetters: ${rightLetters}`)
                    }
                }
            } else if (wrongLetters.includes(letter)){
                Swal.fire({
                    position: "top-center",
                    type: "error",
                    title: "You have already guessed that letter.",
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                wrongLetters.push(letter);
                remainingGuesses--;
            }
    }

    function playGame() {
        $("#word").html(rightLetters.join(" "));
        $("#remainGuess").html(remainingGuesses);
        $("#wrong").html(wrongLetters.join(", "));
        console.log(`Correct guesses to string: ${rightLetters.join("")}, Current word: ${newWord}`);

        if(rightLetters.join("") === newWord) {
            $(document).off('keyup keydown keypress');
            wins++;
            $("#wins").html(wins);
            showImage();
        } else if(remainingGuesses === 0) {
            $(document).off('keyup keydown keypress');
            losses++;
            $("#losses").html(losses);
            showImage();
        }
    }

    $(".button").on("click", function() {
        input = [];
        wrongLetters = [];
        rightLetters = [];
        remainingGuesses = 10;
        startGame();
        $("#remainGuess").html(remainingGuesses);
        $("#wrong").html(wrongLetters.join(", "));
        $("#image").empty();

    });

    function showImage() {
        var img = $("<img style='width: 600px; margin-left: 10px'>");
        for(var i = 0; i < characters.length; i++) {
            if(newWord === characters[i].name) {
                img.attr("src", `./assets/images/${characters[i].image}`);
                $("#image").append(img);
            } else if(remainingGuesses === 0){
                img.attr("src", `./assets/images/${losingImage.image}`);
                $("#image").append(img);
            }
        }
    }
    
});
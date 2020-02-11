//variable for random generated pattern
var gamePattern = [];
//variable for user generated pattern
var userClickedPattern = [];
var buttonColour = ["red", "blue", "yellow", "green"];
var level = 0;
var toggleGame = false;


$(document).on('keypress', function () {
    if (!toggleGame) {
        nextSequence();
        toggleGame = true;
    }
})


$(".btn").click(function (event) {
    var userChosenColour = $(this).attr("id");

    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    // console.log(userChosenColour);
    playAudio(userChosenColour);
    if (toggleGame === true) {
        checkAnswer(userClickedPattern.length - 1);
    }
});
console.log(gamePattern);
console.log(level);



function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Benar");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        resetGame();
    }
}

function resetGame() {
    $('body').addClass("game-over");
    setTimeout(function () {
        $('body').removeClass("game-over");
        $("h1").text("Press A Key to Start");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        toggleGame = false;
    }, 200);
}

function nextSequence() {

    //reset the user pattern for the next level.
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNumber];
    $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

function playAudio(clickedButton) {

    switch (clickedButton) {
        case "red":
            var buttonSounds = new Audio('sounds/red.mp3');
            buttonSounds.play();
            break;
        case "blue":
            var buttonSounds = new Audio('sounds/blue.mp3');
            buttonSounds.play();
            break;
        case "green":
            var buttonSounds = new Audio('sounds/green.mp3');
            buttonSounds.play();
            break;
        case "yellow":
            var buttonSounds = new Audio('sounds/yellow.mp3');
            buttonSounds.play();
            break;

        default:
            break;
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (next) {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
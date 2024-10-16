var buttonColours = ["red", "blue", "green", "yellow"]; //creating an array with the colours

var gamePattern = []; // empty array to create a game pattern at random
var userClickedPattern = []; // creates an empty array

var started = false; // tracks whether the game has started or not
var level = 0; // tracks the level

$(document).keydown(function(){
    if (!started){ // if the game hasn't already been started
        $("#level-title").text("Level " + level); // game starts at level 0
        nextSequence();
        started = true; // if it's the first time the key is pressed then game has started
        
    }

});

$(".btn").click(function(){ // detect when any of the buttons are clicked and trigger a handler function

    var userChosenColour = $(this).attr("id"); // store the id of the button that got clicked
    userClickedPattern.push(userChosenColour); // adds the colour that was clicked to the user click pattern array

    playSound(userChosenColour); // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    animatePress(userChosenColour); // when a user clicks on a button it will flash
    // console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
        nextSequence();
        }, 1000);

    }

    } else {
        playSound("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200)
        startOver();
    }
};




function nextSequence(){ // function creates a random number between 0 and 3

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber]; // assigns a random colour from the list
    gamePattern.push(randomChosenColour); //adds the colour chosen to the end of the array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // selects the button with the same id as the random chosen colour

    playSound(randomChosenColour); // Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.

    
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    },100)
};

// plays the sounds when the button is clicked
function playSound(name){
    var audio = new Audio( 'sounds/' + name + '.mp3'); // plays the sound for the chosen button colour
    audio.play(); 
};


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};

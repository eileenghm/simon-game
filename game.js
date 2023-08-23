//alert("triggered")

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//start game, detect when pressed
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

//if any buttons are clicked 
$(".btn").click(function() {
    //get clicked button id
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level); //change title

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //select button with same id as randomNumber
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //play sound for the color button
    playSound(randomChosenColour)
}

//play sound for the color button
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//add animation to clicks
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); //add shadow
    //remove effect after 10seconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

//check user answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//restart
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
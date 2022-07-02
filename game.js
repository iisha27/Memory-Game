
var buttonColours=["red","blue","green","yellow"];

var userClickedPattern=[];

var gamePattern=[];

var started=false;
var level=0;
$(document).keypress(function(){
     if(!started){
         $("#level-title").text("level "+level);
          nextSequence();
          started=true;
     }
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  

}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
   // console.log(userClickedPattern);
   playSound(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed");
 $(".btn").addClass("pressed").delay(100).removeClass("pressed");
 setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
}, 100);

}
function checkAnswer(currentLevel){
 if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
     console.log("success");
     if (userClickedPattern.length === gamePattern.length){


        setTimeout(function () {
          nextSequence();
        }, 1000);

      

    } 
 }else{
     console.log("wrong");
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press any key to restart");
      startOver();
 }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
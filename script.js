var swan;
var hill;
var bkgd;
var maxScore = 770;
var maxUp = maxScore*Math.sin(16);
var maxRight = maxScore*Math.cos(16);
var currentScore = 0;

var currentQuestion = 0;
var questions = [
  ["Question 1", 100, 200, 1000],
  ["Question 2", 100, 200, 300],
  ["Question 3", 100, 200, 300],
  ["Question 4", 100, 200, 300]
];

$(document).ready(function(){
  console.log("init");
  swan = $('#swan');
  hill = $('#hill');
  bkgd = $('#background');

  displayQuestion();
  $('button').click(function(){
    fadeOutQuestion();
    var amount = parseInt(this.innerHTML.slice(1));
    move(amount);
    currentScore += amount;
  });
});

function fadeOutQuestion(){
  $('#answer1').attr('disabled', true);
  $('#answer2').attr('disabled', true);
  $('#answer3').attr('disabled', true);
  $('#questionText').animate({ opacity: 0 }, 200);
  $('#answer1').animate({ opacity: 0 }, 200);
  $('#answer2').animate({ opacity: 0 }, 200);
  $('#answer3').animate({ opacity: 0 }, 200);
}

function showQuestion(){
  $('#questionText').animate({ opacity: 1 }, 200);
  $('#answer1').animate({ opacity: 1 }, 200);
  $('#answer2').animate({ opacity: 1 }, 240);
  $('#answer3').animate({ opacity: 1 }, 280);
  $('button').removeAttr("disabled");
}

function move(amount){
  console.log(amount);
  if(currentScore + amount > maxScore){
    amount = maxScore+50-currentScore;
  }
  var swanPos = swan.position();
  var hillPos = hill.position();
  var time = 2000*(amount/(maxScore/5));
  swan.animate({ top: swanPos.top + (amount/maxScore)*maxUp }, time);
  hill.animate({ left: hillPos.left + (amount/maxScore)*maxRight }, time);
  bkgd.animate({ left: hillPos.left + (amount/maxScore)*maxRight }, time);
  setTimeout(displayQuestion, time+200);
}

function displayQuestion(){
  if(currentScore > maxScore){
    console.log("score too high");
    var $elem = $('#swan');
    $({deg: 0}).animate({deg: 1080}, {
        duration: 2000,
        step: function(now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)',
                top: $elem.position().top + now/10
            });
        }
    });
  }
  else{
    showQuestion();
    $('#questionText')[0].innerHTML = questions[currentQuestion][0];
    $('#answer1')[0].innerHTML = "&#163;" + questions[currentQuestion][1];
    $('#answer2')[0].innerHTML = "&#163;" + questions[currentQuestion][2];
    $('#answer3')[0].innerHTML = "&#163;" + questions[currentQuestion][3];
    currentQuestion += 1;
  }
}

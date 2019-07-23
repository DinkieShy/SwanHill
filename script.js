var swan;
var hill;
var bkgd;
var maxScore = 734;
var maxUp = maxScore*Math.sin(16);
var maxRight = maxScore*Math.cos(16);
var currentScore = 0;
var score = 0;
var maxPoints = 30;

var currentQuestion = 0;
var questions = [
  ["Food", 93, 108, 735],
  ["Social", 37, 52, 64],
  ["Travel", 47, 54, 60],
  ["Bills", 34, 44, 58],
  ["Books", 10, 15, 20],
  ["Clothes", 34, 41, 48],
  ["Mobile Phone", 18, 24, 32],
  ["Rent", 380, 406, 510]
];

$(document).ready(function(){
  console.log("init");
  swan = $('#swan');
  hill = $('#hill');
  bkgd = $('#background');

  scrollClouds();

  displayQuestion();
  $('#questionSection button').click(function(){
    fadeOutQuestion();
    var amount = parseInt(this.innerHTML.slice(1));
    move(amount);
    currentScore += amount;
  });

  $('#retry').click(function(){
    window.location.reload();
  });

  $('#submit').click(function(){
    var input = parseQueryString(window.location.search.slice(1));
    this.parent.postMessage(score, '*');
  });
});

function scrollClouds(){
  var sky = $('#sky');
  var time = 2000-1500*(currentScore/maxScore);
  if(sky.position().left <= -window.innerWidth){
    $('#sky').animate({ left: 0 }, 0);
  }
  else{
    $('#sky').animate({ left: sky.position().left - 15 }, time, "linear");
  }
  setTimeout(scrollClouds, time);
}

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
  var backgroundPos = bkgd.position();
  var time = 2000*(amount/(maxScore/5));
  swan.animate({ top: swanPos.top + ((amount/maxScore)*maxUp)/2 }, time);
  hill.animate({ left: hillPos.left + (amount/maxScore)*maxRight, top: hillPos.top - ((amount/maxScore)*maxUp)/2 }, time);
  //bkgd.animate({ left: backgroundPos.left + (amount/maxScore)*maxRight }, time);
  setTimeout(displayQuestion, time+200);
}

function showEndScreen(){
  if(score > 0){
    $('#resultText')[0].innerHTML = `Congratulations! You scored ${score} points!`;
    $('#resultBody')[0].innerHTML = `Either press submit to earn points, or retry to try and earn some more!`;
    $('#submit').removeAttr("disabled");
    $('#submit').removeClass("disabled");
  }
  else{
    $('#resultText')[0].innerHTML = `Oh no, you overspent and fell off!`;
    $('#resultBody')[0].innerHTML = `Press retry to have another go!`;
    $('#submit').attr("disabled", true);
    $('#submit').addClass("disabled");
  }
  $('#endScreen').animate({ left:0 }, 2000);
}

function displayQuestion(){
  if(currentScore > maxScore){
    console.log("score too high");
    var $elem = $('#swan');
    var topPos = $elem.position().top;
    var leftPos = $elem.position().left;
    $({deg: 0}).animate({deg: 1080}, {
        duration: 2000,
        step: function(now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)',
                top: topPos + now/4,
                left: leftPos + now/10
            });
        },
        complete: showEndScreen
    });
  }
  else{
    if(currentQuestion < questions.length){
      showQuestion();
      $('#questionText')[0].innerHTML = questions[currentQuestion][0];
      $('#answer1')[0].innerHTML = "&#163;" + questions[currentQuestion][1];
      $('#answer2')[0].innerHTML = "&#163;" + questions[currentQuestion][2];
      $('#answer3')[0].innerHTML = "&#163;" + questions[currentQuestion][3];
      currentQuestion += 1;
    }
    else{
      //end
      if(currentScore >= maxScore - 30){
        score = maxPoints
      }
      else{
        score = Math.round((currentScore/maxScore)*maxPoints);
      }
      showEndScreen();
    }
  }
}

function parseQueryString(query) {
  //From https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

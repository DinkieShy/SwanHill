var swan;
var hill;
var bkgd;
var maxScore = 770;
var maxUp = maxScore*Math.sin(16.2);
var maxRight = maxScore*Math.cos(16.2);
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
    var amount = parseInt(this.innerHTML);
  });
});

function displayQuestion(){
  $('#questionText')[0].innerHTML = questions[currentQuestion][0];
  $('#answer1')[0].innerHTML = questions[currentQuestion][1];
  $('#answer2')[0].innerHTML = questions[currentQuestion][2];
  $('#answer3')[0].innerHTML = questions[currentQuestion][3];
  currentQuestion += 1;
}

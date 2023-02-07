var i = 0;

// Crappy POC code

function prev() {
  i = Math.max(i - 1, 0);
  document.querySelector(".pixelart").src = images[i];
}

function next() {
  i = Math.min(i + 1, images.length - 1);
  document.querySelector(".pixelart").src = images[i];
}


var answer1 = 'night before christmas'
function checkAnswer(){
   var userAnswer = document.querySelector(".final-answer").value;
   var answerCorrect = userAnswer.toLowerCase() === answer1;
   var correct = document.querySelector(".correct");
   var incorrect = document.querySelector(".incorrect")
   incorrect.classList.add('hide');
   correct.classList.add('hide');
   if(answerCorrect){
    correct.classList.remove('hide');
    var container = document.querySelector('.image-container')
    var fireworks = new Fireworks.default(container)
    fireworks.start();
    setTimeout(function(){ fireworks.stop() }, 4000)
   } else {
    incorrect.classList.remove('hide');
   }
}


var imgYoto =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/0CYPYWVHYLURB3_wYr0tx0bUKYb4mgXTjn_8cx89ciU";

var imgNight =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/7buOLfEt-h1-axsTKzPvDAlLK6oi9U_4N0CUsmB0RYY";

var imgBee =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/Jc3p_I7ZHVjzDdkrakWZAvqPKPzJJah7ZiLzgcGKCsQ";

var imgFour =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/ceJFo6GR12is75P3dyESEnEq5Tqo_6MxpE96FDeMsq0";

var imgSanta =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/f8GZbRwTQPxfjTZ8b4yUUR7Tkqdb2xM7u0nXkpNUtEw";

var imgQuestion =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/UAQO5kbImNTPRcr2yywpPlR_MmzZtVsmhRUg6t5a_9s";

var images = [imgYoto, imgNight, imgBee, imgFour, imgSanta, imgQuestion];

// Init
document.querySelector(".pixelart").src = images[0];

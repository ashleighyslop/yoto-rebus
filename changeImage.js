var i = 0;
var game;
var steps;
var games;

var YOTO_FACE_STEP = {
  word: 'Night',
  pixelArtSrc: "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/0CYPYWVHYLURB3_wYr0tx0bUKYb4mgXTjn_8cx89ciU"
}

// Crappy POC code
function initGame(index) {
  // Reset images array:
  i = index || 0;
  game = games[i];
  steps = [YOTO_FACE_STEP].concat(game.steps);
  prev();

  // Heading:
  document.getElementById('heading').innerText = game.gameName;
}

function prev(e) {
  i = Math.max(i - 1, 0);
  console.log(i);
  document.querySelector(".pixelart").src = steps[i].pixelArtSrc;
}

function next(e) {
  i = Math.min(i + 1, steps.length - 1);
  console.log(i);
  document.querySelector(".pixelart").src = steps[i].pixelArtSrc;
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
    var container = document.querySelector('.fireworks')
    var fireworks = new Fireworks.default(container)
    container.classList.add('displayfireworks');
    fireworks.start();
    setTimeout(function(){ fireworks.stop(); container.classList.remove('displayfireworks') }, 8000)
   } else {
    incorrect.classList.remove('hide');
   }
}



var imgQuestion =
  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/UAQO5kbImNTPRcr2yywpPlR_MmzZtVsmhRUg6t5a_9s";




// Move this to JSON file or Fetch from CMS
var games = [
  {
      gameName: "Game 1",
      productName: "The night before christmas",
      productUrl: "https://uk.yotoplay.com/products/the-night-before-christmas-digital",
      steps: [
          {
              word: 'Night',
              pixelArtSrc:  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/7buOLfEt-h1-axsTKzPvDAlLK6oi9U_4N0CUsmB0RYY"
          },
          {
              word: 'Bee',
              pixelArtSrc:  "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/Jc3p_I7ZHVjzDdkrakWZAvqPKPzJJah7ZiLzgcGKCsQ"
          },
          {
              word: 'Four',
              pixelArtSrc: "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/ceJFo6GR12is75P3dyESEnEq5Tqo_6MxpE96FDeMsq0"
          },
          {
              word: 'Santa',
              pixelArtSrc: "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/f8GZbRwTQPxfjTZ8b4yUUR7Tkqdb2xM7u0nXkpNUtEw"
          },
      ]
  }
];


document.addEventListener('readystatechange', function(){
  fetchGames().then(json => {
    console.log('allGames', json.allGames);
    games = json.allGames;
    initGame(0);
  })
});

import './App.css';
import { useState, useEffect } from 'react';
import fetchGames from './cms';
import { Fireworks } from 'fireworks-js';

function App() {
  let games = [
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
  const YOTO_FACE_STEP = {
    word: 'Yoto face',
    pixelArtSrc: "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/0CYPYWVHYLURB3_wYr0tx0bUKYb4mgXTjn_8cx89ciU"
  }

  const QUESTION_STEP = {
    word: 'Question Mark',
    pixelArtSrc: "https://yoto-card-api-prod-media.s3.eu-west-2.amazonaws.com/yoto/UAQO5kbImNTPRcr2yywpPlR_MmzZtVsmhRUg6t5a_9s"
  }



  const [gameIndex, setGameIndex] = useState(0)
  const [index, setIndex] = useState(0);
  const [game, setGame] = useState(games[0])
  const [steps, setSteps] = useState([YOTO_FACE_STEP].concat(games[0].steps, [QUESTION_STEP]))
  const [answer, setAnswer] = useState('');

  const answer1 = 'night before christmas'
  const checkAnswer = () => {
    var userAnswer = document.querySelector(".final-answer").value;
    var answerCorrect = userAnswer.toLowerCase() === answer.toLowerCase();
    var correct = document.querySelector(".correct");
    var incorrect = document.querySelector(".incorrect")

    correct.classList.add('hide');
    if(answerCorrect){
     correct.classList.remove('hide');
     const container = document.querySelector('.fireworks')
     container.classList.add('displayfireworks');
     const fireworks = new Fireworks(container);
     const submitButton = document.querySelector('.submit');
     const checkButton = document.querySelector('.check');
      fireworks.start()
      setTimeout(function(){ fireworks.stop(); container.classList.remove('displayfireworks'); }, 3000)
      setTimeout(function(){correct.classList.add('hide');  document.querySelector(".final-answer").value = ' '}, 3000)
      //checkButton.classList.add('hide');correct.classList.remove('hide') 
      setGameIndex(gameIndex + 1);
      setIndex(0);
    } else {
      incorrect.classList.remove('hide');
      const elementToShake = document.querySelector('.final-answer');
      elementToShake.classList.add("shake")
      setTimeout(function(){
        elementToShake.classList.remove("shake");
        incorrect.classList.add('hide');
      }, 1000)
 }}




  useEffect(() =>{

    fetchGames().then(json => {
    console.log(json);
    games = json.allGames;
    setGame(games[gameIndex]);
    setSteps([YOTO_FACE_STEP].concat(games[gameIndex].steps, [QUESTION_STEP]));
    setAnswer(games[gameIndex].productName)
   })
   
    
  }, [gameIndex])


  const  prev = (e) =>{
    if(index === 0){
      setIndex(0)
    } else {
      setIndex(index - 1)
    }  
  }

  const next = (e) => {    
    if(index > steps.length - 1 || index === steps.length - 1  ){
      setIndex(steps.length - 1)
    } else {
      setIndex(index + 1)
    }
  }

  
  return (
    <div className="App">

  <div class="canvas">
      <div class="fireworks"></div>

      <h1 id="heading">Game {gameIndex + 1}</h1>

      <div class="game-container">
          <div class="image-container">
          <img class="player-image" src="https://www.datocms-assets.com/48136/1675793470-yoto-rebus-player.png"/>
          </div>
          <img class="pixelart" src={steps[index].pixelArtSrc}/>
          <button class="left-btn" onClick={prev}></button>
          <button class="right-btn" onClick={next}></button> 
      </div>


      <div class="form">

          <form name="rebus-answers">
          <input type="hidden" name="form-name" value="rebus-answers" />

          <p>
              <label>Name: <input type="text" name="name" required="true" /></label>
            </p>
          <div class="answer-area">
            <h2 class='h2'>Scratch Pad</h2>
            <div class='answer-boxes'>
            {steps.slice(2).map(i =>
              (<input class='input-box' type="text"/>)
            )}
            </div>
          </div>
          <p class="correct hide">Yaaaaaaay</p>
          <p class="incorrect hide">WRONG!</p>
            <label>Answer:<input type="text"  name="answer" class="final-answer" required="true"/></label>
              <p>
              {/* <button class="submit" type="submit">Send</button> */}
              </p>
              <button type="button" class="check" onClick={checkAnswer}>Check Answer</button>
          </form>
      </div>
  </div>

</div>
  );
}

export default App;



/*
 * Create a list that holds all of your cards
 */
 // Get deck
 var cardList = document.querySelector('.deck');
 // Get list of cards
 var cards = [].slice.call(cardList.children);
 //list of open cards
 var CurrentCards= [];
 var openedCards=[];
//timer
 let timercount = new Timer();
 function timer() {

     timercount.start();
     timercount.addEventListener('secondsUpdated', function (e) {

         let basicUsagetimer = document.querySelector('#basicUsage');
         basicUsagetimer.textContent = timercount.getTimeValues().toString();
     });
 };
 //restart the Game

 var restart = document.querySelector('.restart');
 timer();
 refrish();
 restart.addEventListener("click",refrish);
function refrish() {
  timercount.stop();
  setTimer();
  timercount.start();
  /*  var timer = new Timer();
   timer.start();
  timer.addEventListener('secondsUpdated', function (e) {
      $('#basicUsage').html(timer.getTimeValues().toString());
  });*/
  openedCards=[];
  CurrentCards= [];
  scards =shuffle(cards);
  cards.forEach((card, index) => {
    card.classList.remove('open', 'show', 'match');
    card.addEventListener("click",cardClick);
  });
  for (let card of cards) {
    cardList.innerHTML = "";
    [].forEach.call(cards, function(item){
      cardList.appendChild(item);
    });
   }

}
//moves counter
let moves = 0;
const movesRegister = document.querySelector(".moves");
function numOfMoves() {
    moves++;
    if (moves === 1) {
        movesRegister.innerHTML = `1`;
    } else {
        movesRegister.innerHTML = `${moves}`;
    }

}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 //when a card clicked
 function cardClick() {
   if (CurrentCards.length<2) {
     this.classList.add('open','show');
     CurrentCards.push(this);
   } else {
  //  numOfStars()
    numOfMoves();
     cardOpen();

   }
 }
 //when a card opened
function cardOpen() {
  if (CurrentCards.length==2) {
    let firstCard = CurrentCards[0];
    let secondCard = CurrentCards[1];
    var FCard=firstCard.children[0].className;
    var SCard= secondCard.children[0].className;
    if(FCard==SCard){
      firstCard.classList.add('match');
      secondCard.classList.add('match');
      openedCards.push(this);
    }else {
      firstCard.classList.remove('open', 'show');
      secondCard.classList.remove('open', 'show');
    }
    if (FCard!==SCard) {
      firstCard.classList.remove('open', 'show');
      secondCard.classList.remove('open', 'show');
    }
    CurrentCards= [];
  }
  if (openedCards.length===8) {
    //console.log(openedCards);
    congrats()
  }
}

function congrats() {
  var stars;
  if (moves<=15) {
stars=3;
  if (moves=>20&&moves<25) {
stars=2;
  }else {
    stars=1;
  }
  }
  confirm("congrats\nmoves:"+moves+"\nstars:"+stars+"\ntime:"+document.getElementById("basicUsage").textContent);

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function setTimer() {
  document.getElementById("basicUsage").innerHTML="00:00:00";
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

"use strict";
//SELECTING ELEMENTS
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
score0.textContent = 0;
score1.textContent = 0;
const player0 = document.querySelector(".player--1");
const player1 = document.querySelector(".player--2");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
// dice.style = "display:none;"; //dice.classlist.add('hide)

//BUTTONS
const roll = document.querySelector(".btn--roll");
const newgame = document.querySelector(".btn--new");
const hold = document.querySelector(".btn--hold");
const rules = document.querySelector(".btn--rules");

let currentscore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const reset = function () {
  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  current0.textContent = currentscore;
  current1.textContent = currentscore;
  score0.textContent = 0;
  score1.textContent = 0;

  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  dice.classlist.add("hide");
};

const switchplayer = function () {
  currentscore = 0; //set current to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0; //set current to 0 on the screen
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--active"); //visual effects of removal
  activePlayer = activePlayer === 1 ? 0 : 1; //changing the active player
  document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
};

const closeRulesWindow = function () {
  document.querySelector(".rules").classList.add("hide");
  document.querySelector(".back").classList.add("hide");
};

const openRulesWindow = function () {
  document.querySelector(".rules").classList.remove("hide");
  document.querySelector(".back").classList.remove("hide");
};

function disableButton(button) {
  button.classList.remove("active1");
}

//ROLL BUTTON

roll.addEventListener("click", function () {
  if (playing) {
    const randomnumber = Math.trunc(Math.random() * 7) + 1;
    dice.style = "display:block;";
    dice.src = `Ball ${randomnumber} Stars.png`;
    if (randomnumber !== 7) {
      currentscore += randomnumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentscore;
    } else switchplayer();
  }
});

//HOLD BUTTON

hold.addEventListener("click", function () {
  if (playing) {
    document.querySelector(".btn").classList.add("active");
    scores[activePlayer] += currentscore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      disableButton(roll);
      disableButton(hold); //to delete animations
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    } else switchplayer();
  }
});

newgame.addEventListener("click", function () {
  reset();
});

rules.addEventListener("click", openRulesWindow);
document.querySelector(".close-modal").addEventListener("click", closeRulesWindow);
document.querySelector(".back").addEventListener("click", closeRulesWindow);
document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (
    e.key === "Escape" &&
    !document.querySelector(".rules").classList.contains("hide") &&
    !document.querySelector(".back").classList.contains("hide")
  ) {
    closeRulesWindow();
  }
});

//variables used for the functionality
let latestscore;
let highscore=0;
let order = [];
let playerOrder = [];
let flash;
let good;
let compTurn;
let intervalId;
let start = false;
let win;
let fail;
let t;
// elements to be created from the html
const turnCounter = document.getElementById("turn");
const topLeft = document.getElementById("topleft");
const topRight = document.getElementById("topright");
const bottomLeft = document.getElementById("bottomleft");
const bottomRight = document.getElementById("bottomright");
const startButton = document.getElementById("start");
const latestCounter = document.getElementById("latestscore");
const highestCounter = document.getElementById("highscore");
//start when button start is clicked
startButton.addEventListener('click', (event) => {
    
    if (start == false||win) {
        start = true;
      turnCounter.style.backgroundColor = "limegreen";//small button will be green when the game is being played
      setTimeout(() => {
        play();
      }, 3000);//the game will start after 3 seconds after button clicked
    } else {
      start = false;
      turnCounter.style.backgroundColor = "red";//if not played the button will be red
      clearColor();
      clearInterval(intervalId);//clear time interval
      clearInterval(fail);//clear time interval
      if(highscore<latestscore)//records highscore
        {
          highscore = latestCounter.innerHTML;
          highestCounter.innerHTML=highscore;
        }
    }
  });

function play() {//functions at which the game is playing
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    latestscore = 1;
    latestCounter.innerHTML = 1;
    if(latestCounter.innerHTML<9){//records lastestscore
        latestCounter.innerHTML =
        "0"+ latestscore;
    }
    good = true;
    for (var i = 0; i < 20; i++) {//random the sequence of flashing
      order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
  
    intervalId = setInterval(gameTurn, 900);
  }
  function gameTurn() {
    start = false;
  
    if (flash == latestscore) {
      clearInterval(intervalId);
      compTurn = false;
      clearColor();
      start = true;
      fail = setInterval(time,5000);//when its users turn they have 5 seconds to complete a sequence else they game will stop and the colours will flash 5 times
    }
  
    if (compTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] == 1) one();
        if (order[flash] == 2) two();
        if (order[flash] == 3) three();
        if (order[flash] == 4) four();
        flash++;
      }, 200);
      clearInterval(fail);
    }
  }
  //function that make a circle change colour
  function one() {
    topLeft.style.backgroundColor = "lightgreen";
  }
  
  function two() {
    topRight.style.backgroundColor = "Pink";
  }
  
  function three() {
    bottomLeft.style.backgroundColor = "lightgoldenrodyellow";
  }
  
  function four() {
    bottomRight.style.backgroundColor = "lightskyblue";
  }
  function clearColor() {//non-flash colours
    topLeft.style.backgroundColor = "green";
    topRight.style.backgroundColor = "red";
    bottomLeft.style.backgroundColor = "gold";
    bottomRight.style.backgroundColor = "blue";
  }
  function flashColor() {//flash colours
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "Pink";
    bottomLeft.style.backgroundColor = "lightgoldenrodyellow";
    bottomRight.style.backgroundColor = "lightskyblue";
  }
  //when top left is clicked
  topLeft.addEventListener('click', (event) => {
    if (start) {
      playerOrder.push(1);
      check();
      one();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
      clearInterval(fail);
      fail = setInterval(time,5000);//set time interval
    }
  })
  //when top right is clicked
  topRight.addEventListener('click', (event) => {
    if (start) {
      playerOrder.push(2);
      check();
      two();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
      clearInterval(fail);
      fail = setInterval(time,5000);
    }
  })
  //when bottom left is clicked
  bottomLeft.addEventListener('click', (event) => {
    if (start) {
      playerOrder.push(3);
      check();
      three();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
      clearInterval(fail);
      fail = setInterval(time,5000);
    }
  })
  //when bottom right is clicked
  bottomRight.addEventListener('click', (event) => {
    if (start) {
      playerOrder.push(4);
      check();
      four();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
      clearInterval(fail);
      fail = setInterval(time,5000);
    }
  })
  //function that checks the user's status of the game
  function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
      good = false;
  
    if (playerOrder.length == 20 && good) {//when user completes the game
      winGame();
    }
    
    if (good == false) {//when user clicks wrong sequence
      clearInterval(fail);
      t = setInterval(time,100);
      if(latestCounter.innerHTML<9){
        latestCounter.innerHTML = "0"+ latestscore;
    }
    else{
    latestCounter.innerHTML = latestscore;
    }

    }
  
    if (latestscore == playerOrder.length && good && !win) {
      latestscore++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      if(latestCounter.innerHTML<9){
        latestCounter.innerHTML =
        "0"+ latestscore;
    }
    else{
    latestCounter.innerHTML = latestscore;
    }
      //speeds up the game depending on level
      if(latestscore>=5&&latestscore<9){
        intervalId = setInterval(gameTurn,700);
      }
      else if(latestscore>=9&&latestscore<13){
        intervalId = setInterval(gameTurn,500);
      }
      else if(latestscore>=13){
        intervalId = setInterval(gameTurn,400);
      }
      else{
        intervalId = setInterval(gameTurn, 900);
      }
      
    }
  
  }
  function time(){//sequence flashing colours 5 times at the same time
    setTimeout(() => {
      flashColor();
      start = false;
      turnCounter.style.backgroundColor = "red";
      if(highscore<latestscore)
        {
          highscore = latestCounter.innerHTML;
          highestCounter.innerHTML=highscore;
        }
    },500);
    setTimeout(() => {
      clearColor();
    },800);
    setTimeout(() => {
      flashColor();
    },1100);
    setTimeout(() => {
      clearColor();
    },1400);
    setTimeout(() => {
      flashColor();
    },1700);
    setTimeout(() => {
      clearColor();
    },2000);
    setTimeout(() => {
      flashColor();
    },2300);
    setTimeout(() => {
      clearColor();
    },2600);
    setTimeout(() => {
      flashColor();
    },2900);
    setTimeout(() => {
      clearColor();
    },3200);
    clearInterval(fail);
    clearInterval(t);
    
  }
  function winGame() {//when user finishes the game
    highscore = latestCounter.innerHTML;
    highestCounter.innerHTML=highscore;
    start = false;
    turnCounter.style.backgroundColor = "red";
    win = true;
    flashColor();
  }
//Browser: Chrome 
//Browser Version: 88.0.4324.190
//Operating System: Windows 10
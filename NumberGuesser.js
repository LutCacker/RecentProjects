var gamestatus;
//initalize the variables
// This variable is initialized store the amount of attempts given
var guessAttempts = [25];
// list to store the previous user's guesses
var previousGuesses = [];
// These two variables pick the numbers the Akinator will think between
// Pick a random number between 1 and 50
// Pick a random number between 52 and 100
var minimum = Math.floor(Math.random() * 50) + 1;
var maximum = Math.floor(Math.random() * 50) + 52;
 // make a variable for the number the Akinator is guessing. The
varibale is assigned to a random number
var secretNumber = Math.floor(Math.random()*(maximum - minimum + 1)) + minimum;
//This line will keep the reward hidden until the unil the Guesser
makes the correct guess
setProperty("Cont_button", "hidden", true);
//The Text box above will describe the kind of number they are thinking of
setText("Status_screen", " Try to guess the number the Akinator is
thnking of for a secret prize! The Akinator is thinking of a number
between " + minimum + " and " + maximum);
setText("number_txt", "The number is between " + minimum + " and " + maximum);

//Prompt the user to make a guess in the box
setText("UsersAttempts", "Attempts left :" + guessAttempts[0]);
onEvent("Guess_button", "click", function( ) {
   //Prompt the user to enter thier guess in the text box
  var UsersGuess =  parseInt(getNumber("UsersBox"));
  if (isNaN(UsersGuess)) {
    setText("Status_screen", "Please enter a number!");
    return;

  }

  gamestatus = numberGuesser(UsersGuess);
  var isDuplicate = false;
  for (var i = 0; i < previousGuesses.length; i++) {
    if (previousGuesses[i] === UsersGuess){
      isDuplicate = true;
      break;
    }

  }


   console.log("Previous Guesses: " + previousGuesses);
   if (isDuplicate) {
     setText("Status_screen", "Youve guessed that number already!
Please enter a different number.");
     return;
   }
   previousGuesses.push(UsersGuess);
  //establish the outcome: if the user guesses the number to be right,
the user wins, if not, the user loses
  if (gamestatus === "Win") {
    setText("Status_screen", "Congratulations! you guessed the correct
number!");
    setText("Feedback_image", "Great Job!");
    setProperty("Guess_button", "hidden", true);
    setProperty("UsersBox", "hidden", true);
    setProperty("Cont_button", "hidden", false);
    setProperty("Akinator_thinking", "image",
"https://www.capsulecomputers.com.au/wp-content/uploads/akinator-01.jpg");
  } else if (gamestatus === "Lose") {
    setText("Status_screen", "Sorry, you have used all your attempts.
the correct number was " + secretNumber + ".");
  }

});


onEvent("Cont_button", "click", function( ) {
  setScreen("winners_Screen");
});

onEvent("Claim_button", "click", function( ) {
  setProperty("winners_Reward", "hidden", true);
  setProperty("Claim_button", "hidden", true);
  setText("winners_Message", "Horray! congratulations you beat the game!");
  playSound("sound://category_collect/clicky_crunch.mp3", false);
});


function numberGuesser(UsersGuess) {
 var finalGuess = 1;

  //Check to see if the number they guessed equals the number the
akinator is guessing
 for (var i = 0; i < guessAttempts.length; i++) {
   if (UsersGuess == secretNumber) {
       return "Win";
    } else {
      guessAttempts[i] = guessAttempts[i] - 1;
      setText("UsersAttempts", "Attempts left: " + guessAttempts[i]);
      if (UsersGuess > secretNumber) {
        setText("Status_screen", "Nope! The number you guessed was too
High! try again!");
      } else if ((UsersGuess < secretNumber)) {
        setText("Status_screen", "Nope! the number you guessed was too
low! Try again!");
      }
      // This statement will check to see your guess was close or not.
      if (Math.abs(UsersGuess - secretNumber) <= 10 && UsersGuess <
secretNumber) {
        setText("Status_screen", "You're getting close! The number you
guessed was too low. keep guessing... " + guessAttempts + " attempts
left." );
      } else if (Math.abs(UsersGuess - secretNumber) >= 10 &&
UsersGuess > secretNumber) {
        setText("Status_screen", "You're getting close! The number you
guessed was too high. keep guessing... " + guessAttempts + " attempts
left." );
      }
      if (Math.abs(UsersGuess - secretNumber) <= 5 && UsersGuess <
secretNumber) {
        setText("Status_screen", "You're getting even closer! The
number you guessed was too low. keep guessing... " + guessAttempts + "
attempts left." );
      } else if (Math.abs(UsersGuess - secretNumber) >= 5 &&
UsersGuess > secretNumber) {
        setText("Status_screen", "You're getting even closer! The
number you guessed was too high. keep guessing... " + guessAttempts +
" attempts left." );
      }
      //If the user makes a wrong guess, the game will take away one attempt
      if (guessAttempts[i] === 0) {
        //The user loses if they run out of attempts
        return "Lose";
      } else {
        // initialize the variable that will help guide the user to its answer
        var temperature = getTemperatue(UsersGuess);
        giveFeedback(temperature);
      }
      if (guessAttempts[i] === finalGuess) {
        setText("Status_screen", "Uh oh! your down to your final
guess! use it wisely....");
      }
    }
  }
 //Return the status of the game after the number is guessed
 return gamestatus;
}

function getTemperatue(UsersGuess) {
  var difference = Math.abs(UsersGuess - secretNumber);
  if (difference < 5) {
    return "Hot";
  } else if (difference < 10) {
    return "Warm";
  } else if (difference < 20) {
    return "Cold";
  } else {
    return "Freezing";
  }
}





function giveFeedback(temperature) {
  var feedbackText = "You're getting ";
  var imageURL = "";
  switch (temperature) {
    case "Hot":
      feedbackText += "hot! Your guess is extremley close!";
      imageURL ="ezgif-7-0ab7f452f9.jpg";
      break;
    case "Warm":
      feedbackText +="warm. Your guess is pretty close.";
      imageURL = "https://s6.ezgif.com/tmp/ezgif-6-f7fe39d100.png";
      break;
      case "Cold":
        feedbackText += "cold.";
        imageURL = "https://s6.ezgif.com/tmp/ezgif-6-f194f4ba4f.jpg";
        break;
        case "Freezing":
          feedbackText += "frozen! your guess was way off!";
          imageURL = "https://s7.ezgif.com/tmp/ezgif-7-e7271c94c8.jpg";
          break;
  }
  setText("feedback_screen", feedbackText);
  setImageURL("Feedback_image", imageURL);
}




//Used for testing
console.log(secretNumber);

// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the trains database.
// 4. Create a way to calculate the next arrival and minutes away. Use moment.js techniques

var config = {
    apiKey: "AIzaSyDC62IhLz2myq4Ftc4W528JgrqmdoaOsnU",
    authDomain: "trial-project-3cabc.firebaseapp.com",
    databaseURL: "https://trial-project-3cabc.firebaseio.com",
    projectId: "trial-project-3cabc",
    storageBucket: "trial-project-3cabc.appspot.com",
    messagingSenderId: "609857621366"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding trains
$("#submit-info").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var ftt = $("#ftt-input").val().trim();
  var frequency = parseInt($("#frequency-input").val().trim());

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    ftt: ftt,
    frequency: frequency,
  }

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#ftt-input").val("");
  $("#frequency-input").val("");

});
 

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
  
    // Store everything into a variable.
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var ftt = snapshot.val().ftt;
    var frequency = snapshot.val().frequency;
  
    // Train Info

  
    // Prettify the employee start
    // var nextArrivalPretty = moment.unix(nextArrival).format("HH:mm");
    // var minutesAwayPretty = moment.unix(minutesAway).format("mm");
  
// 4. MATH
    // First Time (pushed back 1 year to make sure it comes before current time)
    var fttConverted = moment(ftt, "HH:mm").subtract(1, "day");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(fttConverted), "minutes");

     // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute(s) Until Train
    var minutesAway = frequency - tRemainder;

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    var catchTrain = moment(nextArrival).format("HH:mm")
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(catchTrain),
      $("<td>").text(minutesAway),
    );
  
    // Append the new row to the table
    $("tbody").append(newRow);
  });
  
  var animateMe = function(targetElement, speed){
    
    $(targetElement).css({left:'-200px'});
    $(targetElement).animate(
        {
        'left': $(document).width() + 200
        }, 
        { 
        duration: speed, 
        complete: function(){
            animateMe(this, speed);
            }
        }
    );
    
};
animateMe($('#object1'), 7000);
animateMe($('#object2'), 9000);
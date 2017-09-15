// Initialize Firebase
  var config = {
    apiKey: "AIzaSyATAHMjjogNrc7LZMr518E2Dw6pe3bJ7RM",
    authDomain: "trainscheduler-956c7.firebaseapp.com",
    databaseURL: "https://trainscheduler-956c7.firebaseio.com",
    projectId: "trainscheduler-956c7",
    storageBucket: "trainscheduler-956c7.appspot.com",
    messagingSenderId: "100711336472"
  };
  firebase.initializeApp(config);

  //Create a variable to reference the database.
  var database = firebase.database();

  //Initial values
  var name = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";

  //Capture Button Clicks
  $('#add-train').on("click", function(event){
  	event.preventDefault();
  

  //Grab values from text boxes. 
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  firstTrain = $("#firstTrain-input").val().trim();

  //Code to handle the push 
    var objToPush = {
      name: name,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
}
database.ref().push(objToPush)
});

  //FireBase Watcher (watch the changes w/o the overhead) + order/limit
  //Use ("child_added") instead of value
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  	//Storing the snapshot.val() in a var for convenience
  	var sv = snapshot.val();
    console.log(sv);
  	// Check to see if the entry's are working
  	//console.log(sv.name);
  	//console.log(sv.destination);
  	//console.log(sv.frequency);

    //Moment.js calculations -->
   

    //var date = firstTrain;
    //var arrival = moment(date).add(frequency, 'mins').format('1');


    $("#name-display").append("<p>" + sv.name + "</p>");
    $("#destination-display").append("<p>" + sv.destination + "<p>");
    $("#firstTrain-display").append("<p>" + sv.firstTrain + "</p>");
    $("#frequency-display").append("<p>" + sv.frequency + "</p>");
    $("#arrival-display").append("<p>" + moment(nextTrain).format("hh:MM") + "</p>");
    $("#away-display").append("<p>" + minUntilTrain + "</p>")
    


    var firstTrainMoment = moment(snapshot.val().firstTrain, "hh:MM").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainMoment), "minutes");
    var remainder = diffTime % snapshot.val().frequency;
    var minUntilTrain = snapshot.val().frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes");

    




  }), function(errorObject) {
  	console.log("Error handled: " + errorObject.code);
  }
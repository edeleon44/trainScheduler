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

  //Capture Button Clicks
  $('#add-train').on("click", function(event){
  	event.preventDefault();
  

  //Grab values from text boxes. 
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  //Code to handle the push 
  database.ref().push({
  	name: name,
  	destination: destination,
  	frequency: frequency,
  	dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

  //FireBase Watcher (watch the changes w/o the overhead) + order/limit
  //Use ("child_added") instead of value
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  	//Storing the snapshot.val() in a var for convenience
  	var sv = snapshot.val();

  	// Check to see if the entry's are working
  	console.log(sv.name);
  	console.log(sv.destination);
  	console.log(sv.frequency);

  	$("#name-display").html(sv.name);
  	$("#destination-display").html(sv.destination);
  	$("#frequency-display").html(sv.frequency);

  }), function(errorObject) {
  	console.log("Error handled: " + errorObject.code);
  }
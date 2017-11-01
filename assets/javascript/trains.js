
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDSfh5CwNBQUkVFyXzUN825sOG40yzFAeI",
    authDomain: "test-4f4b1.firebaseapp.com",
    databaseURL: "https://test-4f4b1.firebaseio.com",
    projectId: "test-4f4b1",
    storageBucket: "test-4f4b1.appspot.com",
    messagingSenderId: "119503455197"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#trainTime-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#trainTime-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    // Prettify the employee start
    var trainStartPretty = moment.unix(trainTime).format("HH:mm");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    //console.log(empMonths);

    // Calculate the total billed rate
   // var empBilled = empMonths * empRate;
  //  console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td></tr>");
});
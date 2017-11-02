
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

//Global variables
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var newTrain = {};
var nextTrain = "";
var nextTrainFormatted = "";
var minutesAway = "";
var firstTimeConverted = "";
var currentTime = "";
var diffTime = "";
var tRemainder = "";
var minutesTillTrain = "";



$(document).ready(function () {

    // Button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#firstTrainTime-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        //Converts the times
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "days"); 
        //I honestly don't understand the convention for subtracting a year as your reference point, so I put in a day for shits and giggles
        
        
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder = diffTime % frequency;
        minutesTillTrain = frequency - tRemainder;
        nextTrain = moment().add(minutesTillTrain, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm a");

        // Logs
        console.log(firstTimeConverted);
        console.log(currentTime);
        console.log(diffTime);
        console.log(tRemainder);
        console.log(minutesTillTrain);
        console.log(nextTrain);
        console.log(nextTrainFormatted);



        // Creates local "temporary" object for holding train data in Firebase
        newTrain = {
            name: trainName,
            destination: destination,
            time: firstTrainTime,
            frequency: frequency,
            nextTrainFormatted: nextTrainFormatted,
            minutesTillTrain: minutesTillTrain
        };

        // Uploads train data to Firebase
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
        $("#firstTrainTime-input").val("");
        $("#frequency-input").val("");
    });

    // Firebase event for adding new train data to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        trainName = childSnapshot.val().name;
        destination = childSnapshot.val().destination;
        firstTrainTime = childSnapshot.val().time;
        frequency = childSnapshot.val().frequency;
        nextTrainFormatted = childSnapshot.val().nextTrainFormatted;
        minutesTillTrain = childSnapshot.val().minutesTillTrain;

        // Train Info
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);


        // Add each train's data into the table
        $("#train-table > tbody").append(`<tr><td> ${trainName} </td><td> ${destination} </td><td> ${frequency} </td><td> ${nextTrainFormatted} </td><td> ${minutesTillTrain} </td></tr>`);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code)
    });
});

